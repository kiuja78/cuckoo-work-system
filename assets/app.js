function toggleMenu() {
  const menu = document.getElementById('navMenu');
  if (menu) menu.classList.toggle('open');
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el && value) el.textContent = value;
}

function formatDate(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

function extractVersion(release) {
  const source = [release.name, release.tag_name, release.body].filter(Boolean).join(' ');
  const match = source.match(/v?\d+(?:\.\d+)+/i);
  return match ? `v${match[0].replace(/^v/i, '')}` : (release.name || release.tag_name || '최신 버전');
}

function summarizeReleaseBody(body) {
  if (!body) return 'GitHub Releases의 최신 릴리즈 정보를 기준으로 다운로드 링크를 자동 연결했습니다.';
  const text = body
    .replace(/[#>*_`\-]+/g, ' ')
    .replace(/\r?\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > 170 ? `${text.slice(0, 170)}...` : text;
}

function applyReleaseInfo(version, dateText, release) {
  ['latestVersion', 'downloadVersion'].forEach((id) => setText(id, version));
  ['latestDate', 'downloadDate'].forEach((id) => setText(id, dateText));
  setText('releaseNoteVersion', `${version} · ${dateText}`);
  setText('releaseNoteTitle', release?.name || release?.tag_name || '최신 릴리즈');
  setText('releaseNoteBody', summarizeReleaseBody(release?.body));
}

function connectDownloadLinks(release) {
  const config = window.SITE_CONFIG || {};
  const programs = config.programs || {};
  const assets = Array.isArray(release?.assets) ? release.assets : [];

  Object.values(programs).forEach((program) => {
    const link = document.getElementById(program.linkId);
    const status = document.getElementById(program.statusId);
    const matchedAsset = assets.find((asset) => asset.name === program.fileName);

    if (link) {
      link.href = matchedAsset?.browser_download_url || program.fallbackDownloadUrl || config.latestReleaseUrl || '#download';
    }

    if (status) {
      if (matchedAsset) {
        status.innerHTML = `최신 릴리즈에서 <code>${program.fileName}</code> 파일을 확인했습니다. 버튼을 누르면 바로 다운로드됩니다.`;
      } else {
        status.innerHTML = `최신 릴리즈 Assets에 <code>${program.fileName}</code> 파일이 아직 확인되지 않았습니다. 같은 파일명으로 업로드하면 자동 연결됩니다.`;
      }
    }
  });
}

async function loadLatestRelease() {
  const config = window.SITE_CONFIG || {};
  const fallbackRelease = {
    name: config.fallbackVersion || '최신 버전',
    tag_name: config.fallbackVersion || '최신 버전',
    published_at: config.fallbackDate || '',
    body: 'GitHub Releases 정보를 불러오지 못해 예비값을 표시합니다.',
    assets: []
  };

  try {
    const response = await fetch(config.releasesApiUrl, {
      headers: { 'Accept': 'application/vnd.github+json' },
      cache: 'no-store'
    });
    if (!response.ok) throw new Error(`GitHub Releases API error: ${response.status}`);

    const release = await response.json();
    const version = extractVersion(release);
    const dateText = formatDate(release.published_at || release.created_at) || config.fallbackDate || '';
    applyReleaseInfo(version, dateText, release);
    connectDownloadLinks(release);
  } catch (error) {
    console.warn('최신 릴리즈 정보를 불러오지 못했습니다.', error);
    const version = config.fallbackVersion || '최신 버전';
    const dateText = config.fallbackDate || '';
    applyReleaseInfo(version, dateText, fallbackRelease);
    connectDownloadLinks(fallbackRelease);
  }
}

document.addEventListener('DOMContentLoaded', loadLatestRelease);

// 카카오맵 실제 연결 예시
// 1) index.html 하단의 카카오맵 script 주석을 해제합니다.
// 2) KAKAO_JAVASCRIPT_KEY를 실제 JavaScript 키로 교체합니다.
// 3) 아래 initKakaoMap() 함수 주석을 해제합니다.
/*
function initKakaoMap() {
  const mapContainer = document.getElementById('mapBox');
  const mapOption = {
    center: new kakao.maps.LatLng(35.1796, 129.0756), // 부산 중심 예시
    level: 7
  };
  const map = new kakao.maps.Map(mapContainer, mapOption);
  const marker = new kakao.maps.Marker({
    position: new kakao.maps.LatLng(35.1796, 129.0756)
  });
  marker.setMap(map);
}
window.addEventListener('load', initKakaoMap);
*/
