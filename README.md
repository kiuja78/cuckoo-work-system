# 쿠쿠 자동화 시스템 홈페이지

GitHub Pages에서 운영하는 쿠쿠 자동화 시스템 통합 안내·다운로드 홈페이지입니다.

## 포함 프로그램

- 업무자동화 시스템: `CUCKOO_Automation.zip`
- 영업관리 시스템: `Sales_Manager.zip`
- 견적자동화 시스템: `Quote_Automation.zip`
- 고객관리 모바일 시스템: `Customer_Mobile_System.zip`
- 제품가격 수당계산 시스템: `Price_Commission_Calculator.zip`

## 업로드 방법

압축을 푼 뒤 `github_pages_update_site` 폴더 안의 파일들을 GitHub 저장소 최상위에 덮어쓰기 업로드하세요.

필수 구조:

```text
index.html
assets/
version.json
README.md
RELEASE_GUIDE.md
.nojekyll
```

## 다운로드 파일 운영 규칙

GitHub Releases의 최신 릴리즈 Assets에 위 고정 파일명으로 ZIP 파일을 업로드하면 홈페이지의 다운로드 버튼이 자동으로 연결됩니다.
