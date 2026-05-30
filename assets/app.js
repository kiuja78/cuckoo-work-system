function toggleMenu() {
  const menu = document.getElementById('navMenu');
  if (menu) menu.classList.toggle('open');
}

function formatDate(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
}

function makeLatestDownloadUrl(config, fileName) {
  return `https://github.com/${config.githubOwner}/${config.githubRepo}/releases/latest/download/${encodeURIComponent(fileName)}`;
}

function setProgramVersion(programKey, version) {
  const el = document.getElementById(`version-${programKey}`);
  if (el && version) el.textContent = version;
}

function setProgramDate(programKey, dateText) {
  const el = document.getElementById(`date-${programKey}`);
  if (el) el.textContent = dateText || '-';
}

function connectPrograms(release) {
  const config = window.SITE_CONFIG || {};
  const programs = config.programs || {};
  const assets = Array.isArray(release?.assets) ? release.assets : [];

  Object.entries(programs).forEach(([key, program]) => {
    const row = document.querySelector(`.download-row[data-program="${key}"]`);
    const link = document.getElementById(program.linkId);

    // 웹으로 사용하는 시스템은 GitHub Releases를 거치지 않고 지정된 웹앱 주소로 바로 연결합니다.
    if (program.type === 'web') {
      const dateText = formatDate(program.updatedAt || '');
      setProgramVersion(key, program.version);
      setProgramDate(key, dateText);

      if (link) {
        link.href = program.webUrl;
        link.textContent = '웹으로 열기';
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener');
        link.removeAttribute('aria-disabled');
        link.removeAttribute('tabindex');
      }

      if (row) {
        row.classList.add('ready');
        row.classList.remove('pending');
      }
      return;
    }

    const asset = assets.find(item => item.name === program.fileName);
    const href = asset?.browser_download_url || makeLatestDownloadUrl(config, program.fileName);
    const dateText = formatDate(asset?.updated_at || asset?.created_at || program.updatedAt || release?.published_at || release?.created_at || '');

    setProgramVersion(key, program.version);
    setProgramDate(key, dateText);

    if (link) {
      if (asset) {
        link.href = href;
        link.textContent = '다운로드';
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener');
        link.removeAttribute('aria-disabled');
        link.removeAttribute('tabindex');
      } else {
        link.href = 'javascript:void(0)';
        link.textContent = '개발중';
        link.removeAttribute('target');
        link.removeAttribute('rel');
        link.setAttribute('aria-disabled', 'true');
        link.setAttribute('tabindex', '-1');
      }
    }

    if (row) {
      row.classList.toggle('ready', Boolean(asset));
      row.classList.toggle('pending', !asset);
    }
  });
}

async function loadReleases() {
  const config = window.SITE_CONFIG || {};
  try {
    const response = await fetch(config.releasesApiUrl, {
      headers: { 'Accept': 'application/vnd.github+json' },
      cache: 'no-store'
    });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const release = await response.json();
    connectPrograms(release);
  } catch (error) {
    console.warn('GitHub Releases 정보를 불러오지 못했습니다.', error);
    connectPrograms({ assets: [], published_at: '' });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadReleases();
  initManualCards();
});


