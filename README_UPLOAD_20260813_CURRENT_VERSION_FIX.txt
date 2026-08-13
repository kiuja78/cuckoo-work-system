쿠쿠 자동화 시스템 홈페이지 현재 버전 보정 패치

적용 파일:
- assets/site-config.js
- version.json

수정 이유:
이전 패치의 기본 버전값이 오래된 릴리즈 정보 기준으로 남아 있어 홈페이지 표시에 낮은 버전이 보일 수 있었습니다.
이번 패치는 프로그램별 지정 릴리즈 저장소를 그대로 유지하면서, 현재 확인 기준 버전을 기본값으로 보정했습니다.
또한 GitHub API가 과거 캐시/낮은 버전을 반환하더라도 홈페이지 기본값보다 낮은 버전으로 덮어쓰지 않도록 버전 비교 로직을 추가했습니다.

반영 내용:
- 업무자동화시스템: V15.04 / cuckoo-work-system 지정 릴리즈 확인
- 영업관리시스템: V9.94 / cuckoo-sales-system 지정 릴리즈 확인
- 견적자동화시스템: V9.42.7 / cuckoo-Quote_system 지정 릴리즈 확인
- 고객관리모바일시스템: V1.00 유지
- 제품가격수당계산시스템: V93 / https://kiuja78.github.io/calculator/ 유지

업로드 방법:
1. ZIP 압축 해제
2. github_pages_update_site 폴더 안 파일을 cuckoo-work-system 저장소 최상위에 덮어쓰기 업로드
3. Commit changes
4. 1~3분 뒤 Ctrl+F5로 강력 새로고침
