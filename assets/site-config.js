// 쿠쿠 자동화 시스템 홈페이지 설정 파일입니다.
// GitHub Releases 최신 릴리즈와 자동 연동되도록 구성했습니다.
window.SITE_CONFIG = {
  githubOwner: "kiuja78",
  githubRepo: "cuckoo-work-system",
  releasesApiUrl: "https://api.github.com/repos/kiuja78/cuckoo-work-system/releases/latest",
  latestReleaseUrl: "https://github.com/kiuja78/cuckoo-work-system/releases/latest",

  // API 호출 실패 시 표시할 예비값입니다.
  fallbackVersion: "최신 버전",
  fallbackDate: "GitHub Releases 확인 필요",

  programs: {
    cuckoo: {
      title: "업무자동화 시스템",
      fileName: "CUCKOO_Automation.zip",
      linkId: "link-cuckoo",
      statusId: "status-cuckoo"
    },
    sales: {
      title: "영업관리 시스템",
      fileName: "Sales_Manager.zip",
      linkId: "link-sales",
      statusId: "status-sales"
    },
    quote: {
      title: "견적자동화 시스템",
      fileName: "Quote_Automation.zip",
      linkId: "link-quote",
      statusId: "status-quote"
    },
    mobile: {
      title: "고객관리 모바일 시스템",
      fileName: "Customer_Mobile_System.zip",
      linkId: "link-mobile",
      statusId: "status-mobile"
    },
    calculator: {
      title: "제품가격 수당계산 시스템",
      fileName: "Price_Commission_Calculator.zip",
      linkId: "link-calculator",
      statusId: "status-calculator"
    }
  }
};