const MANUAL_DATA = {
  cuckoo: {
    category: 'MAIN PROGRAM CATALOG',
    title: '업무자동화시스템',
    summary: '고객정보 파일 정리, 계정 관리, 고객 방문 준비, 지도 연동 확장을 위한 쿠쿠 현장 업무의 메인 자동화 시스템입니다.',
    version: 'V10.100',
    mode: 'ZIP Download',
    actionText: '프로그램 다운로드',
    actionKey: 'cuckoo',
    features: [
      'PDF/엑셀 기반 고객정보 자동 정리',
      '고객번호·상품명·사용개월차 등 업무 기준 데이터 정리',
      '고객 방문 준비용 리스트와 업무용 자료 생성',
      '고객 방문지도와 연동 가능한 데이터 구조 지원'
    ],
    steps: [
      '프로그램을 다운로드하고 압축을 해제합니다.',
      '업무 파일을 준비한 뒤 프로그램에서 불러옵니다.',
      '기준월과 필요한 추출 조건을 선택합니다.',
      '정리된 결과 파일을 확인하고 현장 업무에 활용합니다.'
    ],
    useCases: [
      '월별 고객 계정 파일을 빠르게 정리해야 할 때',
      '방문 대상 고객을 기준별로 분류해야 할 때',
      '고객 주소 기반 지도 연동 자료가 필요할 때',
      '반복되는 수작업 정리를 줄이고 싶을 때'
    ],
    note: '업무자동화시스템은 전체 자동화 허브의 중심 프로그램입니다. 고객정보 파일 구조가 바뀌면 추출 기준도 함께 점검하는 것이 좋습니다.'
  },
  sales: {
    category: 'SALES MANAGEMENT CATALOG',
    title: '영업관리시스템',
    summary: '영업현황, 접수내역, 멤버십 내역, 컨택 관리 등 지국·팀 단위 영업 흐름을 관리하기 위한 시스템입니다.',
    version: 'V7.40',
    mode: 'ZIP Download',
    actionText: '프로그램 다운로드',
    actionKey: 'sales',
    features: [
      '영업현황과 목표월 기준 데이터 관리',
      '접수내역 및 멤버십 내역 관리',
      '상태·매니저·컨택자 기준 필터링',
      '현장 영업 흐름을 한 화면에서 확인'
    ],
    steps: [
      '영업관리시스템을 다운로드하고 실행합니다.',
      '목표월과 관리 기준을 확인합니다.',
      '접수내역, 멤버십 내역, 컨택 현황을 입력 또는 확인합니다.',
      '필터와 검색 기능으로 필요한 내역을 빠르게 확인합니다.'
    ],
    useCases: [
      '팀별 영업현황을 정리해야 할 때',
      '접수/멤버십 고객을 따로 관리해야 할 때',
      '컨택 담당자와 진행 상태를 추적해야 할 때',
      '월별 목표와 실적 흐름을 확인해야 할 때'
    ],
    note: '영업관리시스템은 현장 관리용 데이터가 누락되지 않는 것이 중요합니다. 업데이트 전 기존 데이터 백업을 권장합니다.'
  },
  quote: {
    category: 'ESTIMATE SYSTEM CATALOG',
    title: '견적자동화시스템',
    summary: '제품 선택, 가격 정보, 대표 이미지, 견적서 출력 흐름을 자동화하여 고객 안내와 견적 작성 시간을 줄이는 시스템입니다.',
    version: 'V1.00',
    mode: 'Developing',
    actionText: '개발중',
    actionKey: 'quote',
    features: [
      '제품별 견적 항목 구성',
      '제품 이미지와 가격 정보 연동',
      '견적서 출력 또는 공유용 자료 생성 지원',
      '수당계산기와 제품 데이터 연계 가능'
    ],
    steps: [
      '견적 대상 제품을 선택합니다.',
      '약정, 관리 방식, 가격 조건을 확인합니다.',
      '대표 이미지와 안내 문구를 검토합니다.',
      '고객 안내용 견적 자료로 활용합니다.'
    ],
    useCases: [
      '고객에게 제품별 조건을 빠르게 설명해야 할 때',
      '견적서를 반복 작성해야 할 때',
      '제품 이미지와 가격 정보를 함께 보여줘야 할 때',
      '현장 상담 후 안내자료가 필요할 때'
    ],
    note: '현재 개발중인 시스템입니다. 정식 ZIP 파일이 최신 릴리즈에 업로드되면 홈페이지 버튼이 자동으로 다운로드로 전환됩니다.'
  },
  mobile: {
    category: 'MOBILE CUSTOMER CATALOG',
    title: '고객관리모바일시스템',
    summary: '모바일 환경에서 고객정보, 방문 위치, 연락 흐름을 빠르게 확인해 현장 응대 효율을 높이는 고객관리 지원 시스템입니다.',
    version: 'V1.00',
    mode: 'Developing',
    actionText: '개발중',
    actionKey: 'mobile',
    features: [
      '모바일 화면에 맞춘 고객정보 확인',
      '방문 위치와 고객 상태 확인',
      '현장 응대에 필요한 핵심 정보 표시',
      '고객 방문지도 기능과 연계 가능'
    ],
    steps: [
      '모바일에서 시스템 주소 또는 바로가기를 엽니다.',
      '관리 대상 고객 또는 방문 대상 고객을 확인합니다.',
      '위치와 고객 정보를 기준으로 방문 준비를 합니다.',
      '현장에서 필요한 응대 정보를 빠르게 확인합니다.'
    ],
    useCases: [
      'PC 없이 현장에서 고객 정보를 확인해야 할 때',
      '방문 전 고객 위치와 기본 정보를 빠르게 봐야 할 때',
      '고객 응대 흐름을 모바일에서 이어가야 할 때',
      '방문관리와 지도 기능을 함께 쓰고 싶을 때'
    ],
    note: '현재 개발중인 시스템입니다. 모바일 보안 정책과 구글시트/지도 연동 구조를 함께 점검하면서 확장하는 것이 좋습니다.'
  },
  calculator: {
    category: 'WEB CALCULATOR CATALOG',
    title: '제품가격수당계산시스템',
    summary: '제품군, 모델, 약정, 관리방식에 따른 가격과 수당 정보를 웹에서 바로 확인할 수 있는 현장 영업용 계산 시스템입니다.',
    version: 'V78',
    mode: 'Web App',
    actionText: '웹으로 열기',
    actionKey: 'calculator',
    features: [
      '제품별 가격 조건 빠른 확인',
      '약정·관리 방식에 따른 수당 계산',
      '모바일/PC에서 웹으로 바로 실행',
      '현장 상담용 제품 조건 확인 지원'
    ],
    steps: [
      '홈페이지에서 웹으로 열기 버튼을 클릭합니다.',
      '제품군과 모델을 선택합니다.',
      '약정 및 관리 조건을 확인합니다.',
      '가격과 수당 결과를 현장 상담에 활용합니다.'
    ],
    useCases: [
      '고객 상담 중 가격을 빠르게 확인해야 할 때',
      '제품별 수당 조건을 바로 비교해야 할 때',
      '모바일에서 별도 설치 없이 계산해야 할 때',
      '현장 영업용 계산기를 공유해야 할 때'
    ],
    note: '이 시스템은 ZIP 다운로드가 아니라 웹앱 실행 방식입니다. 최신 링크는 홈페이지 버튼에 직접 연결되어 있습니다.'
  }
};

