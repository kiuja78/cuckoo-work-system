// 쿠쿠 자동화 시스템 홈페이지 설정 파일
// 각 시스템의 버전은 여기에서 개별 관리하고, 다운로드 파일은 GitHub Releases 최신 릴리즈에서 연결됩니다.
window.SITE_CONFIG = {
  githubOwner: "kiuja78",
  githubRepo: "cuckoo-work-system",
  releasesApiUrl: "https://api.github.com/repos/kiuja78/cuckoo-work-system/releases/latest",
  latestReleaseUrl: "https://github.com/kiuja78/cuckoo-work-system/releases/latest",
  programs: {
    cuckoo: {
      title: "업무자동화시스템",
      version: "V10.100",
      updatedAt: "2026-05-16",
      fileName: "CUCKOO_Automation.zip",
      linkId: "link-cuckoo"
    },
    sales: {
      title: "영업관리시스템",
      version: "V7.40",
      updatedAt: "2026-05-29",
      fileName: "Sales_Manager.zip",
      linkId: "link-sales"
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
      version: "V77",
      updatedAt: "2026-05-08",
      fileName: "Price_Commission_Calculator.zip",
      linkId: "link-calculator"
    }
  }
};
