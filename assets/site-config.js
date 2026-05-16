// 사이트 기본 설정 파일입니다.
// GitHub 계정명, 저장소명, 다운로드 파일명은 실제 운영 기준으로 고정해두었습니다.
window.SITE_CONFIG = {
  latestVersion: "v1.0.0",
  latestDate: "2026.05.17",
  githubOwner: "kiuja78",
  githubRepo: "cuckoo-work-system",

  // GitHub Releases 최신 릴리즈에 업로드된 고정 파일명입니다.
  // 앞으로 새 버전을 올릴 때도 파일명을 반드시 CUCKOO_Automation.zip 으로 유지하세요.
  downloadFileName: "CUCKOO_Automation.zip",

  // 최신 릴리즈의 CUCKOO_Automation.zip 파일을 바로 다운로드합니다.
  directDownloadUrl: "https://github.com/kiuja78/cuckoo-work-system/releases/latest/download/CUCKOO_Automation.zip",

  // 예비 링크: 직접 다운로드가 실패할 때 사용자가 최신 Release 페이지를 확인할 수 있습니다.
  latestReleaseUrl: "https://github.com/kiuja78/cuckoo-work-system/releases/latest"
};
