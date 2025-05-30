// Weather Radar Application - SKYWARN-National

class WeatherRadarApp {
  constructor() {
    this.map = null;
    this.selectedRadar = null;
    this.radarLayer = null;
    this.nationalRadarLayer = null;
    this.coverageCircle = null;
    this.radarMarkers = {};
    this.warningLayers = {
      tornado: L.layerGroup(),
      severe: L.layerGroup(),
      mesocyclone: L.layerGroup(),
      lightning: L.layerGroup()
    };

    // --- FULL NEXRAD SITE LIST (159 sites, abbreviated here for brevity; use full list in production) ---
    this.nexradSites = [
      {"id":"KABR","name":"Aberdeen, SD","lat":45.4558,"lon":-98.4131,"elevation":1302},
      {"id":"KENX","name":"Albany, NY","lat":42.5864,"lon":-74.0639,"elevation":1826},
      {"id":"KABX","name":"Albuquerque, NM","lat":35.1497,"lon":-106.8239,"elevation":5870},
      {"id":"KAMA","name":"Amarillo, TX","lat":35.2333,"lon":-101.7089,"elevation":3587},
      {"id":"PAHG","name":"Anchorage, AK","lat":60.7259,"lon":-151.3511,"elevation":242},
      {"id":"PGUA","name":"Anderson AFB, GU","lat":13.4544,"lon":144.8081,"elevation":264},
      {"id":"KFFC","name":"Atlanta, GA","lat":33.3636,"lon":-84.5658,"elevation":858},
      {"id":"KEWX","name":"Austin/San Antonio, TX","lat":29.7039,"lon":-98.0281,"elevation":633},
      {"id":"KBBX","name":"Beale AFB, CA","lat":39.4961,"lon":-121.6317,"elevation":167},
      {"id":"KBLX","name":"Billings, MT","lat":45.8538,"lon":-108.6061,"elevation":3598},
      {"id":"KBGM","name":"Binghamton, NY","lat":42.1997,"lon":-75.9847,"elevation":1606},
      {"id":"KBMX","name":"Birmingham, AL","lat":33.1719,"lon":-86.7697,"elevation":645},
      {"id":"KBIS","name":"Bismarck, ND","lat":46.7708,"lon":-100.7608,"elevation":1658},
      {"id":"KCBW","name":"Caribou, ME","lat":46.0392,"lon":-67.8067,"elevation":746},
      {"id":"KBUF","name":"Buffalo, NY","lat":42.9486,"lon":-78.7369,"elevation":693},
      {"id":"KCXX","name":"Burlington, VT","lat":44.5111,"lon":-73.1667,"elevation":317},
      {"id":"KFDX","name":"Cannon AFB, NM","lat":34.6344,"lon":-103.6186,"elevation":4650},
      {"id":"KICX","name":"Cedar City, UT","lat":37.5908,"lon":-112.8619,"elevation":10600},
      {"id":"KLOT","name":"Chicago, IL","lat":41.6044,"lon":-88.0847,"elevation":663},
      {"id":"KILN","name":"Cincinnati, OH","lat":39.4203,"lon":-83.8217,"elevation":1056},
      {"id":"KCLE","name":"Cleveland, OH","lat":41.4131,"lon":-81.8597,"elevation":763},
      {"id":"KCAE","name":"Columbia, SC","lat":33.9486,"lon":-81.1186,"elevation":231},
      {"id":"KGWX","name":"Columbus, MS","lat":33.8967,"lon":-88.3294,"elevation":463},
      {"id":"KCRP","name":"Corpus Christi, TX","lat":27.7842,"lon":-97.5117,"elevation":116},
      {"id":"KFWS","name":"Dallas/Ft Worth, TX","lat":32.5731,"lon":-97.3031,"elevation":683},
      {"id":"KFTG","name":"Denver, CO","lat":39.7867,"lon":-104.5458,"elevation":5497},
      {"id":"KDMX","name":"Des Moines, IA","lat":41.7311,"lon":-93.7231,"elevation":981},
      {"id":"KDTX","name":"Detroit, MI","lat":42.7,"lon":-83.4717,"elevation":1096},
      {"id":"KOTX","name":"Spokane, WA","lat":47.6803,"lon":-117.6267,"elevation":2384},
      // ... (add all remaining NEXRAD sites here; see NWS WSR-88D list)
    ];

    this.vcpPatterns = {
      "VCP11": {"name": "VCP 11 (Precipitation)", "tilts": [0.5, 0.9, 1.3, 1.8, 2.4, 3.1, 4.0, 5.1, 6.4, 8.0, 10.0, 12.5, 15.6, 19.5]},
      "VCP21": {"name": "VCP 21 (Precipitation)", "tilts": [0.5, 1.5, 2.4, 3.4, 4.3, 6.0, 9.9, 14.6, 19.5]},
      "VCP31": {"name": "VCP 31 (Clear Air)", "tilts": [0.5, 1.5, 2.5, 3.5, 4.5]},
      "VCP32": {"name": "VCP 32 (Clear Air)", "tilts": [0.5, 1.5, 2.5, 3.5, 4.5]}
    };

    this.loadingTimeout = null;
    this.init();
  }

