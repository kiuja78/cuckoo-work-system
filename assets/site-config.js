// 쿠쿠 자동화 시스템 홈페이지 설정 파일
// 변경일: 2026-08-13
// 목적: 프로그램별 릴리즈 저장소 기준 자동버전 표시 + 현재 기준 버전 하한값 보정

window.SITE_CONFIG = {
  githubOwner: "kiuja78",
  githubRepo: "cuckoo-work-system",
  releasesApiUrl: "https://api.github.com/repos/kiuja78/cuckoo-work-system/releases/tags/%EC%97%85%EB%AC%B4%EC%9E%90%EB%8F%99%ED%99%94%EC%8B%9C%EC%8A%A4%ED%85%9C",
  latestReleaseUrl: "https://github.com/kiuja78/cuckoo-work-system/releases/tag/%EC%97%85%EB%AC%B4%EC%9E%90%EB%8F%99%ED%99%94%EC%8B%9C%EC%8A%A4%ED%85%9C",
  programs: {
    cuckoo: {
      title: "업무자동화시스템",
      version: "V15.04",
      updatedAt: "2026-08-13",
      fileName: "CUCKOO_Automation.zip",
      linkId: "link-cuckoo",
      forceDownload: true,
      downloadUrl: "https://github.com/kiuja78/cuckoo-work-system/releases/download/%EC%97%85%EB%AC%B4%EC%9E%90%EB%8F%99%ED%99%94%EC%8B%9C%EC%8A%A4%ED%85%9C/CUCKOO_Automation.zip"
    },
    sales: {
      title: "영업관리시스템",
      version: "V9.94",
      updatedAt: "2026-08-13",
      fileName: "SETUP(V9.94).exe",
      linkId: "link-sales",
      forceDownload: true,
      sourceType: "github-release",
      sourceRepo: "kiuja78/cuckoo-sales-system",
      releaseApiUrl: "https://api.github.com/repos/kiuja78/cuckoo-sales-system/releases/tags/sales-system",
      latestReleaseUrl: "https://github.com/kiuja78/cuckoo-sales-system/releases/tag/sales-system",
      downloadUrl: "https://github.com/kiuja78/cuckoo-sales-system/releases/download/sales-system/SETUP%28V9.94%29.exe"
    },
    quote: {
      title: "견적자동화시스템",
      version: "V9.42.7",
      updatedAt: "2026-08-13",
      fileName: "Quote_Automation.zip",
      linkId: "link-quote",
      forceDownload: true,
      sourceType: "github-release",
      sourceRepo: "kiuja78/cuckoo-Quote_system",
      releaseApiUrl: "https://api.github.com/repos/kiuja78/cuckoo-Quote_system/releases/tags/%EA%B2%AC%EC%A0%81%EC%84%9C%EC%9E%90%EB%8F%99%EC%83%9D%EC%84%B1%EC%8B%9C%EC%8A%A4%ED%85%9C",
      latestReleaseUrl: "https://github.com/kiuja78/cuckoo-Quote_system/releases/tag/%EA%B2%AC%EC%A0%81%EC%84%9C%EC%9E%90%EB%8F%99%EC%83%9D%EC%84%B1%EC%8B%9C%EC%8A%A4%ED%85%9C",
      downloadUrl: "https://github.com/kiuja78/cuckoo-Quote_system/releases/download/%EA%B2%AC%EC%A0%81%EC%84%9C%EC%9E%90%EB%8F%99%EC%83%9D%EC%84%B1%EC%8B%9C%EC%8A%A4%ED%85%9C/Quote_Automation.zip"
    },
    mobile: {
      title: "고객관리모바일시스템",
      version: "V1.00",
      updatedAt: "2026-05-11",
      fileName: "Customer_Mobile_System.zip",
      linkId: "link-mobile"
    },
    calculator: {
      title: "제품가격수당계산시스템",
      version: "V93",
      updatedAt: "2026-08-11",
      type: "web",
      webUrl: "https://kiuja78.github.io/calculator/",
      linkId: "link-calculator"
    }
  }
};

