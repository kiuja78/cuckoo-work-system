쿠쿠 자동화 시스템 홈페이지 수정 패치 - 2026-06-18

반영 내용
1. 견적자동화시스템 다운로드 경로를 별도 저장소 GitHub Releases로 변경
   - 저장소: https://github.com/kiuja78/cuckoo-Quote_system
   - 릴리즈: 견적서자동생성시스템 / 견적서 자동생성 시스템 V9.34
   - 다운로드 URL:
     https://github.com/kiuja78/cuckoo-Quote_system/releases/latest/download/Quote_Automation.zip

2. 견적자동화시스템 파일명 유지
   - Quote_Automation.zip

3. 견적자동화시스템 버튼 활성화
   - 홈페이지 다운로드 표의 견적자동화시스템 버튼을 “다운로드”로 활성화
   - 구성 프로그램 매뉴얼 팝업의 실행/다운로드 버튼도 같은 ZIP 파일로 연결

4. 견적자동화시스템 버전
   - 기본 표시: V9.34
   - 별도 저장소 최신 Release 제목/본문에서 버전을 자동 확인하도록 보강

5. 기존 반영 유지
   - 업무자동화시스템: V12.70 / CUCKOO_Automation.zip
   - 영업관리시스템: V8.90 / Sales_Manager.zip
   - 제품가격수당계산시스템: V79 / https://bit.ly/4uf5cRE

업로드 방법
1. 이 ZIP 파일을 압축 해제합니다.
2. github_pages_update_site 폴더 안의 파일을 GitHub 저장소 cuckoo-work-system 최상위에 업로드합니다.
   - assets/site-config.js → 기존 assets/site-config.js에 덮어쓰기
   - version.json → 기존 version.json에 덮어쓰기
3. 커밋 메시지 예시:
   견적자동화시스템 Releases 다운로드 연결
4. 홈페이지 접속 후 Ctrl + F5로 강력 새로고침합니다.

주의
- 견적자동화시스템 ZIP 파일명은 Quote_Automation.zip으로 유지하는 것을 권장합니다.
- 파일명을 바꾸면 site-config.js의 quote.fileName과 quote.downloadUrl도 함께 수정해야 합니다.
