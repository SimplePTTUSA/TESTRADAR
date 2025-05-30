// SKYWARN National Weather Radar - Day Theme, Full NEXRAD, Live Polygons, Modern UI

// Radar products and tilts (Level III, common)
const RADAR_PRODUCTS = [
  { id: "N0Q", name: "Base Reflectivity", tilts: [0.5,0.9,1.3,1.8,2.4,3.1,4.0,5.1,6.4,8.0,10.0,12.5,15.6,19.5] },
  { id: "NCR", name: "Composite Reflectivity", tilts: [0.5,1.5,2.4,3.4,4.3,6.0,9.9,14.6,19.5] },
  { id: "N0U", name: "Base Velocity", tilts: [0.5,0.9,1.3,1.8,2.4,3.1,4.0,5.1,6.4,8.0,10.0,12.5,15.6,19.5] },
  { id: "N0S", name: "Storm Relative Motion", tilts: [0.5,0.9,1.3,1.8,2.4,3.1,4.0,5.1,6.4,8.0,10.0,12.5,15.6,19.5] },
  { id: "NET", name: "Echo Tops", tilts: [0.5] },
  { id: "NVL", name: "Vertically Integrated Liquid", tilts: [0.5] },
  { id: "N1P", name: "1-Hour Precipitation", tilts: [0.5] },
  { id: "NTP", name: "Storm Total Precipitation", tilts: [0.5] }
];

