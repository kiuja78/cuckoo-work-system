// 쿠쿠 자동화 시스템 홈페이지 설정 파일
// 각 시스템의 버전은 기본값으로 표시하고, ZIP 프로그램 및 웹 시스템 버전은 GitHub Releases 제목/본문의 "시스템명+V버전" 표기를 우선 적용합니다.
// 제품가격수당계산시스템 웹앱 주소 변경일: 2026-06-10

window.SITE_CONFIG = {
  githubOwner: "kiuja78",
  githubRepo: "cuckoo-work-system",
  releasesApiUrl: "https://api.github.com/repos/kiuja78/cuckoo-work-system/releases/latest",
  latestReleaseUrl: "https://github.com/kiuja78/cuckoo-work-system/releases/latest",
  programs: {
    cuckoo: {
      title: "업무자동화시스템",
      version: "V12.70",
      updatedAt: "2026-05-16",
      fileName: "CUCKOO_Automation.zip",
      linkId: "link-cuckoo",
      forceDownload: true
    },
    sales: {
      title: "영업관리시스템",
      version: "V8.90",
      updatedAt: "2026-05-16",
      fileName: "Sales_Manager.zip",
      linkId: "link-sales",
      forceDownload: true
    },
    quote: {
      title: "견적자동화시스템",
      version: "V1.00",
      updatedAt: "2026-05-23",
      fileName: "Quote_Automation.zip",
      linkId: "link-quote"
    },
    mobile: {
      title: "고객관리모바일시스템",
      version: "V1.00",
      updatedAt: "2026-05-11",
      fileName: "Customer_Mobile_System.zip",
      linkId: "link-mobile"
    },
    calculator: {
      title: "제품가격수당계산시스템",
      version: "V79",
      updatedAt: "2026-06-10",
      type: "web",
      webUrl: "https://bit.ly/4uf5cRE",
      linkId: "link-calculator"
    }
  }
};
