# 방문관리 업무자동화 지원 시스템 홈페이지

GitHub Pages로 운영할 수 있는 무료 홈페이지 템플릿입니다.
카카오맵 승인용 홈페이지, 업무자동화 프로그램 다운로드 안내, 업데이트 공지, 개인정보 처리방침을 한 페이지에 포함합니다.

## 구성 파일

- `index.html` : 메인 홈페이지
- `assets/styles.css` : 디자인 스타일
- `assets/site-config.js` : 버전, GitHub Releases 링크 설정
- `assets/app.js` : 메뉴 및 기본 동작
- `version.json` : 향후 프로그램 자동 업데이트 확인용 메타 파일
- `RELEASE_GUIDE.md` : GitHub Pages / GitHub Releases 운영 가이드

## 수정해야 할 값

`assets/site-config.js` 파일에서 아래 값을 본인 저장소에 맞게 수정하세요.

```js
window.SITE_CONFIG = {
  latestVersion: "v1.0.0",
  latestDate: "2026.05.16",
  githubOwner: "kiuja78",
  githubRepo: "cuckoo-work-system",
  latestReleaseUrl: "https://github.com/kiuja78/cuckoo-work-system/releases/latest",
  allReleasesUrl: "https://github.com/kiuja78/cuckoo-work-system/releases"
};
```

## GitHub Pages 게시 방법

1. GitHub에서 새 저장소를 만듭니다. 예: `cuckoo-work-system`
2. 이 폴더 안의 모든 파일을 저장소에 업로드합니다.
3. 저장소의 `Settings` → `Pages`로 이동합니다.
4. `Build and deployment`에서 `Deploy from a branch`를 선택합니다.
5. Branch는 `main`, 폴더는 `/root`를 선택합니다.
6. 저장하면 `https://아이디.github.io/저장소명/` 주소가 생성됩니다.

## GitHub Releases 사용 방법

1. 저장소 오른쪽 또는 상단 메뉴에서 `Releases`로 이동합니다.
2. `Draft a new release`를 선택합니다.
3. Tag 예: `v1.0.0`
4. Title 예: `방문관리 업무자동화 지원 시스템 v1.0.0`
5. 프로그램 ZIP 또는 EXE 파일을 첨부합니다.
6. `Publish release`를 누릅니다.

## 카카오맵 연결

`index.html` 하단의 카카오맵 script 주석을 해제하고, `KAKAO_JAVASCRIPT_KEY`를 실제 JavaScript 키로 교체하세요.
카카오 Developers의 Web 플랫폼 도메인에는 GitHub Pages 주소를 등록해야 합니다.
