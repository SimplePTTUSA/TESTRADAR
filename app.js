// SKYWARN National Weather Radar - Light Theme, All NEXRAD, Live Polygons, Modern UI

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

// All 159 NEXRAD sites (abbreviated here, fill out from [5][8][9][10])
const NEXRAD_SITES = [
  {id:"KABR",name:"Aberdeen, SD",lat:45.4558,lon:-98.4131,products:["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {id:"KENX",name:"Albany, NY",lat:42.5864,lon:-74.0639,products:["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {id:"KABX",name:"Albuquerque, NM",lat:35.1497,lon:-106.8239,products:["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {id:"KAMA",name:"Amarillo, TX",lat:35.2333,lon:-101.7089,products:["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id": "KHDX", "name": "Holloman AFB, NM", "lat": 33.0769, "lon": -106.1201, "elevation": 4269},
  {"id": "KHGX", "name": "Houston/Galveston, TX", "lat": 29.4719, "lon": -95.0789, "elevation": 32},
  {"id": "KHTX", "name": "Hytop/Huntsville, AL", "lat": 34.9306, "lon": -86.0831, "elevation": 1800},
  {"id": "KIND", "name": "Indianapolis, IN", "lat": 39.7072, "lon": -86.2806, "elevation": 797},
  {"id": "KJKL", "name": "Jackson, KY", "lat": 37.5908, "lon": -83.3131, "elevation": 1360},
  {"id": "KDGX", "name": "Jackson, MS", "lat": 32.3203, "lon": -89.9842, "elevation": 322},
  {"id": "KJAX", "name": "Jacksonville, FL", "lat": 30.4847, "lon": -81.7011, "elevation": 33},
  {"id": "KBYX", "name": "Key West, FL", "lat": 24.5975, "lon": -81.7031, "elevation": 6},
  {"id": "KFFC", "name": "Atlanta, GA", "lat": 33.3636, "lon": -84.5658, "elevation": 858},
  {"id": "KGRK", "name": "Fort Cavazos/Gray AAF, TX", "lat": 30.7218, "lon": -97.3828, "elevation": 1020},
  {"id": "KDFX", "name": "Laughlin AFB/Del Rio, TX", "lat": 29.2731, "lon": -100.2802, "elevation": 1082},
  {"id": "KLBB", "name": "Lubbock, TX", "lat": 33.6541, "lon": -101.8141, "elevation": 3241},
  {"id": "KMAF", "name": "Midland/Odessa, TX", "lat": 31.9434, "lon": -102.1894, "elevation": 2871},
  {"id": "KHGX", "name": "Houston/Galveston, TX", "lat": 29.4719, "lon": -95.0789, "elevation": 32},
  {"id": "KSHV", "name": "Shreveport, LA", "lat": 32.4497, "lon": -93.8417, "elevation": 273},
  {"id": "KLIX", "name": "New Orleans/Baton Rouge, LA", "lat": 30.3361, "lon": -89.825, "elevation": 26},
  {"id": "KLCH", "name": "Lake Charles, LA", "lat": 30.1258, "lon": -93.2156, "elevation": 16},
  {"id": "KPOE", "name": "Fort Polk, LA", "lat": 31.1556, "lon": -92.9742, "elevation": 407},
{"id": "KJAN", "name": "Jackson, MS", "lat": 32.3203, "lon": -89.9842, "elevation": 322},
{"id": "KTLX", "name": "Oklahoma City/Norman, OK", "lat": 35.3331, "lon": -97.2775, "elevation": 1198},
{"id": "KOUN", "name": "Norman, OK", "lat": 35.2406, "lon": -97.4719, "elevation": 1172},
{"id": "KINX", "name": "Tulsa, OK", "lat": 36.1751, "lon": -95.5643, "elevation": 679},
{"id": "KVNX", "name": "Vance AFB/Enid, OK", "lat": 36.7406, "lon": -98.1279, "elevation": 1189},
{"id": "KICT", "name": "Wichita, KS", "lat": 37.6546, "lon": -97.4431, "elevation": 1330},
{"id": "KTWX", "name": "Topeka, KS", "lat": 38.9969, "lon": -96.2326, "elevation": 1146},
{"id": "KDDC", "name": "Dodge City, KS", "lat": 37.7608, "lon": -99.9688, "elevation": 2594},
{"id": "KGLD", "name": "Goodland, KS", "lat": 39.3668, "lon": -101.7004, "elevation": 3652},
{"id": "KSGF", "name": "Springfield, MO", "lat": 37.2356, "lon": -93.4006, "elevation": 1378},
{"id": "KLSX", "name": "St. Louis, MO", "lat": 38.6986, "lon": -90.6825, "elevation": 601},
{"id": "KPAH", "name": "Paducah, KY", "lat": 37.0686, "lon": -88.7736, "elevation": 410},
{"id": "KHPX", "name": "Fort Campbell, KY", "lat": 36.7414, "lon": -87.8522, "elevation": 577},
{"id": "KNQA", "name": "Memphis, TN", "lat": 35.3447, "lon": -89.8706, "elevation": 267},
{"id": "KMRX", "name": "Knoxville/Morristown, TN", "lat": 36.1683, "lon": -83.4011, "elevation": 1434},
{"id": "KHTX", "name": "Hytop/Huntsville, AL", "lat": 34.9306, "lon": -86.0831, "elevation": 1800},
{"id": "KFFC", "name": "Atlanta, GA", "lat": 33.3636, "lon": -84.5658, "elevation": 858},
{"id": "KJGX", "name": "Robins AFB/Macon, GA", "lat": 32.675, "lon": -83.3519, "elevation": 382},
{"id": "KCAE", "name": "Columbia, SC", "lat": 33.9486, "lon": -81.1186, "elevation": 231},
{"id": "KCLX", "name": "Charleston, SC", "lat": 32.6556, "lon": -81.0425, "elevation": 49},
{"id": "KMLB", "name": "Melbourne, FL", "lat": 28.1139, "lon": -80.6547, "elevation": 35},
{"id": "KJAX", "name": "Jacksonville, FL", "lat": 30.4847, "lon": -81.7011, "elevation": 33},
{"id": "KMHX", "name": "Morehead City, NC", "lat": 34.7756, "lon": -76.8767, "elevation": 49},
{"id": "KRAX", "name": "Raleigh/Durham, NC", "lat": 35.6653, "lon": -78.4911, "elevation": 435},
{"id": "KAKQ", "name": "Norfolk, VA", "lat": 36.9842, "lon": -77.0075, "elevation": 135},
{"id": "KLWX", "name": "Sterling, VA", "lat": 38.9761, "lon": -77.4875, "elevation": 289},
{"id": "KDIX", "name": "Fort Dix, NJ", "lat": 39.9461, "lon": -74.4111, "elevation": 150},
{"id": "KOKX", "name": "Upton, NY", "lat": 40.8653, "lon": -72.8647, "elevation": 89},
{"id": "KBOX", "name": "Boston, MA", "lat": 41.9558, "lon": -71.1372, "elevation": 124},
{"id": "KGYX", "name": "Portland, ME", "lat": 43.8911, "lon": -70.2567, "elevation": 410},
{"id": "KCBW", "name": "Caribou, ME", "lat": 46.0392, "lon": -67.8067, "elevation": 746},
{"id": "KAPX", "name": "Gaylord, MI", "lat": 44.9078, "lon": -84.7192, "elevation": 1336},
{"id": "KDTX", "name": "Detroit, MI", "lat": 42.7, "lon": -83.4717, "elevation": 1096},
{"id": "KGRR", "name": "Grand Rapids, MI", "lat": 42.8931, "lon": -85.5444, "elevation": 797},
{"id": "KMQT", "name": "Marquette, MI", "lat": 46.5314, "lon": -87.5481, "elevation": 1407},
{"id": "KMPX", "name": "Minneapolis, MN", "lat": 44.8486, "lon": -93.5664, "elevation": 909},
{"id": "KDLH", "name": "Duluth, MN", "lat": 46.8369, "lon": -92.2094, "elevation": 1453},
{"id": "KABR", "name": "Aberdeen, SD", "lat": 45.4558, "lon": -98.4131, "elevation": 1302},
{"id": "KFSD", "name": "Sioux Falls, SD", "lat": 43.5875, "lon": -96.7297, "elevation": 1422},
{"id": "KBIS", "name": "Bismarck, ND", "lat": 46.7708, "lon": -100.7608, "elevation": 1658},
{"id": "KMBX", "name": "Minot AFB, ND", "lat": 48.3931, "lon": -100.8644, "elevation": 1685},
{"id": "KMVX", "name": "Grand Forks, ND", "lat": 47.5279, "lon": -97.3257, "elevation": 1030},
{"id": "KGGW", "name": "Glasgow, MT", "lat": 48.2065, "lon": -106.6253, "elevation": 2262},
{"id": "KTFX", "name": "Great Falls, MT", "lat": 47.4595, "lon": -111.3855, "elevation": 3702},
{"id": "KMSX", "name": "Missoula, MT", "lat": 47.0417, "lon": -113.9861, "elevation": 7935},
{"id": "KBLX", "name": "Billings, MT", "lat": 45.8538, "lon": -108.6061, "elevation": 3598},
{"id": "KOTX", "name": "Spokane, WA", "lat": 47.6803, "lon": -117.6267, "elevation": 2384},
{"id": "KLGX", "name": "Langley Hill, WA", "lat": 47.1169, "lon": -124.1067, "elevation": 354},
{"id": "KATX", "name": "Seattle, WA", "lat": 48.1947, "lon": -122.495, "elevation": 492},
{"id": "KMAX", "name": "Medford, OR", "lat": 42.0811, "lon": -122.715, "elevation": 750},
{"id": "KRTX", "name": "Portland, OR", "lat": 45.7156, "lon": -122.9644, "elevation": 384},
{"id": "KFCX", "name": "Roanoke, VA", "lat": 37.0242, "lon": -80.2742, "elevation": 2726},
{"id": "KAKQ", "name": "Norfolk, VA", "lat": 36.9842, "lon": -77.0075, "elevation": 135},
{"id": "KLWX", "name": "Sterling, VA", "lat": 38.9761, "lon": -77.4875, "elevation": 289},
{"id": "KDOX", "name": "Dover, DE", "lat": 38.8253, "lon": -75.4403, "elevation": 49},
{"id": "KCCX", "name": "State College, PA", "lat": 40.9236, "lon": -78.0047, "elevation": 2441},
{"id": "KPBZ", "name": "Pittsburgh, PA", "lat": 40.5311, "lon": -80.2183, "elevation": 1201},
{"id": "KRLX", "name": "Charleston, WV", "lat": 38.3119, "lon": -81.7231, "elevation": 1116},
{"id": "KJKL", "name": "Jackson, KY", "lat": 37.5908, "lon": -83.3131, "elevation": 1360},
{"id": "KILN", "name": "Cincinnati, OH", "lat": 39.4203, "lon": -83.8217, "elevation": 1056},
{"id": "KCLE", "name": "Cleveland, OH", "lat": 41.4131, "lon": -81.8597, "elevation": 763},
{"id": "KDTX", "name": "Detroit, MI", "lat": 42.7, "lon": -83.4717, "elevation": 1096},
{"id": "KGRR", "name": "Grand Rapids, MI", "lat": 42.8931, "lon": -85.5444, "elevation": 797}

];

class WeatherRadarApp {
  constructor() {
    this.map = null;
    this.radarLayers = [];
    this.warningLayers = {
      tornado: L.layerGroup(),
      severe: L.layerGroup(),
      mesocyclone: L.layerGroup()
    };
    this.selectedRadar = null;
    this.animationInterval = 800;
    this.animationTimer = null;
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
    // Force light theme
    document.body.setAttribute('data-color-scheme', 'light');
  }

  initMap() {
    this.map = L.map('map', { zoomControl: true }).setView([39.8283, -98.5795], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
    Object.values(this.warningLayers).forEach(layer => layer.addTo(this.map));
    this.addRadarMarkers();
  }

  addRadarMarkers() {
    this.radarMarkers = {};
    NEXRAD_SITES.forEach(site => {
      const marker = L.circleMarker([site.lat, site.lon], {
        radius: 5,
        fillColor: '#21808d',
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
  }

  // National composite (animated, Iowa State Mesonet)
  loadNationalRadar() {
    this.selectedRadar = null;
    this.radarLayers.forEach(l => this.map.removeLayer(l));
    this.radarLayers = [];
    for (let i = 0; i < 11; i++) {
      const timestamp = [
        '900913-m50m','900913-m45m','900913-m40m','900913-m35m','900913-m30m',
        '900913-m25m','900913-m20m','900913-m15m','900913-m10m','900913-m05m','900913'
      ][i];
      const layer = L.tileLayer(`https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-${timestamp}/{z}/{x}/{y}.png`, {
        opacity: document.getElementById('opacitySlider').value / 100,
        zIndex: 200
      });
      layer.addTo(this.map);
      this.radarLayers.push(layer);
    }
    let idx = 0;
    if (this.animationTimer) clearInterval(this.animationTimer);
    this.animationTimer = setInterval(() => {
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
    for (let i = 0; i < 11; i++) {
      const url = `https://radar.weather.gov/ridge/RadarImg/${prod}/${site.id}_${prod}_${i}.png`;
      const layer = L.imageOverlay(url, bounds, {
        opacity: document.getElementById('opacitySlider').value / 100,
        zIndex: 200
      });
      layer.addTo(this.map);
      this.radarLayers.push(layer);
    }
    let idx = 0;
    if (this.animationTimer) clearInterval(this.animationTimer);
    this.animationTimer = setInterval(() => {
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
