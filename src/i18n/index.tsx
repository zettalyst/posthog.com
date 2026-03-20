import React, { createContext, useContext } from 'react'

type Locale = 'en' | 'ko'

const LocaleContext = createContext<Locale>('en')

export const LocaleProvider = ({ locale, children }: { locale: Locale; children: React.ReactNode }) => (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
)

export const useLocale = () => useContext(LocaleContext)

// CSV 원본 번역만 포함. 임의 번역 없음.
const translations: Record<string, Record<string, string>> = {
    ko: {
        // Row 18
        tagline: '저희는 프러덕트 엔지니어가 완벽한 제품을 만들수 있도록 돕는 개발도구를 제작합니다.',
        // Row 19
        'cta.getStarted': '지금 시작하세요-무료',
        // Row 20
        'cta.installWithAI': 'AI를 이용해 설치해 보세요',
        // Row 22
        'products.exploreApps': '앱 살펴보기',
        'products.byCompanyStage': '회사 규모 별',
        // Row 23
        'products.startup': '스타트업',
        'products.sideProject': 'n 잡용',
        // Row 32
        'products.growth': '성장 단계 기업',
        // Row 44 (CSV에 추가됨)
        'products.scale': '대규모',
        // Row 56
        'products.browseLibrary': '앱 라이브러리',
        // Row 61
        'customers.shuffle': '회사를 재배치하세요',
        // Row 64
        'customers.openCustomers': '고객 파일을 엽니다',
        // Row 84
        'buttons.dataStack': 'PostHog의 데이터 스택 읽어보기',
        // Row 106
        'buttons.pricing': '가격 정보 보기',
        // Row 114
        'buttons.ai': 'AI에 대해서 알아보기',
        // Row 121
        'buttons.about': '직원들에 대한 정보는 여기서 읽어 볼 수 있습니다.',
        // Row 130-131
        'cta.shameless': '이러한 고전적인 마케팅 전략만큼은 설득력이 있을 것입니다.',
        // Row 93
        'pricing.product': '제품',
        // Row 97
        'pricing.freeTier': '무료 서비스',

        // Product names (CSV rows 24-51)
        'product.Web Analytics': '웹 분석',
        'product.Session Replay': '세션 다시보기',
        'product.Product Analytics': '프러덕트 분석',
        'product.Feature Flags': '피쳐 플래그',
        'product.Error Tracking': '오류 추적',
        'product.Surveys': '설문조사',
        'product.LLM Analytics': 'LLM분석',
        'product.PostHog AI': 'PostHog AI',
        'product.Experiments': '실험',
        'product.Logs': '로그',
        'product.CDP': 'CDP',
        'product.Workflows': '워크플로우',
        'product.Managed warehouse': '관리형 창고',
        'product.Custom dashboards': '맞춤형 대시보드',

        // Product overview titles (CSV rows 24-51)
        'overview.Privacy-focused web analytics': '개인정보 보호에 초점을 맞춘 웹 분석',
        'overview.Watch people use your product': '사람들이 당신의 제품을 사용하는 모습을 확인할 수 있습니다',
        'overview.Product analytics with autocapture': '자동 캡쳐 기능을 활용한 제품 분석',
        'overview.Safely roll out features to specific users or groups':
            '특정 사용자 또는 그룹에게 안전하게 기능을 배포합니다',
        'overview.Track errors and resolve issues': '오류를 추적하고 문제를 해결합니다',
        'overview.Ask anything with no-code surveys': '코딩없이 설문조사를 통해 무엇이든 물어보세요',
        'overview.Observe and debug AI in production': '실제 운영 환경에서 AI를 관찰하고 디버깅하세요',
        'overview.Ask questions about how people use your product':
            '실제 사람들이 프러덕트를 어떻게 사용하는지에 대해 질문해보세요',
        'overview.Test changes with statistical significance': '통계상 중요한 변화를 테스트하세요',
        'overview.Logs that sync with customer data': '고객 데이터와 동기화 로그',
        'overview.Ingest, transform, and send data between 145+ tools':
            '145개 이상의 툴 사이에 데이터를 수집, 변환 및 전송합니다',
        'overview.Automate workflows with product data': '프러덕트 데이터를 활용하여 워크플로우를 자동화하세요',
        'overview.Query & visualize product and third party data together':
            '프러덕트 데이터와 제 3자 데이터를 함께 조회하고 시각화 합니다',
        'overview.Track all your most important product and performance metrics in one place':
            '모든 지표를 한 곳에서 파악하세요',

        // CTA component (CSV rows 133-146)
        'cta.notEndorsed': '킴 카다시안은 절대 이용하지 않을 최고의 지적 서비스',
        'cta.digitalDownload': '디지털 다운로드',
        'cta.webProduct': 'PostHog는 웹 기반 제품이므로 CD로 설치할 수 없습니다',
        'cta.floppyDisk':
            '예전에 일부 고객에게 플로피 디스크를 보낸 적이 있는데, 그 안에는 릭롤(Rickroll)이 들어 있었습니다',
        'cta.selectCloud': '클라우드를 선택하세요',
        'cta.usVirginia': '미국 (버지니아주)',
        'cta.euFrankfurt': 'EU(프랑크푸르트)',
        'cta.leftAtThisPrice': '단 1개만 남았습니다!',
        'cta.getStartedBtn': '시작하세요',
        'cta.hurry': '서두르세요:',
        'cta.companiesSignedUp': '개 기업이 오늘 가입했습니다',
        'cta.actNow': '지금 바로 주문하시면 첫 주문 시 0원에 구매하실 수 있습니다',

        // Row 62-63 (company breakdown labels)
        'customers.vcsLoveThem': '벤쳐 캐피탈',
        'customers.productEngineersLoveThem': '프러덕트 엔지니어들',
    },
}

export const useT = () => {
    const locale = useLocale()
    return (key: string, fallback: string) => {
        if (locale === 'en') return fallback
        return translations[locale]?.[key] || fallback
    }
}
