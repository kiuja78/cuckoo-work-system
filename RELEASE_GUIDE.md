# GitHub Releases 업로드 안내

프로그램 파일은 GitHub Pages 저장소에 직접 올리지 말고, GitHub Releases에 올리는 것을 권장합니다.

## 새 버전 업로드 순서

1. GitHub 저장소 접속
2. 오른쪽 또는 상단 메뉴에서 `Releases` 선택
3. `Draft a new release` 클릭
4. Tag 입력: 예) `v1.0.0`
5. Release title 입력: 예) `쿠쿠 업무 자동화 지원 시스템 v1.0.0`
6. 설명 입력
7. ZIP 또는 EXE 파일 첨부
8. `Publish release` 클릭

## 홈페이지 다운로드 버튼을 파일로 바로 연결하는 방법

Release 게시 시 첨부 파일명을 `CUCKOO_Automation.zip`으로 고정합니다. 홈페이지는 최신 릴리즈의 이 파일명으로 바로 연결되도록 설정되어 있습니다.

예시:

```js
directDownloadUrl: "https://github.com/kiuja78/cuckoo-work-system/releases/latest/download/CUCKOO_Automation.zip"
```

이렇게 하면 사용자가 홈페이지에서 `최신 버전 다운로드`를 눌렀을 때 GitHub Releases 목록 화면이 아니라 `CUCKOO_Automation.zip` 파일 다운로드로 바로 연결됩니다.

## 버전 정보 수정

새 버전을 올릴 때는 아래 파일도 함께 수정하세요.

- `assets/site-config.js`
- `version.json`

예시:

```js
latestVersion: "v1.0.1",
latestDate: "2026.05.20"
```
