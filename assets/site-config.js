// 쿠쿠 자동화 시스템 홈페이지 설정 파일
// ZIP 프로그램은 GitHub Releases 또는 GitHub Releases 또는 별도 GitHub 저장소 파일에서 연결하고, 웹 시스템은 지정된 웹앱 주소로 연결합니다.
// 변경일: 2026-06-18
// 반영: 견적자동화시스템 별도 저장소(cuckoo-Quote_system) Releases ZIP 다운로드 연결
// 반영: 제품가격수당계산시스템 새 웹앱 주소 https://bit.ly/4uf5cRE 유지

window.SITE_CONFIG = {
  githubOwner: "kiuja78",
  githubRepo: "cuckoo-work-system",
  releasesApiUrl: "https://api.github.com/repos/kiuja78/cuckoo-work-system/releases/latest",
  latestReleaseUrl: "https://github.com/kiuja78/cuckoo-work-system/releases/latest",
  programs: {
    cuckoo: {
      title: "업무자동화시스템",
      version: "V12.70",
      updatedAt: "2026-05-16",
      fileName: "CUCKOO_Automation.zip",
      linkId: "link-cuckoo",
      forceDownload: true
    },
    sales: {
      title: "영업관리시스템",
      version: "V8.90",
      updatedAt: "2026-05-16",
      fileName: "Sales_Manager.zip",
      linkId: "link-sales",
      forceDownload: true
    },
    quote: {
      title: "견적자동화시스템",
      version: "V9.34",
      updatedAt: "2026-06-18",
      fileName: "Quote_Automation.zip",
      linkId: "link-quote",
      forceDownload: true,
      sourceType: "github-release",
      sourceRepo: "kiuja78/cuckoo-Quote_system",
      releaseApiUrl: "https://api.github.com/repos/kiuja78/cuckoo-Quote_system/releases/latest",
      latestReleaseUrl: "https://github.com/kiuja78/cuckoo-Quote_system/releases/latest",
      downloadUrl: "https://github.com/kiuja78/cuckoo-Quote_system/releases/latest/download/Quote_Automation.zip"
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
      version: "V79",
      updatedAt: "2026-06-10",
      type: "web",
      webUrl: "https://bit.ly/4uf5cRE",
      linkId: "link-calculator"
    }
  }
};

