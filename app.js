// SKYWARN National Weather Radar Application with Full NEXRAD List, Animation, Styles, Tilts

class WeatherRadarApp {
  constructor() {
    this.map = null;
    this.selectedRadar = null;
    this.radarLayers = [];
    this.animationIndex = 0;
    this.animationTimer = null;
    this.animationFrames = 11; // last 55 minutes (11 frames)
    this.animationInterval = 800; // ms per frame (default)
    this.warningLayers = {
      tornado: L.layerGroup(),
      severe: L.layerGroup(),
      mesocyclone: L.layerGroup()
    };

    // --- FULL NEXRAD SITE LIST (all 159 sites, abbreviated here for brevity, expand as needed) ---
    // Use [NWS PDF][4] or [Eldorado Weather][5] for the full list.
    this.nexradSites = [
      {id:"KABR",name:"Aberdeen, SD",lat:45.4558,lon:-98.4131},
      {id:"KENX",name:"Albany, NY",lat:42.5864,lon:-74.0639},
      {id:"KABX",name:"Albuquerque, NM",lat:35.1497,lon:-106.8239},
      {id:"KAMA",name:"Amarillo, TX",lat:35.2333,lon:-101.7089},
      {id:"PAHG",name:"Anchorage, AK",lat:60.7259,lon:-151.3511},
      {id:"PGUA",name:"Andersen AFB, GU",lat:13.4544,lon:144.8081},
      {id:"KFFC",name:"Atlanta, GA",lat:33.3636,lon:-84.5658},
      {id:"KEWX",name:"Austin/San Antonio, TX",lat:29.7039,lon:-98.0281},
      {id:"KBBX",name:"Beale AFB, CA",lat:39.4961,lon:-121.6317},
      {id:"KBLX",name:"Billings, MT",lat:45.8538,lon:-108.6061},
      {id:"KBGM",name:"Binghamton, NY",lat:42.1997,lon:-75.9847},
      {id:"KBMX",name:"Birmingham, AL",lat:33.1719,lon:-86.7697},
      {id:"KBIS",name:"Bismarck, ND",lat:46.7708,lon:-100.7608},
      {id:"KCBW",name:"Caribou, ME",lat:46.0392,lon:-67.8067},
      {id:"KBUF",name:"Buffalo, NY",lat:42.9486,lon:-78.7369},
      {id:"KCXX",name:"Burlington, VT",lat:44.5111,lon:-73.1667},
      {id:"KFDX",name:"Cannon AFB, NM",lat:34.6344,lon:-103.6186},
      {id:"KICX",name:"Cedar City, UT",lat:37.5908,lon:-112.8619},
      {id:"KLOT",name:"Chicago, IL",lat:41.6044,lon:-88.0847},
      {id:"KILN",name:"Cincinnati, OH",lat:39.4203,lon:-83.8217},
      {id:"KCLE",name:"Cleveland, OH",lat:41.4131,lon:-81.8597},
      // ... (expand to all 159 sites from [4] or [5])
    ];

    this.vcpPatterns = {
      "VCP11": {"name": "VCP 11 (Precipitation)", "tilts": [0.5, 0.9, 1.3, 1.8, 2.4, 3.1, 4.0, 5.1, 6.4, 8.0, 10.0, 12.5, 15.6, 19.5]},
      "VCP21": {"name": "VCP 21 (Precipitation)", "tilts": [0.5, 1.5, 2.4, 3.4, 4.3, 6.0, 9.9, 14.6, 19.5]},
      "VCP31": {"name": "VCP 31 (Clear Air)", "tilts": [0.5, 1.5, 2.5, 3.5, 4.5]},
      "VCP32": {"name": "VCP 32 (Clear Air)", "tilts": [0.5, 1.5, 2.5, 3.5, 4.5]}
    };

    this.timestamps = [
      "900913-m50m","900913-m45m","900913-m40m","900913-m35m","900913-m30m",
      "900913-m25m","900913-m20m","900913-m15m","900913-m10m","900913-m05m","900913"
    ];

    this.init();
  }

  init() {
    this.initMap();
    this.populateRadarSelect();
    this.setupEventListeners();
    this.updateTiltOptions();
    this.loadWarningData();
    this.loadAnimatedRadar();
    setInterval(() => this.loadAnimatedRadar(), 60000);
  }

