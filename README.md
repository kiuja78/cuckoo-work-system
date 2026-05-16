# 쿠쿠 업무 자동화 지원 시스템

쿠쿠 업무 자동화 지원 시스템 홈페이지입니다.

이 사이트는 다음 목적을 위해 구성되었습니다.

- 쿠쿠 업무 자동화 시스템 소개
- 고객 방문 업무 지원 안내
- 카카오맵 기반 고객 방문지도 제공 준비
- 프로그램 최신 버전 다운로드 안내
- 업데이트 내역 관리
- 개인정보 처리 안내

## 배포 구조

- 홈페이지: GitHub Pages
- 프로그램 파일: GitHub Releases
- 업데이트 정보: `version.json`

## 수정할 주요 파일

- `index.html`: 홈페이지 본문 문구와 메뉴
- `assets/styles.css`: 디자인 스타일
- `assets/site-config.js`: 최신 버전, 날짜, 다운로드 링크 설정
- `version.json`: 프로그램 자동 업데이트 연동용 정보

## 다운로드 버튼 직접 연결 방법

GitHub Releases에 프로그램 파일을 올린 뒤, 파일 다운로드 주소를 복사해서 아래 파일에 입력합니다.

```js
// assets/site-config.js
directDownloadUrl: "https://github.com/kiuja78/cuckoo-work-system/releases/download/v1.0.0/cuckoo-work-system-v1.0.0.zip"
```

`directDownloadUrl`이 비어 있으면 최신 Release 페이지로 이동합니다.
