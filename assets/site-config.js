// 쿠쿠 자동화 시스템 홈페이지 설정 파일
// 각 시스템의 버전은 여기에서 개별 관리하고, ZIP 프로그램은 GitHub Releases 최신 릴리즈에서 연결하고, 웹 시스템은 지정된 웹앱 주소로 연결합니다.
window.SITE_CONFIG = {
  githubOwner: "kiuja78",
  githubRepo: "cuckoo-work-system",
  releasesApiUrl: "https://api.github.com/repos/kiuja78/cuckoo-work-system/releases/latest",
  latestReleaseUrl: "https://github.com/kiuja78/cuckoo-work-system/releases/latest",
  programs: {
    cuckoo: {
      title: "업무자동화시스템",
      version: "V10.110",
      updatedAt: "2026-05-16",
      fileName: "CUCKOO_Automation.zip",
      linkId: "link-cuckoo",
      forceDownload: true
    },
    sales: {
      title: "영업관리시스템",
      version: "V7.10",
      updatedAt: "2026-05-29",
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
      version: "V78",
      updatedAt: "2026-05-30",
      type: "web",
      webUrl: "https://script.google.com/macros/s/AKfycbyxEK95YexqaeA0oU1aZy4wWZ3sOwaIJw908VAVxJfr8cV0yCD_9RrQ8dk9_roK8ivd/exec",
      linkId: "link-calculator"
    }
  }
};
