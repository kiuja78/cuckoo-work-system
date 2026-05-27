// 사이트 기본 설정 파일입니다.
// GitHub Releases 최신 릴리즈와 자동 연동되도록 구성했습니다.
window.SITE_CONFIG = {
  githubOwner: "kiuja78",
  githubRepo: "cuckoo-work-system",

  // GitHub Releases API에서 최신 릴리즈 정보를 읽어 홈페이지 버전/날짜를 자동 갱신합니다.
  releasesApiUrl: "https://api.github.com/repos/kiuja78/cuckoo-work-system/releases/latest",
  latestReleaseUrl: "https://github.com/kiuja78/cuckoo-work-system/releases/latest",

  // API 호출이 실패했을 때 보여줄 예비값입니다.
  fallbackVersion: "v10.100",
  fallbackDate: "2026.05.16",

  programs: {
    cuckoo: {
      name: "쿠쿠 업무 자동화 시스템",
      fileName: "CUCKOO_Automation.zip",
      linkId: "cuckooDownloadLink",
      statusId: "cuckooAssetStatus",
      fallbackDownloadUrl: "https://github.com/kiuja78/cuckoo-work-system/releases/latest/download/CUCKOO_Automation.zip"
    },
    sales: {
      name: "영업관리 시스템",
      fileName: "Sales_Manager.zip",
      linkId: "salesDownloadLink",
      statusId: "salesAssetStatus",
      fallbackDownloadUrl: "https://github.com/kiuja78/cuckoo-work-system/releases/latest/download/Sales_Manager.zip"
    }
  }
};