// All 159 NEXRAD sites (abbreviated here, fill out from [3][6])
const NEXRAD_SITES = [
  {id:"KABR",name:"Aberdeen, SD",lat:45.4558,lon:-98.4131,products:["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {id:"KENX",name:"Albany, NY",lat:42.5864,lon:-74.0639,products:["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {id:"KABX",name:"Albuquerque, NM",lat:35.1497,lon:-106.8239,products:["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {id:"KAMA",name:"Amarillo, TX",lat:35.2333,lon:-101.7089,products:["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  // ... (expand to all 159 sites from [3][6])
];

class WeatherRadarApp {
  constructor() {
    this.map = null;
    this.radarLayers = [];
    this.warningLayers = {
      tornado: L.layerGroup(),
      severe: L.layerGroup(),
      mesocyclone: L.layerGroup(),
      stormreport: L.layerGroup(),
      spcoutlook: L.layerGroup()
    };
    this.selectedRadar = null;
    this.baseLayers = {};
    this.init();
  }

  init() {
    this.initMap();
    this.populateRadarSelect();
    this.populateProductSelect();
    this.setupEventListeners();
    this.loadWarnings();
    this.loadNationalRadar();
    setInterval(() => this.loadWarnings(), 60000);
  }

  initMap() {
    this.baseLayers = {
      "Standard": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap contributors' }),
      "Satellite": L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', { attribution: '© OpenTopoMap' }),
      "Terrain": L.tileLayer('https://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.jpg', { attribution: 'Map tiles by Stamen Design' }),
      "Dark": L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { attribution: '© OpenStreetMap, CartoDB' })
    };
    this.map = L.map('map', { zoomControl: true, layers: [this.baseLayers["Standard"]] }).setView([39.8283, -98.5795], 4);
    Object.values(this.warningLayers).forEach(layer => layer.addTo(this.map));
    this.addRadarMarkers();
  }

  addRadarMarkers() {
    this.radarMarkers = {};
    NEXRAD_SITES.forEach(site => {
      const marker = L.circleMarker([site.lat, site.lon], {
        radius: 5,
        fillColor: '#32b8c6',
        color: '#fff',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.85
      });
      marker.bindPopup(`<strong>${site.id}</strong><br>${site.name}`);
      marker.on('click', () => {
        this.selectRadar(site);
        document.getElementById('radarSelect').value = site.id;
      });
      marker.addTo(this.map);
      this.radarMarkers[site.id] = marker;
    });
  }

  populateRadarSelect() {
    const select = document.getElementById('radarSelect');
    NEXRAD_SITES.forEach(site => {
      const option = document.createElement('option');
      option.value = site.id;
      option.textContent = `${site.id} - ${site.name}`;
      select.appendChild(option);
    });
  }

  populateProductSelect(siteId = null) {
    const select = document.getElementById('productSelect');
    select.innerHTML = '';
    let available = RADAR_PRODUCTS;
    if (siteId) {
      const site = NEXRAD_SITES.find(s => s.id === siteId);
      if (site) available = RADAR_PRODUCTS.filter(p => site.products.includes(p.id));
    }
    available.forEach(prod => {
      const option = document.createElement('option');
      option.value = prod.id;
      option.textContent = prod.name;
      select.appendChild(option);
    });
    this.populateTiltSelect(available[0]?.tilts || [0.5]);
  }

  populateTiltSelect(tilts) {
    const tiltSelect = document.getElementById('tiltSelect');
    tiltSelect.innerHTML = '';
    tilts.forEach((tilt, idx) => {
      const option = document.createElement('option');
      option.value = idx;
      option.textContent = `${tilt}°`;
      tiltSelect.appendChild(option);
    });
  }

  setupEventListeners() {
    document.getElementById('radarSelect').addEventListener('change', (e) => {
      const val = e.target.value;
      if (val) {
        const site = NEXRAD_SITES.find(s => s.id === val);
        if (site) {
          this.populateProductSelect(site.id);
          this.selectRadar(site);
        }
      } else {
        this.selectedRadar = null;
        this.populateProductSelect();
        this.loadNationalRadar();
      }
    });
    document.getElementById('productSelect').addEventListener('change', (e) => {
      const prod = RADAR_PRODUCTS.find(p => p.id === e.target.value);
      this.populateTiltSelect(prod ? prod.tilts : [0.5]);
      if (this.selectedRadar) this.selectRadar(this.selectedRadar, true);
    });
    document.getElementById('tiltSelect').addEventListener('change', () => {
      if (this.selectedRadar) this.selectRadar(this.selectedRadar, true);
    });
    document.getElementById('mapTypeSelect').addEventListener('change', (e) => {
      const val = e.target.value;
      Object.values(this.baseLayers).forEach(l => this.map.removeLayer(l));
      if (val === "osm") this.baseLayers["Standard"].addTo(this.map);
      else if (val === "satellite") this.baseLayers["Satellite"].addTo(this.map);
      else if (val === "terrain") this.baseLayers["Terrain"].addTo(this.map);
      else if (val === "dark") this.baseLayers["Dark"].addTo(this.map);
    });
    document.getElementById('opacitySlider').addEventListener('input', (e) => {
      document.getElementById('opacityValue').textContent = `${e.target.value}%`;
      this.radarLayers.forEach(layer => layer.setOpacity(e.target.value / 100));
    });
    document.getElementById('refreshBtn').addEventListener('click', () => {
      this.loadWarnings();
      if (!this.selectedRadar) {
        this.loadNationalRadar();
      } else {
        this.selectRadar(this.selectedRadar, true);
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
    document.getElementById('stormReports').addEventListener('change', (e) => {
      this.toggleWarningLayer('stormreport', e.target.checked);
    });
    document.getElementById('spcOutlook').addEventListener('change', (e) => {
      this.toggleWarningLayer('spcoutlook', e.target.checked);
    });
  }

  // National composite (animated, Open-Meteo)
  loadNationalRadar() {
    this.selectedRadar = null;
    this.radarLayers.forEach(l => this.map.removeLayer(l));
    this.radarLayers = [];
    for (let i = 0; i < 12; i++) {
      const layer = L.tileLayer(`https://tile.open-meteo.com/radar/usa/{z}/{x}/{y}.png?frame=${i}`, {
        opacity: document.getElementById('opacitySlider').value / 100,
        zIndex: 200
      });
      layer.addTo(this.map);
      this.radarLayers.push(layer);
    }
    let idx = 0;
    setInterval(() => {
      this.radarLayers.forEach((layer, i) => layer.setOpacity(i === idx ? document.getElementById('opacitySlider').value / 100 : 0));
      idx = (idx + 1) % this.radarLayers.length;
    }, 800);
    this.map.setView([39.8283, -98.5795], 4);
  }

  // Single-site NEXRAD Ridge2 overlays (animated)
  selectRadar(site, forceReload=false) {
    if (!forceReload && this.selectedRadar && this.selectedRadar.id === site.id) return;
    this.selectedRadar = site;
    this.radarLayers.forEach(l => this.map.removeLayer(l));
    this.radarLayers = [];
    const prod = document.getElementById('productSelect').value || "N0Q";
    const bounds = this.calculateRadarBounds(site);
    for (let i = 0; i < 12; i++) {
      const url = `https://radar.weather.gov/ridge/RadarImg/${prod}/${site.id}_${prod}_${i}.png`;
      const layer = L.imageOverlay(url, bounds, {
        opacity: document.getElementById('opacitySlider').value / 100,
        zIndex: 200
      });
      layer.addTo(this.map);
      this.radarLayers.push(layer);
    }
    let idx = 0;
    setInterval(() => {
      this.radarLayers.forEach((layer, i) => layer.setOpacity(i === idx ? document.getElementById('opacitySlider').value / 100 : 0));
      idx = (idx + 1) % this.radarLayers.length;
    }, 800);
    this.map.setView([site.lat, site.lon], 8);
  }

  calculateRadarBounds(site) {
    const kmToDegrees = 230 / 111.32;
    return [
      [site.lat - kmToDegrees, site.lon - kmToDegrees],
      [site.lat + kmToDegrees, site.lon + kmToDegrees]
    ];
  }

  async loadWarnings() {
    Object.values(this.warningLayers).forEach(layer => layer.clearLayers());
    // Tornado/Severe polygons: NWS API
    try {
      const resp = await fetch('https://api.weather.gov/alerts/active?status=actual&message_type=alert&event=Tornado%20Warning,Severe%20Thunderstorm%20Warning');
      const data = await resp.json();
      if (data.features) {
        for (const feature of data.features) {
          if (!feature.geometry || !feature.geometry.coordinates) continue;
          const coords = feature.geometry.coordinates;
          const type = feature.properties.event;
          let poly;
          if (feature.geometry.type === "Polygon") {
            poly = L.polygon(coords, {
              fillColor: type === "Tornado Warning" ? '#dc2626' : '#ea580c',
              fillOpacity: 0.3,
              color: type === "Tornado Warning" ? '#dc2626' : '#ea580c',
              weight: 2,
              className: type === "Tornado Warning" ? 'tornado-warning' : 'severe-warning'
            });
          } else if (feature.geometry.type === "MultiPolygon") {
            poly = L.polygon(coords.flat(), {
              fillColor: type === "Tornado Warning" ? '#dc2626' : '#ea580c',
              fillOpacity: 0.3,
              color: type === "Tornado Warning" ? '#dc2626' : '#ea580c',
              weight: 2,
              className: type === "Tornado Warning" ? 'tornado-warning' : 'severe-warning'
            });
          }
          if (poly) {
            poly.bindPopup(`${feature.properties.headline}<br>${feature.properties.areaDesc}<br>Until ${feature.properties.ends ? new Date(feature.properties.ends).toLocaleString() : "Unknown"}`);
            if (type === "Tornado Warning") this.warningLayers.tornado.addLayer(poly);
            else this.warningLayers.severe.addLayer(poly);
          }
        }
      }
    } catch (e) {}
    // Mesoscale Discussions (SPC MCDs): fetch live from SPC, draw polygons, link to discussion
    try {
      const mcdResp = await fetch('https://www.spc.noaa.gov/products/md/mdGeoJson.json');
      const mcdData = await mcdResp.json();
      if (mcdData.features) {
        for (const mcd of mcdData.features) {
          if (!mcd.geometry || !mcd.geometry.coordinates) continue;
          const poly = L.polygon(mcd.geometry.coordinates, {
            fillColor: '#7c3aed',
            fillOpacity: 0.3,
            color: '#7c3aed',
            weight: 2,
            className: 'mesocyclone-discussion'
          });
          const mcdNum = mcd.properties && mcd.properties.mcdnum ? mcd.properties.mcdnum : '';
          const mcdUrl = mcdNum ? `https://www.spc.noaa.gov/products/md/${mcdNum}.html` : 'https://www.spc.noaa.gov/products/md/';
          poly.bindPopup(`<a href="${mcdUrl}" target="_blank" rel="noopener" style="color:#7c3aed;">SPC Mesoscale Discussion #${mcdNum}</a>`);
          this.warningLayers.mesocyclone.addLayer(poly);
        }
      }
    } catch (e) {}
    // Storm reports and SPC outlooks (demo only)
    // Add your own live data fetch here if desired
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
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.radarApp = new WeatherRadarApp();
});