  init() {
    this.initMap();
    this.populateRadarSelect();
    this.setupEventListeners();
    this.loadWarningData();
    // Lightning overlay enabled by default
    document.getElementById('lightningStrikes').checked = true;
    this.toggleWarningLayer('lightning', true);

    // Auto-refresh every 5 minutes
    setInterval(() => {
      if (this.selectedRadar) {
        this.loadRadarData();
        this.loadWarningData();
      }
    }, 300000);
  }

  initMap() {
    // Center on continental US
    this.map = L.map('map').setView([39.8283, -98.5795], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Add warning layers to map
    Object.values(this.warningLayers).forEach(layer => layer.addTo(this.map));

    // Add national radar composite overlay by default
    this.nationalRadarLayer = L.tileLayer(
      'https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-composite/{z}/{x}/{y}.png',
      { opacity: 0.7 }
    ).addTo(this.map);

    this.addRadarMarkers();
  }

  addRadarMarkers() {
    this.nexradSites.forEach(site => {
      const marker = L.circleMarker([site.lat, site.lon], {
        radius: 6,
        fillColor: '#21808d',
        color: '#ffffff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      });
      marker.bindPopup(
        `<strong>${site.id}</strong><br>${site.name}<br>Elevation: ${site.elevation} ft`
      );
      marker.on('click', () => {
        this.selectRadar(site);
      });
      marker.addTo(this.map);
      this.radarMarkers[site.id] = marker;
    });
  }

  populateRadarSelect() {
    const select = document.getElementById('radarSelect');
    this.nexradSites.forEach(site => {
      const option = document.createElement('option');
      option.value = site.id;
      option.textContent = `${site.id} - ${site.name}`;
      select.appendChild(option);
    });
  }

  setupEventListeners() {
    document.getElementById('radarSelect').addEventListener('change', (e) => {
      if (e.target.value) {
        const site = this.nexradSites.find(s => s.id === e.target.value);
        if (site) this.selectRadar(site);
      }
    });
    document.getElementById('productSelect').addEventListener('change', () => {
      if (this.selectedRadar) this.loadRadarData();
    });
    document.getElementById('vcpSelect').addEventListener('change', () => {
      this.updateTiltOptions();
      if (this.selectedRadar) this.loadRadarData();
    });
    document.getElementById('tiltSelect').addEventListener('change', () => {
      if (this.selectedRadar) this.loadRadarData();
    });
    document.getElementById('opacitySlider').addEventListener('input', (e) => {
      const opacity = e.target.value / 100;
      document.getElementById('opacityValue').textContent = `${e.target.value}%`;
      if (this.radarLayer) this.radarLayer.setOpacity(opacity);
      if (this.nationalRadarLayer) this.nationalRadarLayer.setOpacity(opacity);
    });
    document.getElementById('refreshBtn').addEventListener('click', () => {
      if (this.selectedRadar) {
        this.loadRadarData();
        this.loadWarningData();
      }
    });
    document.getElementById('tornadoWarnings').addEventListener('change', (e) => {
      this.toggleWarningLayer('tornado', e.target.checked);
    });
    document.getElementById('severeWarnings').addEventListener('change', (e) => {
      this.toggleWarningLayer('severe', e.target.checked);
    });
    document.getElementById('mesocycloneDiscussions').addEventListener('change', (e) => {
      this.toggleWarningLayer('mesocyclone', e.target.checked);
    });
    document.getElementById('lightningStrikes').addEventListener('change', (e) => {
      this.toggleWarningLayer('lightning', e.target.checked);
    });
  }

  selectRadar(site) {
    // Remove national radar overlay
    if (this.nationalRadarLayer) {
      this.map.removeLayer(this.nationalRadarLayer);
      this.nationalRadarLayer = null;
    }
    // Reset previous marker
    if (this.selectedRadar) {
      this.radarMarkers[this.selectedRadar.id].setStyle({
        fillColor: '#21808d',
        radius: 6
      });
    }
    // Update selected radar
    this.selectedRadar = site;
    // Highlight marker
    this.radarMarkers[site.id].setStyle({
      fillColor: '#dc2626',
      radius: 9
    });
    // Update dropdown
    document.getElementById('radarSelect').value = site.id;
    // Show coverage circle
    this.showCoverageCircle(site);
    // Update radar info
    this.updateRadarInfo(site);
    // Load radar data
    this.loadRadarData();
    // Center map on radar
    this.map.setView([site.lat, site.lon], 7);
  }

  showCoverageCircle(site) {
    if (this.coverageCircle) this.map.removeLayer(this.coverageCircle);
    this.coverageCircle = L.circle([site.lat, site.lon], {
      radius: 230000,
      fillColor: '#21808d',
      fillOpacity: 0.1,
      color: '#21808d',
      weight: 2,
      opacity: 0.6
    }).addTo(this.map);
  }

  updateRadarInfo(site) {
    document.getElementById('siteId').textContent = site.id;
    document.getElementById('siteName').textContent = site.name;
    document.getElementById('siteElevation').textContent = site.elevation;
    document.getElementById('lastUpdate').textContent = new Date().toLocaleTimeString();
    document.getElementById('radarInfo').style.display = 'block';
  }

  updateTiltOptions() {
    const vcpSelect = document.getElementById('vcpSelect');
    const tiltSelect = document.getElementById('tiltSelect');
    const selectedVcp = vcpSelect.value;
    tiltSelect.innerHTML = '';
    if (this.vcpPatterns[selectedVcp]) {
      this.vcpPatterns[selectedVcp].tilts.forEach((tilt, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${tilt}°`;
        tiltSelect.appendChild(option);
      });
    }
  }

  async loadRadarData() {
    if (!this.selectedRadar) return;
    this.showLoading(true);
    if (this.loadingTimeout) clearTimeout(this.loadingTimeout);

    this.loadingTimeout = setTimeout(() => {
      this.showLoading(false);
      this.loadRadarDataFallback();
    }, 3000);

    try {
      if (this.radarLayer) this.map.removeLayer(this.radarLayer);
      const success = await this.attemptRealRadarData();
      if (!success) this.loadRadarDataFallback();
    } catch (error) {
      this.showLoading(false);
      this.loadRadarDataFallback();
    } finally {
      if (this.loadingTimeout) {
        clearTimeout(this.loadingTimeout);
        this.loadingTimeout = null;
      }
    }
  }

  async attemptRealRadarData() {
    return new Promise((resolve) => {
      try {
        const product = document.getElementById('productSelect').value;
        const tilt = document.getElementById('tiltSelect').value;
        const sources = [
          `https://radar.weather.gov/ridge/lite/${product}_${this.selectedRadar.id}_${tilt}.png`,
          `https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913/${tilt}/4/8/5.png`,
          `https://radar.weather.gov/ridge/RadarImg/${product}/${this.selectedRadar.id}_${product}_0.gif`
        ];
        const bounds = this.calculateRadarBounds(this.selectedRadar);
        let imageLoaded = false;
        sources.forEach((url, index) => {
          if (imageLoaded) return;
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            if (!imageLoaded) {
              imageLoaded = true;
              this.radarLayer = L.imageOverlay(url, bounds, {
                opacity: document.getElementById('opacitySlider').value / 100
              });
              this.radarLayer.addTo(this.map);
              this.showLoading(false);
              document.getElementById('lastUpdate').textContent = new Date().toLocaleTimeString();
              resolve(true);
            }
          };
          img.onerror = () => {
            if (index === sources.length - 1 && !imageLoaded) resolve(false);
          };
          img.src = url;
        });
        setTimeout(() => {
          if (!imageLoaded) resolve(false);
        }, 2000);
      } catch (error) {
        resolve(false);
      }
    });
  }

  loadRadarDataFallback() {
    this.showLoading(false);
    if (this.radarLayer) this.map.removeLayer(this.radarLayer);
    const bounds = this.calculateRadarBounds(this.selectedRadar);
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    const product = document.getElementById('productSelect').value;
    if (product === 'N0Q' || product === 'NCR') {
      this.drawReflectivityPattern(ctx);
    } else if (product === 'N0U' || product === 'N0S') {
      this.drawVelocityPattern(ctx);
    } else {
      this.drawPrecipitationPattern(ctx);
    }
    const dataUrl = canvas.toDataURL();
    this.radarLayer = L.imageOverlay(dataUrl, bounds, {
      opacity: document.getElementById('opacitySlider').value / 100
    });
    this.radarLayer.addTo(this.map);
    document.getElementById('lastUpdate').textContent = new Date().toLocaleTimeString() + ' (Demo)';
  }

  drawReflectivityPattern(ctx) {
    const storms = [
      {x: 150, y: 200, intensity: 0.8, size: 60},
      {x: 300, y: 150, intensity: 0.6, size: 40},
      {x: 400, y: 350, intensity: 0.4, size: 30}
    ];
    storms.forEach(storm => {
      const gradient = ctx.createRadialGradient(storm.x, storm.y, 0, storm.x, storm.y, storm.size);
      if (storm.intensity > 0.7) {
        gradient.addColorStop(0, 'rgba(255, 0, 255, 0.8)');
        gradient.addColorStop(0.3, 'rgba(255, 0, 0, 0.7)');
        gradient.addColorStop(0.6, 'rgba(255, 255, 0, 0.5)');
        gradient.addColorStop(1, 'rgba(0, 255, 0, 0.2)');
      } else if (storm.intensity > 0.5) {
        gradient.addColorStop(0, 'rgba(255, 0, 0, 0.6)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 0, 0.4)');
        gradient.addColorStop(1, 'rgba(0, 255, 0, 0.2)');
      } else {
        gradient.addColorStop(0, 'rgba(255, 255, 0, 0.4)');
        gradient.addColorStop(0.7, 'rgba(0, 255, 0, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 0, 255, 0.1)');
      }
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(storm.x, storm.y, storm.size, 0, 2 * Math.PI);
      ctx.fill();
    });
  }

  drawVelocityPattern(ctx) {
    const gradient = ctx.createLinearGradient(200, 200, 300, 200);
    gradient.addColorStop(0, 'rgba(255, 0, 0, 0.6)');
    gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(1, 'rgba(0, 255, 0, 0.6)');
    ctx.fillStyle = gradient;
    ctx.fillRect(150, 150, 200, 100);
  }

  drawPrecipitationPattern(ctx) {
    for (let i = 0; i < 5; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const size = 20 + Math.random() * 40;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
      gradient.addColorStop(0, 'rgba(0, 255, 0, 0.4)');
      gradient.addColorStop(0.7, 'rgba(0, 255, 255, 0.2)');
      gradient.addColorStop(1, 'rgba(0, 0, 255, 0.1)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  calculateRadarBounds(site) {
    const kmToDegrees = 230 / 111.32;
    return [
      [site.lat - kmToDegrees, site.lon - kmToDegrees],
      [site.lat + kmToDegrees, site.lon + kmToDegrees]
    ];
  }

  async loadWarningData() {
    try {
      this.addDemoWarnings();
    } catch (error) {
      console.error('Error loading warning data:', error);
    }
  }

  addDemoWarnings() {
    Object.values(this.warningLayers).forEach(layer => layer.clearLayers());

    // Tornado Warning (Red polygon)
    const tornadoCoords = [[35.0, -97.5], [35.3, -97.5], [35.3, -97.1], [35.0, -97.1]];
    const tornadoWarning = L.polygon(tornadoCoords, {
      fillColor: '#dc2626',
      fillOpacity: 0.3,
      color: '#dc2626',
      weight: 2,
      className: 'tornado-warning'
    });
    tornadoWarning.bindPopup('Tornado Warning<br>Oklahoma County, OK<br>Until 8:30 PM CDT');
    this.warningLayers.tornado.addLayer(tornadoWarning);

    // Severe Thunderstorm Warning (Yellow polygon)
    const severeCoords = [[33.5, -84.6], [33.9, -84.6], [33.9, -84.2], [33.5, -84.2]];
    const severeWarning = L.polygon(severeCoords, {
      fillColor: '#ea580c',
      fillOpacity: 0.3,
      color: '#ea580c',
      weight: 2,
      className: 'severe-warning'
    });
    severeWarning.bindPopup('Severe Thunderstorm Warning<br>Fulton County, GA<br>Until 9:15 PM EDT');
    this.warningLayers.severe.addLayer(severeWarning);

    // Mesocyclone Discussion (Light red circle)
    const mcdCircle = L.circle([32.4, -96.3], {
      radius: 40000,
      fillColor: '#fca5a5',
      fillOpacity: 0.3,
      color: '#f87171',
      weight: 2,
      className: 'mesocyclone-discussion'
    });
    mcdCircle.bindPopup('Mesocyclone Discussion #0847<br>North Texas<br>Valid until 10:00 PM CDT');
    this.warningLayers.mesocyclone.addLayer(mcdCircle);

    // Lightning overlay is now only a placeholder (no polygon/marker)
  }

  toggleWarningLayer(type, show) {
    if (show) {
      if (!this.map.hasLayer(this.warningLayers[type])) {
        this.warningLayers[type].addTo(this.map);
      }
    } else {
      if (this.map.hasLayer(this.warningLayers[type])) {
        this.map.removeLayer(this.warningLayers[type]);
      }
    }
  }

  showLoading(show) {
    const overlay = document.getElementById('loadingOverlay');
    overlay.style.display = show ? 'flex' : 'none';
  }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.radarApp = new WeatherRadarApp();
  window.radarApp.updateTiltOptions();
});
window.WeatherRadarApp = WeatherRadarApp;
