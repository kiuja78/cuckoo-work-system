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

document.addEventListener('DOMContentLoaded', loadReleases);
