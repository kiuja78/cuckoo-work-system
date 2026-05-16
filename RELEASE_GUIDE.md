# GitHub Pages + GitHub Releases 운영 가이드

## 1. 권장 저장소 이름

추천 저장소 이름:

- `cuckoo-work-system`
- `visit-map-system`
- `customer-map-system`

예시 주소:

```text
https://kiuja78.github.io/cuckoo-work-system/
```

## 2. GitHub Pages 설정

1. GitHub 저장소 접속
2. `Settings` 클릭
3. 왼쪽 메뉴 `Pages` 클릭
4. Source 또는 Build and deployment 항목에서 `Deploy from a branch` 선택
5. Branch: `main`
6. Folder: `/root`
7. Save 클릭

몇 분 후 사이트가 게시됩니다.

## 3. 카카오 Developers 도메인 등록

카카오 Developers → 내 애플리케이션 → 플랫폼 → Web 플랫폼 등록에서 아래 주소를 등록합니다.

```text
https://kiuja78.github.io
```

프로젝트 경로까지 요구되는 경우 아래 주소도 함께 등록합니다.

```text
https://kiuja78.github.io/cuckoo-work-system
```

## 4. Releases에 프로그램 파일 올리기

1. 저장소에서 `Releases` 메뉴 클릭
2. `Draft a new release` 클릭
3. Tag 입력: `v1.0.0`
4. Release title 입력: `방문관리 업무자동화 지원 시스템 v1.0.0`
5. 설명 입력 예시:

```text
주요 변경사항
- 초기 배포
- 카카오맵 고객 방문지도 안내 페이지 구성
- 다운로드 페이지 구성
- 개인정보 처리방침 포함
```

6. 하단 파일 첨부 영역에 `zip` 또는 `exe` 파일 업로드
7. `Publish release` 클릭

## 5. 업데이트할 때 반복할 작업

1. 새 프로그램 파일 생성
2. GitHub Releases에서 새 릴리즈 작성
3. `assets/site-config.js`의 버전과 날짜 수정
4. `version.json`의 최신 버전과 다운로드 주소 수정
5. 변경사항 commit

## 6. 회사 보안 대응 팁

- EXE 단독 파일이 막히면 ZIP으로 압축해서 배포합니다.
- ZIP도 막히면 파일명을 업무용으로 명확하게 작성합니다.
- 예: `visit-management-system-v1.0.0.zip`
- 보안 경고가 반복되면 추후 코드서명 인증서 또는 사내 허용 절차가 필요할 수 있습니다.