(function () {
  const config = window.SITE_CONFIG || {};
  const programs = config.programs || {};

  const releaseVersionAliases = {
    cuckoo: ['쿠쿠업무자동화시스템', '쿠쿠 업무자동화시스템', '업무자동화시스템', '업무 자동화 시스템', 'CUCKOO Automation', 'CUCKOO_Automation'],
    sales: ['쿠쿠영업관리시스템', '지국영업관리시스템', '지국 영업관리시스템', '영업관리시스템', '영업 관리 시스템', 'MJ Sales', 'Sales Manager', 'Sales_Manager', 'sales system', 'sales-system'],
    quote: ['견적서 자동생성 시스템', '견적서자동생성시스템', '견적자동화시스템', '견적 자동화 시스템', 'Estimate System', 'Quote_Automation'],
    mobile: ['고객관리모바일시스템', '고객관리 모바일 시스템', 'Customer_Mobile_System', 'Customer Care'],
    calculator: ['제품가격수당계산시스템', '제품가격 수당계산 시스템', '제품가격수당계산기', '제품가격 수당계산기', 'Price & Commission']
  };

  const runtime = {};

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function formatDate(value) {
    if (!value) return '-';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value).replace(/-/g, '.');
    return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())}`;
  }

  function normalizeText(text) {
    return String(text || '')
      .replace(/\r?\n/g, ' ')
      .replace(/[_-]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function escapeRegExp(text) {
    return String(text).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function versionParts(value) {
    const match = String(value || '').match(/(\d+(?:\.\d+)*)/);
    if (!match) return [];
    return match[1].split('.').map(part => Number(part) || 0);
  }

  function compareVersions(a, b) {
    const aa = versionParts(a);
    const bb = versionParts(b);
    const max = Math.max(aa.length, bb.length);
    for (let i = 0; i < max; i += 1) {
      const av = aa[i] || 0;
      const bv = bb[i] || 0;
      if (av > bv) return 1;
      if (av < bv) return -1;
    }
    return 0;
  }

  function chooseVersion(key, release) {
    const configured = programs[key] && programs[key].version;
    const extracted = extractVersion(key, release);
    if (!extracted) return configured || '-';
    if (configured && compareVersions(extracted, configured) < 0) return configured;
    return extracted;
  }

  function extractVersion(key, release) {
    const fallback = programs[key] && programs[key].version;
    const source = normalizeText([
      release && release.name,
      release && release.tag_name,
      release && release.body
    ].filter(Boolean).join(' / '));
    const aliases = releaseVersionAliases[key] || [];
    for (const alias of aliases) {
      const flexibleAlias = escapeRegExp(alias)
        .replace(/\\ /g, '\\s*')
        .replace(/_/g, '[\\s_]*')
        .replace(/-/g, '[\\s-]*');
      const match = source.match(new RegExp(`${flexibleAlias}[^Vv0-9]{0,40}[Vv]?\\s*(\\d+(?:\\.\\d+)+|\\d+)`, 'i'));
      if (match && match[1]) return `V${match[1]}`;
    }
    const loose = source.match(/[Vv]\\s*(\\d+(?:\\.\\d+)+|\\d+)/);
    return loose && loose[1] ? `V${loose[1]}` : fallback;
  }

  function pickAsset(program, release) {
    const assets = Array.isArray(release && release.assets) ? release.assets : [];
    if (!assets.length) return null;
    const wanted = String(program.fileName || '');
    const exact = assets.find(asset => String(asset.name || '') === wanted);
    if (exact) return exact;

    const usable = assets.filter(asset => !/^source code/i.test(String(asset.name || '')));
    const candidates = usable.length ? usable : assets;
    const nameHint = new RegExp([
      String(program.fileName || '').replace(/\.[^.]+$/, ''),
      String(program.title || ''),
      'setup', 'installer', 'manager', 'automation', 'quote', 'estimate'
    ].filter(Boolean).map(v => v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'i');

    return candidates.find(asset => nameHint.test(String(asset.name || '')) && /\.(zip|exe|msi)$/i.test(String(asset.name || '')))
      || candidates.find(asset => /\.(zip|exe|msi)$/i.test(String(asset.name || '')))
      || candidates[0];
  }

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function setFileName(key, fileName, isWeb) {
    const row = document.querySelector(`.download-row[data-program="${key}"]`);
    if (!row) return;
    const fileArea = row.querySelector('.row-file');
    if (!fileArea) return;
    if (isWeb) {
      fileArea.innerHTML = '<span class="web-badge">웹앱 바로가기</span>';
      return;
    }
    const code = fileArea.querySelector('code');
    if (code) code.textContent = fileName;
    else fileArea.innerHTML = `<code>${fileName}</code>`;
  }

  function setReadyState(key, ready) {
    const row = document.querySelector(`.download-row[data-program="${key}"]`);
    if (!row) return;
    row.classList.toggle('ready', Boolean(ready));
    row.classList.toggle('pending', !Boolean(ready));
  }

  function applyProgram(key) {
    const program = programs[key];
    if (!program) return;

    const version = runtime[key]?.version || program.version || '-';
    const updated = runtime[key]?.updatedAt || program.updatedAt || '-';
    const asset = runtime[key]?.asset || null;
    const fileName = asset?.name || program.fileName || '';
    const isWeb = program.type === 'web';
    const href = isWeb
      ? program.webUrl
      : (asset?.browser_download_url || program.downloadUrl || program.latestReleaseUrl || '#');

    setText(`version-${key}`, version);
    setText(`date-${key}`, formatDate(updated));
    setFileName(key, isWeb ? '웹앱 바로가기' : fileName, isWeb);

    const link = document.getElementById(program.linkId);
    if (link) {
      const ready = Boolean(isWeb || href && href !== '#');
      link.href = ready ? href : 'javascript:void(0)';
      link.textContent = isWeb ? '웹으로 열기' : (ready ? '다운로드' : '개발중');
      link.classList.toggle('disabled', !ready);
      link.classList.toggle('pending', !ready);
      if (ready) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener');
        link.removeAttribute('aria-disabled');
        link.removeAttribute('tabindex');
      } else {
        link.removeAttribute('target');
        link.removeAttribute('rel');
        link.setAttribute('aria-disabled', 'true');
        link.setAttribute('tabindex', '-1');
      }
    }
    setReadyState(key, Boolean(isWeb || program.forceDownload || asset));
  }

  function applyAll() {
    Object.keys(programs).forEach(applyProgram);
    patchOpenManualIfVisible();
  }

  async function refreshProgramFromRelease(key) {
    const program = programs[key];
    if (!program || program.type === 'web') return;
    const api = program.releaseApiUrl || config.releasesApiUrl;
    if (!api) return;
    try {
      const response = await fetch(api, {
        headers: { 'Accept': 'application/vnd.github+json' },
        cache: 'no-store'
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const release = await response.json();
      const asset = pickAsset(program, release);
      runtime[key] = {
        version: chooseVersion(key, release) || program.version,
        updatedAt: asset?.updated_at || asset?.created_at || release.published_at || release.created_at || program.updatedAt,
        asset
      };
      applyProgram(key);
    } catch (error) {
      console.warn(`[CUCKOO] ${key} 릴리즈 정보를 불러오지 못했습니다. 기본 설정값으로 표시합니다.`, error);
      runtime[key] = runtime[key] || {};
      applyProgram(key);
    }
  }

  function patchOpenManualIfVisible() {
    const modal = document.getElementById('manualModal');
    if (!modal || !modal.classList.contains('open')) return;
    const title = document.getElementById('manualTitle')?.textContent || '';
    const key = Object.keys(programs).find(k => title.includes(programs[k].title));
    if (!key) return;
    const program = programs[key];
    const action = document.getElementById('manualAction');
    const versionBox = document.getElementById('manualVersion');
    const modeBox = document.getElementById('manualMode');
    const link = document.getElementById(program.linkId);
    if (versionBox) versionBox.textContent = runtime[key]?.version || program.version || '-';
    if (modeBox) modeBox.textContent = program.type === 'web' ? 'Web App' : 'Windows Program';
    if (action && link) {
      action.href = link.href;
      action.textContent = program.type === 'web' ? '웹으로 열기' : '프로그램 다운로드';
      action.classList.remove('disabled', 'pending');
      action.setAttribute('target', '_blank');
      action.setAttribute('rel', 'noopener');
      action.removeAttribute('aria-disabled');
      action.removeAttribute('tabindex');
    }
  }

  function startPatch() {
    applyAll();
    Object.keys(programs).forEach(refreshProgramFromRelease);

    let count = 0;
    const timer = setInterval(() => {
      applyAll();
      count += 1;
      if (count >= 24) clearInterval(timer);
    }, 500);

    document.addEventListener('click', () => setTimeout(applyAll, 80), true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startPatch);
  } else {
    startPatch();
  }
})();