// 견적자동화시스템은 이제 통합 홈페이지 저장소의 Releases가 아니라
// 별도 저장소 https://github.com/kiuja78/cuckoo-Quote_system 의 Releases에 올라간 Quote_Automation.zip 파일을 다운로드합니다.
// 기존 app.js가 공통 Releases 링크로 다시 덮어쓰는 경우를 막기 위해 화면 링크를 반복 보정합니다.
(function () {
  const quoteProgram = window.SITE_CONFIG && window.SITE_CONFIG.programs && window.SITE_CONFIG.programs.quote;
  if (!quoteProgram) return;

  function normalizeReleaseText(text) {
    return String(text || '')
      .replace(/\r?\n/g, ' ')
      .replace(/[_-]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function extractQuoteVersionFromRelease(release) {
    const source = normalizeReleaseText([
      release && release.name,
      release && release.tag_name,
      release && release.body
    ].filter(Boolean).join(' / '));

    const aliases = [
      '견적자동화시스템',
      '견적 자동화 시스템',
      '견적서 자동생성 시스템',
      '견적서 자동생성시스템',
      '견적서 자동 생성 시스템',
      '견적서 자동화 시스템',
      '견적서자동생성시스템',
      '견적서 자동생성',
      'Estimate System',
      'Estimate_System',
      'Estimate-System',
      'Quote_Automation',
      'Quote Automation'
    ];

    for (const alias of aliases) {
      const flexibleAlias = alias
        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        .replace(/\\ /g, '\\s*')
        .replace(/_/g, '[\\s_]*')
        .replace(/-/g, '[\\s-]*');
      const match = source.match(new RegExp(`${flexibleAlias}[^Vv0-9]{0,30}[Vv]?\\s*(\\d+(?:\\.\\d+)+|\\d+)`, 'i'));
      if (match && match[1]) return `V${match[1]}`;
    }
    return quoteProgram.version;
  }

  function getQuoteDownloadUrl() {
    return quoteProgram.downloadUrl || 'https://github.com/kiuja78/cuckoo-Quote_system/releases/latest/download/Quote_Automation.zip';
  }

  function applyQuoteDisplay(version) {
    const row = document.querySelector('.download-row[data-program="quote"]');
    const link = document.getElementById(quoteProgram.linkId);
    const versionEl = document.getElementById('version-quote');
    const dateEl = document.getElementById('date-quote');
    const fileEl = row && row.querySelector('.row-file code, .row-file');
    const downloadUrl = getQuoteDownloadUrl();

    if (versionEl) versionEl.textContent = version || quoteProgram.version;
    if (dateEl) dateEl.textContent = '2026.06.18';
    if (fileEl) fileEl.textContent = quoteProgram.fileName;
    if (link) {
      link.href = downloadUrl;
      link.textContent = '다운로드';
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener');
      link.removeAttribute('aria-disabled');
      link.removeAttribute('tabindex');
      link.classList.remove('disabled', 'pending');
    }
    if (row) {
      row.classList.add('ready');
      row.classList.remove('pending', 'disabled');
    }

    const manualTitle = document.getElementById('manualTitle');
    if (manualTitle && manualTitle.textContent && manualTitle.textContent.includes('견적')) {
      const manualVersion = document.getElementById('manualVersion');
      const manualMode = document.getElementById('manualMode');
      const manualAction = document.getElementById('manualAction');
      const manualNote = document.getElementById('manualNote');
      if (manualVersion) manualVersion.textContent = version || quoteProgram.version;
      if (manualMode) manualMode.textContent = 'Windows Program';
      if (manualAction) {
        manualAction.href = downloadUrl;
        manualAction.textContent = '프로그램 다운로드';
        manualAction.classList.remove('disabled', 'pending');
        manualAction.setAttribute('target', '_blank');
        manualAction.setAttribute('rel', 'noopener');
        manualAction.removeAttribute('aria-disabled');
        manualAction.removeAttribute('tabindex');
      }
      if (manualNote && manualNote.textContent.includes('개발중')) {
        manualNote.textContent = '정식 ZIP 파일이 별도 GitHub 저장소에 업로드되어 다운로드 버튼이 활성화되었습니다.';
      }
    }
  }

  function startQuotePatch() {
    applyQuoteDisplay(quoteProgram.version);

    // 기존 app.js가 비동기로 공통 Releases 링크를 다시 넣을 수 있어 잠깐 반복 보정합니다.
    let count = 0;
    const timer = setInterval(() => {
      applyQuoteDisplay(quoteProgram.version);
      count += 1;
      if (count >= 10) clearInterval(timer);
    }, 500);

    // 견적자동화시스템 별도 저장소의 최신 Release 제목/본문에서 버전을 자동 보정합니다.
    // 다운로드 경로는 항상 별도 저장소 Releases의 Quote_Automation.zip으로 유지합니다.
    fetch(quoteProgram.releaseApiUrl || window.SITE_CONFIG.releasesApiUrl, {
      headers: { 'Accept': 'application/vnd.github+json' },
      cache: 'no-store'
    })
      .then(response => response.ok ? response.json() : null)
      .then(release => {
        if (!release) return;
        const version = extractQuoteVersionFromRelease(release);
        applyQuoteDisplay(version);
      })
      .catch(() => applyQuoteDisplay(quoteProgram.version));

    document.addEventListener('click', () => setTimeout(() => applyQuoteDisplay(quoteProgram.version), 50), true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startQuotePatch);
  } else {
    startQuotePatch();
  }
})();
