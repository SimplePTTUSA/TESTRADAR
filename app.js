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
  {"id":"KABR","name":"Aberdeen, SD","lat":45.4558,"lon":-98.4131,"elevation":1302,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KENX","name":"Albany, NY","lat":42.5864,"lon":-74.0639,"elevation":1826,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KABX","name":"Albuquerque, NM","lat":35.1497,"lon":-106.8239,"elevation":5870,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KFDR","name":"Frederick, OK","lat":34.3622,"lon":-98.9764,"elevation":1267,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KAMA","name":"Amarillo, TX","lat":35.2333,"lon":-101.7089,"elevation":3587,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"PAHG","name":"Anchorage, AK","lat":60.7259,"lon":-151.3511,"elevation":242,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"PGUA","name":"Andersen AFB, GU","lat":13.4544,"lon":144.8081,"elevation":264,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KFFC","name":"Atlanta, GA","lat":33.3636,"lon":-84.5658,"elevation":858,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KEWX","name":"Austin/San Antonio, TX","lat":29.7039,"lon":-98.0281,"elevation":633,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KBBX","name":"Beale AFB, CA","lat":39.4961,"lon":-121.6317,"elevation":167,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"PABC","name":"Bethel, AK","lat":60.7928,"lon":-161.8742,"elevation":193,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KBLX","name":"Billings, MT","lat":45.8538,"lon":-108.6061,"elevation":3598,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KBGM","name":"Binghamton, NY","lat":42.1997,"lon":-75.9847,"elevation":1606,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"PACG","name":"Biorka Island, AK","lat":56.8528,"lon":-135.5292,"elevation":272,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KBMX","name":"Birmingham, AL","lat":33.1719,"lon":-86.7697,"elevation":645,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KBIS","name":"Bismarck, ND","lat":46.7708,"lon":-100.7608,"elevation":1658,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KFCX","name":"Blacksburg, VA","lat":37.0242,"lon":-80.2742,"elevation":2726,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KCBX","name":"Boise, ID","lat":43.4906,"lon":-116.2367,"elevation":3171,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KBOX","name":"Boston, MA","lat":41.9558,"lon":-71.1372,"elevation":232,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KBRO","name":"Brownsville, TX","lat":25.9153,"lon":-97.4197,"elevation":88,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KBUF","name":"Buffalo, NY","lat":42.9486,"lon":-78.7369,"elevation":693,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KCXX","name":"Burlington, VT","lat":44.5111,"lon":-73.1667,"elevation":317,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KFDX","name":"Cannon AFB, NM","lat":34.6344,"lon":-103.6186,"elevation":4650,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KCBW","name":"Caribou, ME","lat":46.0392,"lon":-67.8067,"elevation":746,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KICX","name":"Cedar City, UT","lat":37.5908,"lon":-112.8619,"elevation":10600,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KARX","name":"La Crosse, WI","lat":43.8222,"lon":-91.1919,"elevation":1357,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KGRK","name":"Central Texas/Ft Hood, TX","lat":30.7218,"lon":-97.3828,"elevation":603,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KCLX","name":"Charleston, SC","lat":32.6556,"lon":-81.0425,"elevation":49,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KRLX","name":"Charleston, WV","lat":38.3119,"lon":-81.7231,"elevation":1116,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KCHA","name":"Chattanooga, TN","lat":35.0331,"lon":-85.2003,"elevation":1860,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KCYS","name":"Cheyenne, WY","lat":41.1517,"lon":-104.8061,"elevation":6191,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KLOT","name":"Chicago, IL","lat":41.6044,"lon":-88.0847,"elevation":663,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KILN","name":"Cincinnati, OH","lat":39.4203,"lon":-83.8217,"elevation":1056,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KCLE","name":"Cleveland, OH","lat":41.4131,"lon":-81.8597,"elevation":763,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KCAE","name":"Columbia, SC","lat":33.9486,"lon":-81.1186,"elevation":231,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KGWX","name":"Columbus, MS","lat":33.8967,"lon":-88.3294,"elevation":463,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KCRP","name":"Corpus Christi, TX","lat":27.7842,"lon":-97.5117,"elevation":116,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KFWS","name":"Dallas/Ft Worth, TX","lat":32.5731,"lon":-97.3031,"elevation":683,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KFTG","name":"Denver, CO","lat":39.7867,"lon":-104.5458,"elevation":5497,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KDMX","name":"Des Moines, IA","lat":41.7311,"lon":-93.7231,"elevation":981,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KDTX","name":"Detroit, MI","lat":42.7,"lon":-83.4717,"elevation":1096,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KDDC","name":"Dodge City, KS","lat":37.7608,"lon":-99.9688,"elevation":2594,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KDOX","name":"Dover, DE","lat":38.8253,"lon":-75.4403,"elevation":49,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KDLH","name":"Duluth, MN","lat":46.8369,"lon":-92.2094,"elevation":1453,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KDYX","name":"Dyess AFB, TX","lat":32.5381,"lon":-99.2542,"elevation":1792,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KEAX","name":"Kansas City, MO","lat":38.8106,"lon":-94.2644,"elevation":1092,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KEVX","name":"Eglin AFB, FL","lat":30.5647,"lon":-85.9219,"elevation":221,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KEMX","name":"Tucson, AZ","lat":32.1114,"lon":-110.9381,"elevation":5318,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KEPZ","name":"El Paso, TX","lat":31.8733,"lon":-106.6989,"elevation":4027,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KLRX","name":"Elko, NV","lat":40.7397,"lon":-115.7922,"elevation":6729,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KPOE","name":"Fort Polk, LA","lat":31.1556,"lon":-92.9742,"elevation":407,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KSRX","name":"Fort Smith, AR","lat":35.2894,"lon":-94.3611,"elevation":653,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KGRR","name":"Grand Rapids, MI","lat":42.8931,"lon":-85.5444,"elevation":797,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KJAX","name":"Jacksonville, FL","lat":30.4847,"lon":-81.7011,"elevation":33,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KDGX","name":"Jackson, MS","lat":32.3203,"lon":-89.9842,"elevation":322,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KJKL","name":"Jackson, KY","lat":37.5908,"lon":-83.3131,"elevation":1360,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KILX","name":"Lincoln, IL","lat":40.1503,"lon":-89.3383,"elevation":731,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KIND","name":"Indianapolis, IN","lat":39.7072,"lon":-86.2806,"elevation":797,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KGRK","name":"Fort Cavazos/Gray AAF, TX","lat":30.7218,"lon":-97.3828,"elevation":1020,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KINX","name":"Tulsa, OK","lat":36.1751,"lon":-95.5643,"elevation":679,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KJAN","name":"Jackson, MS","lat":32.3203,"lon":-89.9842,"elevation":322,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KJGX","name":"Robins AFB/Macon, GA","lat":32.675,"lon":-83.3519,"elevation":382,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KLBB","name":"Lubbock, TX","lat":33.6541,"lon":-101.8141,"elevation":3241,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KLCH","name":"Lake Charles, LA","lat":30.1258,"lon":-93.2156,"elevation":16,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KLSX","name":"St. Louis, MO","lat":38.6986,"lon":-90.6825,"elevation":601,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KLTX","name":"Wilmington, NC","lat":34.6883,"lon":-78.4883,"elevation":145,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KLVX","name":"Louisville, KY","lat":37.9828,"lon":-85.8581,"elevation":833,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KMAF","name":"Midland/Odessa, TX","lat":31.9434,"lon":-102.1894,"elevation":2871,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KMAX","name":"Medford, OR","lat":42.0811,"lon":-122.715,"elevation":750,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KMHX","name":"Morehead City, NC","lat":34.7756,"lon":-76.8767,"elevation":49,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KMKX","name":"Milwaukee, WI","lat":42.9683,"lon":-88.5506,"elevation":1022,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KMLB","name":"Melbourne, FL","lat":28.1139,"lon":-80.6547,"elevation":35,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KMPX","name":"Minneapolis, MN","lat":44.8486,"lon":-93.5664,"elevation":909,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KMQT","name":"Marquette, MI","lat":46.5314,"lon":-87.5481,"elevation":1407,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KMRX","name":"Knoxville/Morristown, TN","lat":36.1683,"lon":-83.4011,"elevation":1434,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KMSX","name":"Missoula, MT","lat":47.0417,"lon":-113.9861,"elevation":7935,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KMVX","name":"Grand Forks, ND","lat":47.5279,"lon":-97.3257,"elevation":1030,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KNQA","name":"Memphis, TN","lat":35.3447,"lon":-89.8706,"elevation":267,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KOAX","name":"Omaha, NE","lat":41.3206,"lon":-96.3661,"elevation":1262,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KOHX","name":"Nashville, TN","lat":36.2472,"lon":-86.5622,"elevation":676,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KOKX","name":"Upton, NY","lat":40.8653,"lon":-72.8647,"elevation":89,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KOTX","name":"Spokane, WA","lat":47.6803,"lon":-117.6267,"elevation":2384,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KPAH","name":"Paducah, KY","lat":37.0686,"lon":-88.7736,"elevation":410,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KPBZ","name":"Pittsburgh, PA","lat":40.5311,"lon":-80.2183,"elevation":1201,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KPDT","name":"Pendleton, OR","lat":45.6911,"lon":-118.8528,"elevation":1579,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KPOE","name":"Fort Polk, LA","lat":31.1556,"lon":-92.9742,"elevation":407,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KPUX","name":"Pueblo, CO","lat":38.4597,"lon":-104.1806,"elevation":4737,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KRAX","name":"Raleigh/Durham, NC","lat":35.6653,"lon":-78.4911,"elevation":435,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KRGX","name":"Reno, NV","lat":39.7547,"lon":-119.4606,"elevation":8240,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KRIW","name":"Riverton, WY","lat":43.0667,"lon":-108.4772,"elevation":5525,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KRTX","name":"Portland, OR","lat":45.7156,"lon":-122.9644,"elevation":384,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KSFX","name":"Pocatello, ID","lat":42.4944,"lon":-112.2369,"elevation":7480,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KSGF","name":"Springfield, MO","lat":37.2356,"lon":-93.4006,"elevation":1378,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KSHV","name":"Shreveport, LA","lat":32.4497,"lon":-93.8417,"elevation":273,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KSIK","name":"Sikeston, MO","lat":36.7575,"lon":-89.1617,"elevation":312,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KSRX","name":"Fort Smith, AR","lat":35.2894,"lon":-94.3611,"elevation":653,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KTBW","name":"Tampa Bay, FL","lat":27.7053,"lon":-82.4017,"elevation":42,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KTLH","name":"Tallahassee, FL","lat":30.3967,"lon":-84.3286,"elevation":125,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KTLX","name":"Oklahoma City/Norman, OK","lat":35.3331,"lon":-97.2775,"elevation":1198,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KTWX","name":"Topeka, KS","lat":38.9969,"lon":-96.2326,"elevation":1146,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KTYX","name":"Montague/Ft Drum, NY","lat":43.7553,"lon":-75.6847,"elevation":1959,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KVAX","name":"Moody AFB, GA","lat":30.8906,"lon":-83.0022,"elevation":330,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KVNX","name":"Vance AFB/Enid, OK","lat":36.7406,"lon":-98.1279,"elevation":1189,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KVTX","name":"Los Angeles, CA","lat":34.4122,"lon":-119.1781,"elevation":2806,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KVWX","name":"Evansville, IN","lat":37.9342,"lon":-87.265,"elevation":459,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]},
  {"id":"KYUX","name":"Yuma, AZ","lat":32.4958,"lon":-113.9025,"elevation":239,"products":["N0Q","NCR","N0U","N0S","NET","NVL","N1P","NTP"]}
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
        document.getElementById('radarSelect').value = site.id;
        this.populateProductSelect(site.id);
        this.selectRadar(site, true);
      });
      marker.addTo(this.map);
      this.radarMarkers[site.id] = marker;
    });
  }

  populateRadarSelect() {
    const select = document.getElementById('radarSelect');
    select.innerHTML = '<option value="">National Composite</option>';
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
      if (site && site.products) {
        available = RADAR_PRODUCTS.filter(p => site.products.includes(p.id));
      }
    }
    available.forEach(prod => {
      const option = document.createElement('option');
      option.value = prod.id;
      option.textContent = prod.name;
      select.appendChild(option);
    });
    // Show tilts for the first product by default
    this.populateTiltSelect(available[0]?.tilts || [0.5]);
  }

  populateTiltSelect(tilts) {
    const tiltSelect = document.getElementById('tiltSelect');
    tiltSelect.innerHTML = '';
    tilts.forEach((tilt, idx) => {
      const option = document.createElement('option');
      option.value = tilt;
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
          this.selectRadar(site, true);
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

  loadNationalRadar() {
    this.selectedRadar = null;
    this.radarLayers.forEach(l => this.map.removeLayer(l));
    this.radarLayers = [];
    // Use the selected product and tilt (if you want to support it in the future)
    const prod = document.getElementById('productSelect').value || "N0Q";
    // For Mesonet, only N0Q is available, but keep UI logic for future expansion
    const url = `https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913/{z}/{x}/{y}.png`;
    const layer = L.tileLayer(url, {
      opacity: document.getElementById('opacitySlider')
        ? document.getElementById('opacitySlider').value / 100
        : 0.7,
      zIndex: 200
    });
    layer.addTo(this.map);
    this.radarLayers.push(layer);
    this.map.setView([39.8283, -98.5795], 4);
  }

  selectRadar(site, forceReload = false) {
    if (!forceReload && this.selectedRadar && this.selectedRadar.id === site.id) return;
    this.selectedRadar = site;
    this.radarLayers.forEach(l => this.map.removeLayer(l));
    this.radarLayers = [];
    // Use selected product and tilt, but Mesonet only provides N0Q
    const prod = document.getElementById('productSelect').value || "N0Q";
    // For Mesonet, only N0Q is available, but keep UI logic for future expansion
    const url = `https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913/{z}/{x}/{y}.png`;
    const layer = L.tileLayer(url, {
      opacity: document.getElementById('opacitySlider')
        ? document.getElementById('opacitySlider').value / 100
        : 0.7,
      zIndex: 200
    });
    layer.addTo(this.map);
    this.radarLayers.push(layer);
    this.map.setView([site.lat, site.lon], 8);
  }

  async loadWarnings() {
    Object.values(this.warningLayers).forEach(layer => layer.clearLayers());
    // Tornado/Severe polygons: NWS API
    try {
      const resp = await fetch('https://api.weather.gov/alerts/active?event=Tornado%20Warning,Severe%20Thunderstorm%20Warning');
      const data = await resp.json();
      if (data.features) {
        data.features.forEach(feature => {
          if (!feature.geometry || !feature.geometry.coordinates) return;
          const coords = feature.geometry.coordinates;
          const type = feature.properties.event;
          let polygons = [];
          if (feature.geometry.type === "Polygon") {
            polygons = [coords];
          } else if (feature.geometry.type === "MultiPolygon") {
            polygons = coords;
          }
          polygons.forEach(polyCoords => {
            // Convert [lon, lat] to [lat, lon] for Leaflet
            const latlngs = polyCoords.map(ring => ring.map(([lon, lat]) => [lat, lon]));
            const poly = L.polygon(latlngs, {
              fillColor: type === "Tornado Warning" ? '#dc2626' : '#ffe600',
              fillOpacity: 0.3,
              color: type === "Tornado Warning" ? '#dc2626' : '#ffe600',
              weight: 2
            });
            poly.bindPopup(`${feature.properties.headline}<br>${feature.properties.areaDesc}<br>Until ${feature.properties.ends ? new Date(feature.properties.ends).toLocaleString() : "Unknown"}`);
            if (type === "Tornado Warning") this.warningLayers.tornado.addLayer(poly);
            else this.warningLayers.severe.addLayer(poly);
          });
        });
      }
    } catch (e) {
      console.error("Warning fetch error:", e);
    }
    // Mesoscale Discussions (SPC)
    try {
      const mcdResp = await fetch('https://mapservices.weather.noaa.gov/vector/rest/services/outlooks/spc_mesoscale_discussion/MapServer/0/query?where=1=1&outFields=*&f=geojson');
      const mcdData = await mcdResp.json();
      if (mcdData.features) {
        mcdData.features.forEach(mcd => {
          if (!mcd.geometry || !mcd.geometry.coordinates) return;
          let polys = [];
          if (mcd.geometry.type === "Polygon") {
            polys = [mcd.geometry.coordinates];
          } else if (mcd.geometry.type === "MultiPolygon") {
            polys = mcd.geometry.coordinates;
          }
          polys.forEach(polyCoords => {
            const latlngs = polyCoords.map(ring => ring.map(([lon, lat]) => [lat, lon]));
            const poly = L.polygon(latlngs, {
              fillColor: '#7c3aed',
              fillOpacity: 0.3,
              color: '#7c3aed',
              weight: 2
            });
            const mcdNum = mcd.properties && mcd.properties.MCD_NUM ? mcd.properties.MCD_NUM : '';
            const mcdUrl = mcdNum ? `https://www.spc.noaa.gov/products/md/${mcdNum}.html` : 'https://www.spc.noaa.gov/products/md/';
            poly.bindPopup(`<a href="${mcdUrl}" target="_blank" rel="noopener" style="color:#7c3aed;">SPC Mesoscale Discussion #${mcdNum}</a>`);
            this.warningLayers.mesocyclone.addLayer(poly);
          });
        });
      }
    } catch (e) {
      console.error("SPC MCD fetch error:", e);
    }
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

document.addEventListener('DOMContentLoaded', () => {
  window.radarApp = new WeatherRadarApp();
});
