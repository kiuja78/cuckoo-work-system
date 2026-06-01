
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


const RELEASE_VERSION_ALIASES = {
  cuckoo: ['쿠쿠업무자동화시스템', '쿠쿠 업무자동화시스템', '업무자동화시스템', '업무 자동화 시스템', 'CUCKOO Automation', 'CUCKOO_Automation'],
  sales: ['지국영업관리시스템', '지국 영업관리시스템', '영업관리시스템', '영업 관리 시스템', 'Sales Manager', 'Sales_Manager'],
  quote: ['견적자동화시스템', '견적 자동화 시스템', 'Estimate System', 'Quote_Automation'],
  mobile: ['고객관리모바일시스템', '고객관리 모바일 시스템', 'Customer_Mobile_System', 'Customer Care'],
  calculator: ['제품가격수당계산시스템', '제품가격 수당계산 시스템', '제품가격수당계산기', '제품가격 수당계산기', 'Price & Commission']
};

let RELEASE_VERSION_CACHE = {};

function normalizeReleaseText(text) {
  return String(text || '')
    .replace(/\r?\n/g, ' ')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeRegExp(text) {
  return String(text).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function extractProgramVersions(release) {
  const source = normalizeReleaseText([
    release?.name,
    release?.tag_name,
    release?.body
  ].filter(Boolean).join(' / '));

  const result = {};
  Object.entries(RELEASE_VERSION_ALIASES).forEach(([key, aliases]) => {
    for (const alias of aliases) {
      const compactAlias = alias.replace(/\s+/g, '\\s*');
      const patterns = [
        new RegExp(`${compactAlias}[^Vv0-9]{0,30}[Vv]?\\s*(\\d+(?:\\.\\d+)+)`, 'i'),
        new RegExp(`${compactAlias}[^Vv0-9]{0,30}[Vv]?\\s*(\\d+)`, 'i')
      ];
      for (const pattern of patterns) {
        const match = source.match(pattern);
        if (match && match[1]) {
          result[key] = `V${match[1]}`;
          return;
        }
      }
    }
  });
  return result;
}

function getDisplayVersion(key, program) {
  return RELEASE_VERSION_CACHE[key] || program.version;
}

function connectPrograms(release) {
  const config = window.SITE_CONFIG || {};
  const programs = config.programs || {};
  const assets = Array.isArray(release?.assets) ? release.assets : [];
  RELEASE_VERSION_CACHE = extractProgramVersions(release);

  Object.entries(programs).forEach(([key, program]) => {
    const row = document.querySelector(`.download-row[data-program="${key}"]`);
    const link = document.getElementById(program.linkId);

    if (program.type === 'web') {
      const dateText = formatDate(program.updatedAt || '');
      setProgramVersion(key, getDisplayVersion(key, program));
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
    const forcedReady = Boolean(program.forceDownload);
    const href = asset?.browser_download_url || makeLatestDownloadUrl(config, program.fileName);
    const dateText = formatDate(asset?.updated_at || asset?.created_at || program.updatedAt || release?.published_at || release?.created_at || '');

    setProgramVersion(key, getDisplayVersion(key, program));
    setProgramDate(key, dateText);

    if (link) {
      if (asset || forcedReady) {
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
      row.classList.toggle('ready', Boolean(asset || forcedReady));
      row.classList.toggle('pending', !Boolean(asset || forcedReady));
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

const MANUAL_DATA = {
  cuckoo: {
    category: 'MAIN PROGRAM MANUAL',
    title: '업무자동화시스템',
    summary: '고객정보 PDF·엑셀 파일을 자동으로 정리하고, 계정 관리와 방문 준비용 자료를 빠르게 만드는 메인 자동화 시스템입니다.',
    version: 'V10.100',
    mode: 'Windows Program',
    actionKey: 'cuckoo',
    theme: 'blue',
    features: [
      'PDF/엑셀 고객정보 자동 정리',
      '기준월 기준 개월차 계산 및 만기 리스트 생성',
      '선택 추출·고객문자발송용 자료 생성',
      '현장 방문 준비용 출력자료와 요약자료 정리'
    ],
    steps: [
      'PDF 또는 엑셀 파일을 불러옵니다.',
      '기준월과 추출 메뉴를 선택합니다.',
      '추출변환시작을 눌러 결과 파일을 생성합니다.',
      '생성된 리스트를 방문 준비, 문자 발송, 출력 자료로 활용합니다.'
    ],
    useCases: [
      '매월 고객 계정 파일을 정리할 때',
      '만기고객/특정 제품군만 빠르게 분리할 때',
      '방문 준비용 고객목록과 요약 시트가 필요할 때',
      '수작업 엑셀 정리를 줄이고 싶을 때'
    ],
    note: '기준월 변경과 입력 파일 형식 확인이 가장 중요합니다. 프로그램 실행 전 PDF/엑셀 원본을 먼저 백업해 두는 것을 권장합니다.',
    gallery: [
      {
        title: '메인 실행 화면',
        caption: '파일 첨부, 기준월 선택, 추출 메뉴 선택 후 변환을 시작하는 메인 작업 화면',
        type: 'image',
        imgSrc: 'assets/manuals/cuckoo_main.png',
        alt: '업무자동화시스템 메인 실행 화면'
      },
      {
        title: '결과 시트 예시',
        caption: '최종정리, 작업요약, 만기리스트, 고객문자발송 시트 등 결과 파일 예시',
        type: 'image',
        imgSrc: 'assets/manuals/cuckoo_result.png',
        alt: '업무자동화시스템 결과 시트 예시'
      }
    ],
    menus: [
      { title: '기본리스트', desc: '고객정보를 가장 기본 형태로 정리하는 핵심 메뉴입니다. 최종정리, 작업요약 등 실무용 시트를 생성합니다.', points: ['일반 고객 전체 흐름 파악', '방문 준비 기본자료 생성', '정리 결과를 출력/공유 자료로 활용'] },
      { title: '만기리스트', desc: '의무약정과 사용개월차를 기준으로 만기 대상 고객을 선별합니다. 재렌탈 및 교체안내 대상 관리에 적합합니다.', points: ['만기 대상 집중 추출', '재렌탈 안내용 관리', '의무약정 기준 확인'] },
      { title: '선택리스트', desc: '제품군과 개월차를 선택해 원하는 고객만 뽑아내는 메뉴입니다. 정수기/비데/공청기 등 제품별 실무 활용에 유용합니다.', points: ['제품별 맞춤 추출', '특정 개월차 타깃 관리', '제품별 프로모션 대상 선별'] },
      { title: '고객문자발송', desc: '문자 발송용 번호를 정리해 매니저별 또는 배치별로 활용할 수 있게 준비하는 메뉴입니다.', points: ['휴대폰 번호 정리', '배치 발송 준비', '매니저별 문자 발송 분리'] }
    ]
  },
  sales: {
    category: 'SALES MANAGEMENT MANUAL',
    title: '영업관리시스템',
    summary: '영업현황, 접수내역, 멤버십 내역, 컨택 흐름을 한 곳에서 관리하는 영업 운영 시스템입니다.',
    version: 'V7.40',
    mode: 'Windows Program',
    actionKey: 'sales',
    theme: 'indigo',
    features: [
      '영업현황과 목표월 관리',
      '접수내역·멤버십 내역 통합 운영',
      '상태·매니저·컨택자 필터와 검색',
      '팀 운영 흐름을 한 화면에서 관리'
    ],
    steps: [
      '프로그램을 실행하고 목표월을 확인합니다.',
      '영업현황과 접수내역을 입력 또는 확인합니다.',
      '멤버십 내역과 상태 필터를 점검합니다.',
      '검색과 필터로 필요한 건을 빠르게 관리합니다.'
    ],
    useCases: [
      '팀별 영업 흐름을 정리할 때',
      '접수 현황과 멤버십 내역을 함께 관리할 때',
      '매니저별 진행 상태를 확인할 때',
      '목표월 기준 실적 점검이 필요할 때'
    ],
    note: '접수내역과 멤버십 내역은 누락 없이 입력되는 것이 중요합니다. 변경 전 백업과 목표월 기준 확인을 함께 권장합니다.',
    gallery: [
      {
        title: '운영 대시보드',
        caption: '영업현황, 목표월, 팀 운영 핵심 수치를 한 눈에 보는 메인 관리 화면',
        type: 'image',
        imgSrc: 'assets/manuals/sales_dashboard.png',
        alt: '영업관리시스템 운영 대시보드'
      },
      {
        title: '접수/멤버십 관리 화면',
        caption: '상태·매니저·컨택자 필터와 검색 중심의 운영 테이블 화면',
        type: 'image',
        imgSrc: 'assets/manuals/sales_management.png',
        alt: '영업관리시스템 접수 및 멤버십 관리 화면'
      }
    ],
    menus: [
      { title: '영업현황', desc: '팀 전체 영업 진행 상태와 목표월 흐름을 보는 기본 화면입니다. 운영 상황을 빠르게 파악할 수 있습니다.', points: ['월별 실적 흐름 확인', '목표 관리 기초 화면', '지국/팀 운영 상황 파악'] },
      { title: '접수내역', desc: '신규 접수 건을 상태별로 관리하는 메뉴입니다. 진행단계와 담당 매니저를 함께 확인할 수 있습니다.', points: ['접수 상태 추적', '담당자별 관리', '설치 일정 전 단계 관리'] },
      { title: '멤버십내역', desc: '멤버십 고객을 별도로 관리하는 영역입니다. 상태, 매니저, 컨택자 기준으로 빠르게 필터링할 수 있습니다.', points: ['멤버십 고객 분리관리', '필터/검색 지원', '상태별 운영 관리'] },
      { title: '검색/필터', desc: '상태, 매니저, 컨택자를 바로 필터링하고 전체 검색으로 필요한 건을 즉시 찾는 실무용 기능입니다.', points: ['운영 속도 향상', '실시간 점검 편의', '누락 건 빠른 재확인'] }
    ]
  },
  quote: {
    category: 'ESTIMATE SYSTEM CATALOG',
    title: '견적자동화시스템',
    summary: '제품 선택, 가격 정보, 대표 이미지, 견적서 출력 흐름을 자동화하여 고객 안내와 견적 작성 시간을 줄이는 시스템입니다.',
    version: 'V1.00',
    mode: 'Developing',
    actionKey: 'quote',
    theme: 'cyan',
    features: ['제품별 견적 항목 구성', '제품 이미지와 가격 정보 연동', '견적서 출력 또는 공유용 자료 생성 지원', '수당계산기와 제품 데이터 연계 가능'],
    steps: ['견적 대상 제품을 선택합니다.', '약정, 관리 방식, 가격 조건을 확인합니다.', '대표 이미지와 안내 문구를 검토합니다.', '고객 안내용 견적 자료로 활용합니다.'],
    useCases: ['고객에게 제품별 조건을 빠르게 설명해야 할 때', '견적서를 반복 작성해야 할 때', '제품 이미지와 가격 정보를 함께 보여줘야 할 때', '현장 상담 후 안내자료가 필요할 때'],
    note: '현재 개발중인 시스템입니다. 정식 ZIP 파일이 최신 릴리즈에 업로드되면 홈페이지 버튼이 자동으로 다운로드로 전환됩니다.',
    gallery: [],
    menus: []
  },
  mobile: {
    category: 'MOBILE CUSTOMER CATALOG',
    title: '고객관리모바일시스템',
    summary: '모바일 환경에서 고객정보, 방문 위치, 연락 흐름을 빠르게 확인해 현장 응대 효율을 높이는 고객관리 지원 시스템입니다.',
    version: 'V1.00',
    mode: 'Developing',
    actionKey: 'mobile',
    theme: 'purple',
    features: ['모바일 화면에 맞춘 고객정보 확인', '방문 위치와 고객 상태 확인', '현장 응대에 필요한 핵심 정보 표시', '고객 방문지도 기능과 연계 가능'],
    steps: ['모바일에서 시스템 주소 또는 바로가기를 엽니다.', '관리 대상 고객 또는 방문 대상 고객을 확인합니다.', '위치와 고객 정보를 기준으로 방문 준비를 합니다.', '현장에서 필요한 응대 정보를 빠르게 확인합니다.'],
    useCases: ['PC 없이 현장에서 고객 정보를 확인해야 할 때', '방문 전 고객 위치와 기본 정보를 빠르게 봐야 할 때', '고객 응대 흐름을 모바일에서 이어가야 할 때', '방문관리와 지도 기능을 함께 쓰고 싶을 때'],
    note: '현재 개발중인 시스템입니다. 모바일 보안 정책과 구글시트/지도 연동 구조를 함께 점검하면서 확장하는 것이 좋습니다.',
    gallery: [],
    menus: []
  },
  calculator: {
    category: 'WEB CALCULATOR MANUAL',
    title: '제품가격수당계산시스템',
    summary: '제품군, 모델, 약정, 관리방식에 따른 가격과 수당 정보를 웹에서 바로 확인할 수 있는 현장 영업용 계산 시스템입니다.',
    version: 'V78',
    mode: 'Web App',
    actionKey: 'calculator',
    theme: 'green',
    features: ['제품별 가격 조건 빠른 확인', '약정·관리 방식에 따른 수당 계산', '모바일/PC에서 웹으로 바로 실행', '현장 상담용 제품 조건 확인 지원'],
    steps: ['웹으로 열기 버튼으로 계산기를 실행합니다.', '제품군과 모델을 선택합니다.', '약정 및 관리 조건을 확인합니다.', '가격과 수당 결과를 현장 상담에 활용합니다.'],
    useCases: ['고객 상담 중 가격을 빠르게 확인해야 할 때', '제품별 수당 조건을 바로 비교해야 할 때', '모바일에서 별도 설치 없이 계산해야 할 때', '현장 영업용 계산기를 공유해야 할 때'],
    note: '이 시스템은 ZIP 다운로드가 아니라 웹앱 실행 방식입니다. 최신 링크는 홈페이지 버튼에 직접 연결되어 있습니다.',
    gallery: [
      {
        title: '메인 계산 화면',
        caption: '제품군 선택부터 모델 확인까지 빠르게 이동할 수 있는 메인 화면',
        type: 'image',
        imgSrc: 'assets/manuals/calculator_main.png',
        alt: '제품가격수당계산시스템 메인 화면'
      },
      {
        title: '상세 계산 화면',
        caption: '선택한 제품의 약정, 관리방식, 월 렌탈료와 수당을 확인하는 상세 화면',
        type: 'image',
        imgSrc: 'assets/manuals/calculator_detail.png',
        alt: '제품가격수당계산시스템 상세 계산 화면'
      }
    ],
    menus: [
      { title: '제품리스트', desc: '정수기, 비데, 공기청정기 등 제품군별로 목록을 빠르게 탐색하는 기본 화면입니다.', points: ['제품군별 빠른 이동', '모델 확인 중심'] },
      { title: '옵션 보기', desc: '선택한 제품의 약정, 관리방식, 가격 조건을 자세히 확인하는 메뉴입니다.', points: ['약정 조건 확인', '세부 옵션 비교'] },
      { title: '수당 계산', desc: '제품별 가격과 조건에 따라 예상 수당 정보를 함께 보여주는 핵심 기능입니다.', points: ['가격·수당 동시 확인', '현장 상담 속도 향상'] },
      { title: '제품 확대', desc: '제품 이미지를 크게 확인해 고객 상담 중 시각적으로 보여주기 쉬운 보조 기능입니다.', points: ['이미지 확대 확인', '모바일 상담 편의'] }
    ]
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

function fillList(id, items) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = '';
  (items || []).forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    el.appendChild(li);
  });
}

function renderGallery(items) {
  const wrap = document.getElementById('manualGallery');
  if (!wrap) return;
  wrap.innerHTML = '';
  if (!items || !items.length) {
    wrap.innerHTML = '<div class="empty-manual">상세 화면 매뉴얼은 현재 준비 중입니다.</div>';
    return;
  }

  items.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'showcase-card';
    const visual = document.createElement('div');
    visual.className = `showcase-visual ${item.type || ''}`;

    if (item.type === 'image' && item.imgSrc) {
      visual.innerHTML = `<img src="${item.imgSrc}" alt="${item.alt || item.title || ''}" loading="lazy">`;
    }

    const meta = document.createElement('div');
    meta.className = 'showcase-meta';
    meta.innerHTML = `<h4>${item.title || ''}</h4><p>${item.caption || ''}</p>`;

    card.appendChild(visual);
    card.appendChild(meta);
    wrap.appendChild(card);
  });
}

function renderMenus(items) {
  const wrap = document.getElementById('manualMenus');
  if (!wrap) return;
  wrap.innerHTML = '';
  if (!items || !items.length) {
    wrap.innerHTML = '<div class="empty-manual">상세 메뉴 설명은 현재 준비 중입니다.</div>';
    return;
  }
  items.forEach((item) => {
    const article = document.createElement('article');
    article.className = 'menu-card';
    article.innerHTML = `
      <div class="menu-card-head"><h4>${item.title}</h4></div>
      <p>${item.desc}</p>
      <ul>${(item.points || []).map(v => `<li>${v}</li>`).join('')}</ul>
    `;
    wrap.appendChild(article);
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
  document.getElementById('manualVersion').textContent = RELEASE_VERSION_CACHE[key] || data.version;
  document.getElementById('manualMode').textContent = data.mode;
  fillList('manualFeatures', data.features);
  fillList('manualSteps', data.steps);
  fillList('manualUseCases', data.useCases);
  document.getElementById('manualNote').textContent = data.note;
  renderGallery(data.gallery);
  renderMenus(data.menus);

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

document.addEventListener('DOMContentLoaded', () => {
  loadReleases();
  initManualCards();
});
