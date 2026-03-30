import React, { useCallback, useMemo, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { graphql } from 'gatsby'

type TranslationSource = 'gpt' | 'deepl'
type TranslationType = 'original' | 'manual' | 'gpt' | 'deepl'

type FileNode = {
    name: string
    relativeDirectory: string
    internal: {
        content: string
    }
}

type DiffPageData = {
    allFile: {
        nodes: FileNode[]
    }
}

type ArticleData = {
    original: string
    manual: string
    gpt: string
    deepl: string
}

const articleTitles: Record<string, string> = {
    'what-does-a-product-manager-do': 'What does a product manager do?',
    '10x-job-posts-for-10x-engineers': '10x Job Posts for 10x Engineers',
}

const columnLabels: Record<string, string> = {
    original: 'Original (EN)',
    manual: 'Human Translation (KO)',
    gpt: 'GPT Translation (KO)',
    deepl: 'DeepL Translation (KO)',
}

const proseStyles =
    'prose prose-sm max-w-none prose-headings:font-bold prose-h1:text-xl prose-h2:text-xl prose-h2:mt-6 prose-h2:mb-3 prose-h3:text-lg prose-h3:mt-4 prose-h3:mb-2 prose-p:leading-relaxed prose-li:leading-relaxed prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic prose-a:text-blue-600 prose-a:underline prose-strong:font-semibold'

function fileNameToType(name: string): TranslationType {
    if (name === 'original') return 'original'
    if (name === 'manual-ko') return 'manual'
    if (name === 'deepl-ko') return 'deepl'
    if (name === 'gpt-ko') return 'gpt'
    return 'original'
}

function groupFilesByArticle(nodes: FileNode[]): Record<string, ArticleData> {
    const articles: Record<string, ArticleData> = {}
    for (const node of nodes) {
        const slug = node.relativeDirectory.split('/').pop() || ''
        const type = fileNameToType(node.name)
        if (!articles[slug]) {
            articles[slug] = { original: '', manual: '', gpt: '', deepl: '' }
        }
        articles[slug][type] = node.internal.content
    }
    return articles
}

function stripLeadingTitle(content: string): string {
    return content
        .replace(/^#\s*\[.*?\]\s*\n?/m, '')
        .replace(/^-.*스킬.*\n?/m, '')
        .replace(/^\*\*.*?\*\*\s*\n\*\*.*?\*\*\s*\n?/m, '')
        .trimStart()
}

export default function DiffPage({ data }: { data: DiffPageData }) {
    const articles = useMemo(() => groupFilesByArticle(data.allFile.nodes), [data])
    const slugs = useMemo(() => Object.keys(articles).sort(), [articles])

    const [selectedSlug, setSelectedSlug] = useState(slugs[0] || '')
    const [translationSource, setTranslationSource] = useState<TranslationSource>('deepl')
    const scrollRefs = useRef<(HTMLDivElement | null)[]>([null, null, null])
    const isSyncing = useRef(false)

    const handleScroll = useCallback((sourceIndex: number) => {
        if (isSyncing.current) return
        const source = scrollRefs.current[sourceIndex]
        if (!source) return

        isSyncing.current = true
        const ratio = source.scrollTop / (source.scrollHeight - source.clientHeight || 1)

        scrollRefs.current.forEach((el, i) => {
            if (i !== sourceIndex && el) {
                el.scrollTop = ratio * (el.scrollHeight - el.clientHeight)
            }
        })

        requestAnimationFrame(() => {
            isSyncing.current = false
        })
    }, [])

    const article = articles[selectedSlug] || { original: '', manual: '', gpt: '', deepl: '' }
    const original = article.original
    const manual = stripLeadingTitle(article.manual)
    const gpt = stripLeadingTitle(article.gpt)
    const deepl = article.deepl
    const thirdColumnContent = translationSource === 'gpt' ? gpt : deepl

    return (
        <div className="flex h-full flex-col bg-white">
            <header className="shrink-0 border-b border-gray-200 bg-white px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-lg font-bold">Translation Diff Viewer</h1>
                        {slugs.length > 1 && (
                            <select
                                value={selectedSlug}
                                onChange={(e) => setSelectedSlug(e.target.value)}
                                className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm outline-none hover:bg-gray-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            >
                                {slugs.map((slug) => (
                                    <option key={slug} value={slug}>
                                        {articleTitles[slug] || slug}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                    <a href="/ko" className="text-sm text-gray-500 hover:text-gray-700">
                        &larr; /ko
                    </a>
                </div>
            </header>

            <div className="grid min-h-0 flex-1 grid-cols-3 divide-x divide-gray-200">
                {/* Column 1: Original English */}
                <div className="flex min-h-0 min-w-0 flex-col">
                    <div className="shrink-0 border-b border-gray-200 bg-gray-50 px-4 py-2">
                        <span className="text-sm font-semibold text-gray-700">{columnLabels.original}</span>
                    </div>
                    <div
                        ref={(el) => (scrollRefs.current[0] = el)}
                        onScroll={() => handleScroll(0)}
                        className={`min-h-0 flex-1 overflow-y-auto p-4 ${proseStyles}`}
                    >
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{original}</ReactMarkdown>
                    </div>
                </div>

                {/* Column 2: Manual Korean translation */}
                <div className="flex min-h-0 min-w-0 flex-col">
                    <div className="shrink-0 border-b border-gray-200 bg-gray-50 px-4 py-2">
                        <span className="text-sm font-semibold text-gray-700">{columnLabels.manual}</span>
                    </div>
                    <div
                        ref={(el) => (scrollRefs.current[1] = el)}
                        onScroll={() => handleScroll(1)}
                        className={`min-h-0 flex-1 overflow-y-auto p-4 ${proseStyles}`}
                    >
                        {manual ? (
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{manual}</ReactMarkdown>
                        ) : (
                            <p className="italic text-gray-400">No translation available</p>
                        )}
                    </div>
                </div>

                {/* Column 3: GPT or DeepL translation (switchable) */}
                <div className="flex min-h-0 min-w-0 flex-col">
                    <div className="flex shrink-0 items-center gap-3 border-b border-gray-200 bg-gray-50 px-4 py-2">
                        <span className="shrink-0 text-sm font-semibold text-gray-700">LLM/Machine Translation</span>
                        <div className="inline-flex rounded-md border border-gray-300 bg-white">
                            <button
                                onClick={() => setTranslationSource('deepl')}
                                className="rounded-l-md px-3.5 py-1 text-xs font-semibold outline-none transition-colors"
                                style={
                                    translationSource === 'deepl'
                                        ? { backgroundColor: '#111827', color: '#fff' }
                                        : { color: '#4b5563' }
                                }
                            >
                                DeepL
                            </button>
                            <button
                                onClick={() => setTranslationSource('gpt')}
                                className="-ml-px rounded-r-md border-l border-gray-300 px-3.5 py-1 text-xs font-semibold outline-none transition-colors"
                                style={
                                    translationSource === 'gpt'
                                        ? { backgroundColor: '#111827', color: '#fff' }
                                        : { color: '#4b5563' }
                                }
                            >
                                GPT
                            </button>
                        </div>
                    </div>
                    <div
                        ref={(el) => (scrollRefs.current[2] = el)}
                        onScroll={() => handleScroll(2)}
                        className={`min-h-0 flex-1 overflow-y-auto p-4 ${proseStyles}`}
                    >
                        {thirdColumnContent ? (
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{thirdColumnContent}</ReactMarkdown>
                        ) : (
                            <p className="italic text-gray-400">No translation available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export const query = graphql`
    query DiffPage {
        allFile(
            filter: {
                relativeDirectory: { glob: "ko/newsletter/diff/*" }
                extension: { eq: "md" }
                sourceInstanceName: { eq: "contents" }
            }
        ) {
            nodes {
                name
                relativeDirectory
                internal {
                    content
                }
            }
        }
    }
`

export const Head = () => <title>Translation Diff Viewer</title>
