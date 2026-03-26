import React, { useCallback, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { graphql } from 'gatsby'

type TranslationSource = 'gpt' | 'deepl'

type FileNode = {
    internal: {
        content: string
    }
} | null

type DiffPageData = {
    original: FileNode
    manual: FileNode
    gpt: FileNode
    deepl: FileNode
}

const ARTICLE_TITLE = 'What does a product manager do?'

const columnLabels: Record<string, string> = {
    original: 'Original (EN)',
    manual: 'Human Translation (KO)',
    gpt: 'GPT Translation (KO)',
    deepl: 'DeepL Translation (KO)',
}

const proseStyles =
    'prose prose-sm max-w-none prose-headings:font-bold prose-h1:text-xl prose-h2:text-xl prose-h2:mt-6 prose-h2:mb-3 prose-h3:text-lg prose-h3:mt-4 prose-h3:mb-2 prose-p:leading-relaxed prose-li:leading-relaxed prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic prose-a:text-blue-600 prose-a:underline prose-strong:font-semibold'

function stripLeadingTitle(content: string): string {
    return content
        .replace(/^#\s*\[.*?\]\s*\n?/m, '') // # [title]
        .replace(/^-.*스킬.*\n?/m, '') // -subtitle line
        .replace(/^\*\*.*?\*\*\s*\n\*\*.*?\*\*\s*\n?/m, '') // **bold title** lines
        .trimStart()
}

export default function DiffPage({ data }: { data: DiffPageData }) {
    const [translationSource, setTranslationSource] = useState<TranslationSource>('gpt')
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

    const original = data.original?.internal?.content ?? ''
    const manual = stripLeadingTitle(data.manual?.internal?.content ?? '')
    const gpt = stripLeadingTitle(data.gpt?.internal?.content ?? '')
    const deepl = data.deepl?.internal?.content ?? ''

    const thirdColumnContent = translationSource === 'gpt' ? gpt : deepl

    return (
        <div className="flex h-full flex-col bg-white">
            <header className="shrink-0 border-b border-gray-200 bg-white px-6 py-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-lg font-bold">
                        Translation Diff Viewer: <span className="font-medium text-gray-500">{ARTICLE_TITLE}</span>
                    </h1>
                    <a href="/ko" className="text-sm text-gray-500 hover:text-gray-700">
                        ← /ko
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
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{manual}</ReactMarkdown>
                    </div>
                </div>

                {/* Column 3: GPT or DeepL translation (switchable) */}
                <div className="flex min-h-0 min-w-0 flex-col">
                    <div className="flex shrink-0 items-center gap-3 border-b border-gray-200 bg-gray-50 px-4 py-2">
                        <span className="shrink-0 text-sm font-semibold text-gray-700">LLM/Machine Translation</span>
                        <div className="inline-flex rounded-md border border-gray-300 bg-white">
                            <button
                                onClick={() => setTranslationSource('gpt')}
                                className="rounded-l-md px-3.5 py-1 text-xs font-semibold outline-none transition-colors"
                                style={
                                    translationSource === 'gpt'
                                        ? { backgroundColor: '#111827', color: '#fff' }
                                        : { color: '#4b5563' }
                                }
                            >
                                GPT
                            </button>
                            <button
                                onClick={() => setTranslationSource('deepl')}
                                className="-ml-px rounded-r-md border-l border-gray-300 px-3.5 py-1 text-xs font-semibold outline-none transition-colors"
                                style={
                                    translationSource === 'deepl'
                                        ? { backgroundColor: '#111827', color: '#fff' }
                                        : { color: '#4b5563' }
                                }
                            >
                                DeepL
                            </button>
                        </div>
                    </div>
                    <div
                        ref={(el) => (scrollRefs.current[2] = el)}
                        onScroll={() => handleScroll(2)}
                        className={`min-h-0 flex-1 overflow-y-auto p-4 ${proseStyles}`}
                    >
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{thirdColumnContent}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const query = graphql`
    query DiffPage {
        original: file(
            relativePath: { eq: "ko/newsletter/diff/what-does-a-product-manager-do.md" }
            sourceInstanceName: { eq: "contents" }
        ) {
            internal {
                content
            }
        }
        manual: file(
            relativePath: { eq: "ko/newsletter/diff/what-does-a-product-manager-do.manual-ko.md" }
            sourceInstanceName: { eq: "contents" }
        ) {
            internal {
                content
            }
        }
        gpt: file(
            relativePath: { eq: "ko/newsletter/diff/what-does-a-product-manager-do.gpt5.4 pro-ko.md" }
            sourceInstanceName: { eq: "contents" }
        ) {
            internal {
                content
            }
        }
        deepl: file(
            relativePath: { eq: "ko/newsletter/diff/what-does-a-product-manager-do.deepl-ko.md" }
            sourceInstanceName: { eq: "contents" }
        ) {
            internal {
                content
            }
        }
    }
`

export const Head = () => <title>Translation Diff Viewer: {ARTICLE_TITLE}</title>