function getProgramAction(key) {
  const config = window.SITE_CONFIG || {};
  const program = config.programs?.[key];
  if (!program) return { href: '#', text: '확인', disabled: true };
  if (program.type === 'web') return { href: program.webUrl, text: '웹으로 열기', disabled: false };

  const link = document.getElementById(program.linkId);
  if (link && link.getAttribute('aria-disabled') !== 'true' && link.href && !link.href.includes('javascript:void')) {
    return { href: link.href, text: '프로그램 다운로드', disabled: false };
  }
  return { href: '#', text: '개발중', disabled: true };
}

function fillList(id, items, ordered = false) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = '';
  items.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    el.appendChild(li);
  });
}

function openManual(key) {
  const data = MANUAL_DATA[key];
  if (!data) return;
  const modal = document.getElementById('manualModal');
  if (!modal) return;

  document.getElementById('manualCategory').textContent = data.category;
  document.getElementById('manualTitle').textContent = data.title;
  document.getElementById('manualSummary').textContent = data.summary;
  document.getElementById('manualVersion').textContent = data.version;
  document.getElementById('manualMode').textContent = data.mode;
  fillList('manualFeatures', data.features);
  fillList('manualSteps', data.steps, true);
  fillList('manualUseCases', data.useCases);
  document.getElementById('manualNote').textContent = data.note;

  const action = getProgramAction(data.actionKey);
  const actionEl = document.getElementById('manualAction');
  if (actionEl) {
    actionEl.textContent = action.text;
    actionEl.href = action.disabled ? 'javascript:void(0)' : action.href;
    actionEl.classList.toggle('disabled', action.disabled);
    if (action.disabled) {
      actionEl.removeAttribute('target');
      actionEl.removeAttribute('rel');
      actionEl.setAttribute('aria-disabled', 'true');
    } else {
      actionEl.setAttribute('target', '_blank');
      actionEl.setAttribute('rel', 'noopener');
      actionEl.removeAttribute('aria-disabled');
    }
  }

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('manual-open');
}

function closeManual() {
  const modal = document.getElementById('manualModal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('manual-open');
}

function initManualCards() {
  document.querySelectorAll('.manual-trigger').forEach((card) => {
    card.addEventListener('click', () => openManual(card.dataset.manual));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openManual(card.dataset.manual);
      }
    });
  });
  document.querySelectorAll('[data-close-manual]').forEach((el) => {
    el.addEventListener('click', closeManual);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeManual();
  });
}
