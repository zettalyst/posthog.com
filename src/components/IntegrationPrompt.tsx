import React from 'react'
import Link from './Link'
import WizardCommand from './WizardCommand'
import { IconCheck, IconChevronRight, IconArrowUpRight, IconTerminal } from '@posthog/icons'
import NextIcon from '../../contents/images/docs/integrate/frameworks/nextjs.svg'
import ReactIcon from '../../contents/images/docs/integrate/react.svg'
import SvelteIcon from '../../contents/images/docs/integrate/frameworks/svelte.svg'
import AstroIcon from '../../contents/images/docs/integrate/frameworks/astro.svg'
import CloudinaryImage from './CloudinaryImage'
import { DebugContainerQuery } from './DebugContainerQuery'
import { useT } from '../i18n'

const Row = ({ children }: { children: React.ReactNode }) => {
    return <li className="flex items-center gap-1">{children}</li>
}

export default function IntegrationPrompt() {
    const t = useT()
    return (
        <>
            <h3>{t('integration.installWithAI', 'Install with AI in a single prompt')}</h3>
            <p className="text-[15px]">
                {t('integration.pasteTerminal', 'Paste into your terminal or code editor and make AI do the work.')}
            </p>
            <WizardCommand latest={false} />
        </>
    )
}