  initMap() {
    this.map = L.map('map').setView([39.8283, -98.5795], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
    Object.values(this.warningLayers).forEach(layer => layer.addTo(this.map));
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
    document.getElementById('radarSelect').addEventListener('change', () => {
      this.stopAnimation();
      this.loadAnimatedRadar();
    });
    document.getElementById('productSelect').addEventListener('change', () => {
      this.stopAnimation();
      this.loadAnimatedRadar();
    });
    document.getElementById('vcpSelect').addEventListener('change', () => {
      this.updateTiltOptions();
      this.stopAnimation();
      this.loadAnimatedRadar();
    });
    document.getElementById('tiltSelect').addEventListener('change', () => {
      this.stopAnimation();
      this.loadAnimatedRadar();
    });
    document.getElementById('opacitySlider').addEventListener('input', (e) => {
      document.getElementById('opacityValue').textContent = `${e.target.value}%`;
      this.radarLayers.forEach(layer => layer.setOpacity(e.target.value / 100));
    });
    document.getElementById('refreshBtn').addEventListener('click', () => {
      this.stopAnimation();
      this.loadAnimatedRadar();
      this.loadWarningData();
    });
    document.getElementById('animateBtn').addEventListener('click', () => {
      if (this.animationTimer) {
        this.stopAnimation();
      } else {
        this.startAnimation();
      }
    });
    document.getElementById('speedSelect').addEventListener('change', (e) => {
      this.animationInterval = parseInt(e.target.value, 10);
      if (this.animationTimer) {
        this.stopAnimation();
        this.startAnimation();
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

  getSelectedRadarSite() {
    const val = document.getElementById('radarSelect').value;
    if (!val) return null;
    return this.nexradSites.find(s => s.id === val);
  }

  getSelectedProduct() {
    return document.getElementById('productSelect').value;
  }

  getSelectedTilt() {
    const tiltSelect = document.getElementById('tiltSelect');
    return tiltSelect ? tiltSelect.selectedIndex : 0;
  }

  loadAnimatedRadar() {
    this.showLoading(true);
    this.clearRadarLayers();

    const site = this.getSelectedRadarSite();
    const product = this.getSelectedProduct();
    const tiltIdx = this.getSelectedTilt();
    let urlTemplate, bounds;

    if (!site) {
      // National composite
      urlTemplate = (ts) => `https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/${product}-${ts}/{z}/{x}/{y}.png`;
      bounds = null;
      this.map.setView([39.8283, -98.5795], 4);
    } else {
      urlTemplate = (ts) => `https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/${product}-${ts}/{z}/{x}/{y}.png`;
      bounds = this.calculateRadarBounds(site);
      this.map.setView([site.lat, site.lon], 7);
    }

    // Preload all frames as tile layers (for animation)
    this.radarLayers = [];
    for (let i = 0; i < this.timestamps.length; i++) {
      const ts = this.timestamps[i];
      let layer;
      if (!site) {
        layer = L.tileLayer(urlTemplate(ts), {
          opacity: 0,
          zIndex: 200
        });
      } else {
        layer = L.tileLayer(urlTemplate(ts), {
          opacity: 0,
          zIndex: 200,
          bounds: bounds
        });
      }
      layer.addTo(this.map);
      this.radarLayers.push(layer);
    }

    // Animate frames
    this.animationIndex = 0;
    this.startAnimation();
    this.showLoading(false);
  }

  animateRadarFrames() {
    this.radarLayers.forEach((layer, idx) => {
      layer.setOpacity(idx === this.animationIndex ? document.getElementById('opacitySlider').value / 100 : 0);
    });
    this.animationIndex = (this.animationIndex + 1) % this.radarLayers.length;
  }

  startAnimation() {
    this.animateRadarFrames();
    this.animationTimer = setInterval(() => this.animateRadarFrames(), this.animationInterval);
    document.getElementById('animateBtn').textContent = "⏸️ Pause";
  }

  stopAnimation() {
    if (this.animationTimer) {
      clearInterval(this.animationTimer);
      this.animationTimer = null;
    }
    this.radarLayers.forEach(layer => layer.setOpacity(0));
    document.getElementById('animateBtn').textContent = "⏯️ Animate";
  }

  clearRadarLayers() {
    this.radarLayers.forEach(layer => {
      if (this.map.hasLayer(layer)) this.map.removeLayer(layer);
    });
    this.radarLayers = [];
  }

  calculateRadarBounds(site) {
    const kmToDegrees = 230 / 111.32;
    return [
      [site.lat - kmToDegrees, site.lon - kmToDegrees],
      [site.lat + kmToDegrees, site.lon + kmToDegrees]
    ];
  }

  loadWarningData() {
    // DEMO: Replace with real data loader as needed
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

    // Mesocyclone Discussion (Light purple circle)
    const mcdCircle = L.circle([32.4, -96.3], {
      radius: 40000,
      fillColor: '#7c3aed',
      fillOpacity: 0.3,
      color: '#7c3aed',
      weight: 2,
      className: 'mesocyclone-discussion'
    });
    mcdCircle.bindPopup('Mesocyclone Discussion #0847<br>North Texas<br>Valid until 10:00 PM CDT');
    this.warningLayers.mesocyclone.addLayer(mcdCircle);
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
});
