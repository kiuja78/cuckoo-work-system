# GitHub Releases 업로드 가이드

1. GitHub 저장소에서 `Releases`로 이동합니다.
2. `Draft a new release`를 클릭합니다.
3. 릴리즈 태그와 제목을 입력합니다.
4. 아래 고정 파일명으로 ZIP 파일을 Assets에 업로드합니다.
5. `Publish release`를 클릭합니다.

## 고정 파일명

- `CUCKOO_Automation.zip`
- `Sales_Manager.zip`
- `Quote_Automation.zip`
- `Customer_Mobile_System.zip`

## 웹앱 시스템

제품가격수당계산시스템은 ZIP 파일 업로드 대상이 아니라 Apps Script 웹앱 링크로 연결합니다.

## 버전 표시 수정

각 프로그램의 현재 버전은 `assets/site-config.js`에서 수정합니다.


## 미업로드 프로그램 표시

고정 파일명이 최신 릴리즈 Assets에 없으면 해당 프로그램은 홈페이지에서 `개발중`으로 표시됩니다. GitHub Releases 페이지가 사용자에게 노출되지 않습니다.
