쿠쿠 자동화 시스템 홈페이지 수정 패치 - 2026-06-18

반영 내용
1. 영업관리시스템 다운로드 경로를 별도 저장소 GitHub Releases로 변경
   - 저장소: https://github.com/kiuja78/cuckoo-sales-system
   - 릴리즈 태그: sales-system
   - 릴리즈 제목 기준 확인 버전: 쿠쿠영업관리시스템V8.91

2. 영업관리시스템 다운로드 버튼 유지/활성화
   - 홈페이지 다운로드 표의 영업관리시스템 버튼을 새 저장소 Releases의 최신 asset으로 연결
   - GitHub Release asset 파일명이 바뀌어도 최신 Release의 설치파일(.exe) 또는 압축파일(.zip)을 자동으로 찾아 연결

3. 영업관리시스템 버전
   - 기본 표시: V8.91
   - 별도 저장소 최신 Release 제목/본문에서 버전을 자동 확인하도록 보강

4. 기존 반영 유지
   - 업무자동화시스템: V12.70 / CUCKOO_Automation.zip
   - 견적자동화시스템: V9.34 / Quote_Automation.zip / cuckoo-Quote_system Releases 연결
   - 제품가격수당계산시스템: V79 / https://bit.ly/4uf5cRE

업로드 방법
1. 이 ZIP 파일을 압축 해제합니다.
2. github_pages_update_site 폴더 안의 파일을 GitHub 저장소 cuckoo-work-system 최상위에 업로드합니다.
   - assets/site-config.js → 기존 assets/site-config.js에 덮어쓰기
   - version.json → 기존 version.json에 덮어쓰기
3. 커밋 메시지 예시:
   영업관리시스템 Releases 다운로드 연결
4. 홈페이지 접속 후 Ctrl + F5로 강력 새로고침합니다.

주의
- 현재 GitHub Release 페이지 본문에는 설치파일명이 Sales_Manager_Setup(V8.90).exe로 안내되어 있으나,
  릴리즈 제목은 쿠쿠영업관리시스템V8.91입니다.
- 홈페이지 표시 버전은 릴리즈 제목 기준으로 V8.91을 우선 반영했습니다.
- 실제 다운로드 파일명은 홈페이지 로딩 후 GitHub API에서 최신 asset 이름을 읽어 자동 표시됩니다.
