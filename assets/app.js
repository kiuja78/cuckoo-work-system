function toggleMenu() {
  const menu = document.getElementById('navMenu');
  if (menu) menu.classList.toggle('open');
}

(function applyConfig() {
  const config = window.SITE_CONFIG || {};
  const versionNodes = ['latestVersion', 'downloadVersion'];
  const dateNodes = ['latestDate', 'downloadDate'];
  versionNodes.forEach((id) => {
    const el = document.getElementById(id);
    if (el && config.latestVersion) el.textContent = config.latestVersion;
  });
  dateNodes.forEach((id) => {
    const el = document.getElementById(id);
    if (el && config.latestDate) el.textContent = config.latestDate;
  });
  const latestLink = document.getElementById('latestDownloadLink');
  if (latestLink && config.latestReleaseUrl) latestLink.href = config.latestReleaseUrl;
})();

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
