import React, { createContext, useContext } from 'react'

type Locale = 'en' | 'ko'

const LocaleContext = createContext<Locale>('en')

export const LocaleProvider = ({ locale, children }: { locale: Locale; children: React.ReactNode }) => (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
)

export const useLocale = () => useContext(LocaleContext)

// CSV 원본 번역만 포함. 임의 번역 없음.
// Sheet2를 기준으로 하되, Sheet1도 참고.
const translations: Record<string, Record<string, string>> = {
    ko: {
        // === 메인 태그라인 (Sheet2 row 18) ===
        tagline: '저희는 프러덕트 엔지니어가 완벽한 제품을 만들수 있도록 돕는 개발도구를 제작합니다.',

        // === CTA 버튼 (Sheet2 rows 19-20) ===
        'cta.getStarted': '지금 시작하세요-무료',
        'cta.installWithAI': 'AI를 이용해 설치해 보세요',

        // === 제품 섹션 (Sheet2 rows 22-23, 31-32, 42, 159) ===
        'products.exploreApps': '앱 살펴보기',
        'products.byCompanyStage': '회사 규모 별',
        'products.startup': '스타트업',
        'products.sideProject': 'n 잡용',
        'products.growth': '성장 단계 기업',
        'products.scale': '스케일업 기업',
        'products.browseLibrary': '앱 라이브러리',
        'products.explore': '알아보기',

        // === 고객 섹션 (Sheet2 rows 59-62) ===
        'customers.shuffle': '회사를 재배치 해보세요.',
        'customers.openCustomers': '고객 파일을 열어보세요.',
        'customers.vcsLoveThem': '벤쳐 캐피탈',
        'customers.productEngineersLoveThem': '프러덕트 엔지니어들',

        // === 버튼 (Sheet2 rows 81, 103, 111, 118) ===
        'buttons.dataStack': 'PostHog의 데이터 스택 읽어보기',
        'buttons.pricing': '가격 정보 보기',
        'buttons.ai': 'PostHog AI 알아보기',
        'buttons.about': '직원들에 대한 정보는 여기서 읽어 볼 수 있습니다.',

        // === CTA 하단 섹션 (Sheet2 rows 127-128) ===
        'cta.shameless': '이러한 고전적인 마케팅 전략만큼은 설득력이 있을 것입니다.',

        // === 가격표 (Sheet2 rows 90, 94, 163-165) ===
        'pricing.product': '제품',
        'pricing.freeTier': '무료 플랜',
        'pricing.pricingHeader': '가격플랜(사용량에 따른 가격 인하)',
        'pricing.freeTierLabel': '무료 플랜:',
        'pricing.pricingLabel': '가격 플랜:',

        // === 제품명 (Sheet2 rows 25-49, 196-212) ===
        'product.Web Analytics': '웹 분석',
        'product.Session Replay': '세션 리플레이',
        'product.Product Analytics': '프러덕트 분석',
        'product.Feature Flags': '피처 플래그',
        'product.Error Tracking': '오류 추적',
        'product.Surveys': '설문조사',
        'product.LLM Analytics': 'LLM분석',
        'product.PostHog AI': 'PostHog AI',
        'product.Experiments': '실험',
        'product.Logs': '로그',
        'product.CDP': 'CDP',
        'product.Workflows': '워크플로우',
        'product.Managed warehouse': '관리형 데이터 웨어하우스',
        'product.Custom dashboards': '맞춤 대쉬보드',
        'product.User interviews': '사용자 인터뷰',
        'product.Support': '지원',
        'product.Coding agent (PostHog Code)': '코딩 에이전트',
        'product.Product tours': '프러덕트 안내',
        'product.Traces': '추적',
        'product.Generations': '생성',
        'product.Evals': '평가',
        'product.No-code A/B testing': '코드 없는 A/B 테스트',
        'product.Group Analytics': '그룹 분석',
        'product.Platform packages': '플랫폼 패키지',
        'product.User profiles': '유저 정보',
        'product.Revenue Analytics': '수익 분석',
        'product.Realtime destinations': '실시간 연동대상',
        'product.Endpoints': '엔드 포인트',

        // === 제품 설명 (Sheet2 rows 173-185, 197-212) ===
        'overview.Privacy-focused web analytics': '개인정보 보호에 초점을 맞춘 웹 분석',
        'overview.Watch people use your product': '유저의 실제 행동을 영상으로 확인할 수 있습니다',
        'overview.Product analytics with autocapture': '자동 캡쳐 기능을 활용한 제품 분석',
        'overview.Safely roll out features to specific users or groups':
            '특정 사용자 또는 그룹에게 안전하게 기능을 배포합니다.',
        'overview.Track errors and resolve issues': '오류를 추적하고 문제를 해결합니다.',
        'overview.Ask anything with no-code surveys': '코딩없이 설문조사를 통해 무엇이든 물어보세요',
        'overview.Observe and debug AI in production': '실제 운영 환경에서 AI를 관찰하고 디버깅하세요',
        'overview.Ask questions about how people use your product':
            '실제 사람들이 프러덕트를 어떻게 사용하는지에 대해 질문해보세요.',
        'overview.Test changes with statistical significance': '통계상 유의미한 변화를 테스트하세요.',
        'overview.Logs that sync with customer data': '고객 데이터와 동기화 로그',
        'overview.Search and analyze your logs in PostHog': 'PostHog에서 당신의 데이터 로그를 검색하고 분석해보세요.',
        'overview.Ingest, transform, and send data between 145+ tools':
            '145개 이상의 툴 사이에 데이터를 수집, 변환 및 전송합니다.',
        'overview.Automate workflows with product data': '프러덕트 데이터를 활용하여 워크플로우를 자동화하세요.',
        'overview.Query & visualize product and third party data together':
            '프러덕트 데이터와 제 3자 데이터를 함께 조회하고 시각화 합니다.',
        'overview.Track all your most important product and performance metrics in one place':
            '당신의 중요 프러덕트와 성능 지표를 한 곳에서 추적해 보세요.',
        'overview.Get feedback from users.': '사용자들로부터 후기를 들어보세요.',
        'overview.Built-in customer support with chat widget and unified inbox.':
            '채팅 위젯과 통합 받은편지함을 갖춘 내장형 고객 지원 기능',
        'overview.AI coding agent that understands your product analytics.':
            '프로덕트 분석을 이해하는 AI 코딩 에이전트',
        'overview.Guide users through your product with interactive tours and announcements.':
            '인터랙티브 투어와 공지를 통해 사용자를 프로덕트 사용 과정에서 안내하세요',
        'overview.Debug entire AI conversations with full trace visibility.':
            '전체 추적 정보를 바탕으로 AI 대화를 디버깅하세요.',
        'overview.Inspect every LLM call with full input/output visibility.':
            '모든 LLM 호출을 전체 입력/출력까지 확인하며 점검해 보세요.',
        'overview.Run LLM-as-a-judge evaluations to catch regressions.':
            '귀를 감지하기 위해 LLM을 평가자로 활용한 테스트를 실행해 보세요.',
        'overview.Run A/B tests without writing code.': '코드 작성 없이 A/B 테스트를 실시해 보세요',
        'overview.Analyze multi-seat accounts and other groups.':
            '여러 사용자가 포함된 계정과 다양한 그룹을 분석해 보세요.',
        'overview.Features for teams': '팀 맞춤 기능',
        'overview.Track revenue alongside product metrics': '프러덕트 지표와 함께 수익을 추적해 보세요',
        'overview.Custom API endpoints powered by your PostHog data.':
            'PostHog 데이터를 기반으로 한 커스텀 API 엔드포인트',

        // === 제품 카테고리명 (Sheet2 rows 188-194) ===
        'category.Analytics': '분석',
        'category.Data stack': '데이터 스택',
        'category.Feature development': '기능 개발',
        'category.Debugging & analysis': '디버깅&분석',
        'category.AI tools': 'AI 툴',
        'category.Feedback & testing': '피드백&테스트',
        'category.Tools': '툴',

        // === CTA 컴포넌트 (Sheet2 rows 168-170, 132-145) ===
        'cta.addedToCart': '보인다 보여! 지금 벌써 3분이나 저희 제품을 카트에 실었네요😏😏',
        'cta.ifRealCart': '물론 저희는 친환경을 지향해서 CD도 카트도 필요 없지만',
        'cta.notEndorsed': '킴 카다시안은 절대 이용하지 않을 최고의 지적 서비스',
        'cta.ecoFriendly': '환경 친화적-CD 필요없음!',
        'cta.postHogCloud': 'PostHog 클라우드',
        'cta.digitalDownload': '디지털 다운로드',
        'cta.webProduct': 'PostHog는 웹 기반 제품이므로 CD로 설치할 필요가 없습니다.',
        'cta.floppyDisk': '예전에 고객에게 플로피 디스크를 보내드린 적은 있지만, 사실은 릭롤이었습니다.',
        'cta.selectCloud': '클라우드를 선택하세요',
        'cta.usVirginia': '미국 (버지니아주)',
        'cta.euFrankfurt': 'EU(프랑크푸르트)',
        'cta.leftAtThisPrice': '단 1개만 남았습니다!',
        'cta.getStartedBtn': '시작하세요',
        'cta.hurry': '서두르세요:',
        'cta.companiesSignedUp': '개 기업이 오늘 가입했습니다',
        'cta.actNow': '지금 바로 주문하시면 첫 주문 시 0원에 구매하실 수 있습니다',

        // === 툴팁 (Sheet2 rows 216-219) ===
        'tooltip.firstCustomer': '첫 번째 PostHog 고객!',
        'tooltip.readCustomerStory': '고객 성공 사례 보기',
        'tooltip.connectYourOwn': '오픈소스-직접 서버에 설치 가능',
        'hitCounter.totalHits': 'PostHog의 총 방문자 수',
        'hitCounter.visitor': '방문자 수',

        // === 페이지 네비게이션 (Sheet2 rows 214-215) ===
        'nav.tableOfContents': '컨텐츠 목록',
        'nav.contents': '컨텐츠',

        // === 기타 (Sheet2 row 50) ===
        'products.youMayAlsoLike': '다음 제품들은 어떠신가요?',
    },
}

export const useT = () => {
    const locale = useLocale()
    return (key: string, fallback: string) => {
        if (locale === 'en') return fallback
        return translations[locale]?.[key] || fallback
    }
}

export const useLocalUrl = () => {
    const locale = useLocale()
    return (path: string) => {
        if (locale === 'en' || path.startsWith('http')) return path
        return `https://posthog.com${path}`
    }
}
