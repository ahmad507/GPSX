<template>
  <l-map :zoom="18" :center="driveLatLng">
    <l-tile-layer :url="mapData.url" :attribution="mapData.attribution" />
    <l-moving-rotated-marker
      ref="driveMarker"
      :lat-lng="driveLatLng"
      :rotationAngle="driveRotationAngle"
      :duration="4000"
      :icon="icon"
    />
  </l-map>
</template>

<script>
import * as L from "leaflet";
import { LMap, LTileLayer, LIconDefault, LPopup } from "vue2-leaflet";
import LMovingRotatedMarker from "vue2-leaflet-moving-rotated-marker";
const iconUrl =
  "data:image/png;base64,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";
const drivePath = [
  { latLng: [-6.21353795212654, 106.563973724842], bearing: 14.9596496434823 },
  { latLng: [-6.21302599306321, 106.564110517501], bearing: 17.4503422335936 },
  { latLng: [-6.21251403350187, 106.564271450042], bearing: 23.737046703784 },
  { latLng: [-6.21202607158146, 106.564486026763], bearing: 28.4021687241152 },
  { latLng: [-6.21110347567616, 106.56498491764], bearing: 27.3535271689343 },
  { latLng: [-6.21063684418352, 106.565226316452], bearing: 29.4231543436727 },
  { latLng: [-6.21017554521573, 106.565486490726], bearing: 29.3631235948005 },
  { latLng: [-6.20970357995758, 106.565752029418], bearing: 29.1421513993274 },
  { latLng: [-6.20923694722433, 106.566012203693], bearing: 32.004058853496 },
  { latLng: [-6.20878631293521, 106.566293835639], bearing: 34.9621321392518 },
  { latLng: [-6.20834901065286, 106.566599607467], bearing: 37.8574129198199 },
  { latLng: [-6.20811436049801, 106.56678199768], bearing: 49.4988074062107 },
  { latLng: [-6.20795170521569, 106.56697243452], bearing: 51.5876170509422 },
  { latLng: [-6.20741574237263, 106.567648351192], bearing: 51.9092668822578 },
  { latLng: [-6.20708776484152, 106.568066775798], bearing: 51.6379951990556 },
  { latLng: [-6.20675445413322, 106.568487882614], bearing: 51.5043898283754 },
  { latLng: [-6.20642380970223, 106.568903625011], bearing: 51.1736035931337 },
  { latLng: [-6.20592517617598, 106.569523215293], bearing: 50.875529631562 },
  { latLng: [-6.2055891982398, 106.569936275482], bearing: 55.2122627720141 },
  { latLng: [-6.2052798850298, 106.570381522178], bearing: 57.5920846416056 },
  { latLng: [-6.20499723659293, 106.570826768875], bearing: 58.1156884223235 },
  { latLng: [-6.20471192150764, 106.571285426616], bearing: 55.0498305139026 },
  { latLng: [-6.20440260778272, 106.571727991104], bearing: 43.1929895604449 },
  { latLng: [-6.20428261534055, 106.571840643882], bearing: 41.0390137032289 },
  { latLng: [-6.20400529936971, 106.572082042694], bearing: 35.2220077657769 },
  { latLng: [-6.20357599262708, 106.572385132312], bearing: 24.4796598701982 },
  { latLng: [-6.20332267481987, 106.5725004673], bearing: 15.9209196297081 },
  { latLng: [-6.20314401903, 106.572551429271], bearing: 25.9280791692358 },
  { latLng: [-6.20266404795145, 106.572784781455], bearing: 28.0147586414209 },
  { latLng: [-6.20201875281269, 106.573128104209], bearing: 28.1270445172791 },
  { latLng: [-6.20155211327401, 106.573377549648], bearing: 29.2529956040887 },
  { latLng: [-6.20108280680717, 106.573640406131], bearing: 45.1681224878284 },
  { latLng: [-6.20108147354956, 106.573641747236], bearing: 31.9101461510785 },
  { latLng: [-6.20085748622439, 106.573781222105], bearing: 32.0523883991635 },
  { latLng: [-6.2003948454361, 106.574070900678], bearing: 30.1384798552799 },
  { latLng: [-6.20019618975692, 106.574186235666], bearing: 36.5272062277297 },
  { latLng: [-6.20004953115381, 106.574294865131], bearing: 46.8524174927794 },
  { latLng: [-6.19991753837614, 106.574435681104], bearing: 50.3107140059983 },
  { latLng: [-6.19978954534807, 106.574589908123], bearing: 52.6521573802584 },
  { latLng: [-6.19964421989311, 106.574780344963], bearing: 56.8790844940474 },
  { latLng: [-6.19950422744452, 106.574994921684], bearing: 63.3837586678483 },
  { latLng: [-6.1993389029812, 106.575324833393], bearing: 68.7767795610625 },
  { latLng: [-6.19920557676335, 106.575668156147], bearing: 70.7882977372886 },
  { latLng: [-6.19902425305301, 106.576188504695], bearing: 71.2335855002513 },
  { latLng: [-6.19888026065038, 106.57661229372], bearing: 71.7973106704992 },
  { latLng: [-6.19876560000536, 106.576960980892], bearing: 71.0101208367672 },
  { latLng: [-6.19859760878279, 106.577449142932], bearing: 71.6655992324773 },
  { latLng: [-6.1984296175067, 106.577956080436], bearing: 71.5597879963272 },
  { latLng: [-6.19806830275547, 106.579039692878], bearing: 71.3933735936221 },
  { latLng: [-6.19795497519948, 106.57937631011], bearing: 69.9267310003225 },
  { latLng: [-6.19786431313718, 106.579624414443], bearing: 69.3853673966037 },
  { latLng: [-6.19777098452736, 106.579872518777], bearing: 69.4560065639233 },
  { latLng: [-6.1976749893686, 106.580128669738], bearing: 67.8320161980329 },
  { latLng: [-6.19760832605362, 106.580292284488], bearing: 65.2537641950061 },
  { latLng: [-6.19754032946367, 106.580439805984], bearing: 72.9285287549994 },
  { latLng: [-6.19746166673104, 106.580695956945], bearing: 72.3209964720291 },
  { latLng: [-6.19740566952439, 106.580871641635], bearing: 72.0227151501172 },
  { latLng: [-6.19734300597656, 106.581064760684], bearing: 75.9582485418495 },
  { latLng: [-6.19728967529172, 106.581277996301], bearing: 76.4955279368503 },
  { latLng: [-6.19723234479948, 106.581516712903], bearing: 75.9098522421236 },
  { latLng: [-6.19716434816108, 106.581787616014], bearing: 75.763492623267 },
  { latLng: [-6.19713168310618, 106.581916362047], bearing: 78.3101311709057 },
  { latLng: [-6.19710435111992, 106.582048460841], bearing: 78.697990378563 },
  { latLng: [-6.19707835239997, 106.582178547978], bearing: 78.3675567903772 },
  { latLng: [-6.19705102041094, 106.582311317324], bearing: 79.0357382688845 },
  { latLng: [-6.1970256883223, 106.582442075014], bearing: 78.3575462018994 },
  { latLng: [-6.1969990229645, 106.582571491599], bearing: 78.9749142368072 },
  { latLng: [-6.19697302423936, 106.582704931497], bearing: 77.2056007361902 },
  { latLng: [-6.19694302570876, 106.582837030291], bearing: 68.9515342911012 },
  { latLng: [-6.19689502805624, 106.58296175301], bearing: 68.1105473796768 },
  { latLng: [-6.19684303059442, 106.583091169595], bearing: 56.9872251608672 },
  { latLng: [-6.19678769995636, 106.583176329731], bearing: 57.9034477093228 },
  { latLng: [-6.19673870233827, 106.583254449069], bearing: 57.1051695356027 },
  { latLng: [-6.19670270408536, 106.583310104906], bearing: 50.614639820303 },
  { latLng: [-6.19666003948613, 106.583362072706], bearing: 51.4150786025532 },
  { latLng: [-6.19661804151791, 106.583414711058], bearing: 51.8143508160251 },
  { latLng: [-6.19657637686357, 106.583467684686], bearing: 49.8448123340985 },
  { latLng: [-6.19653337893687, 106.583518646657], bearing: 51.3230603600291 },
  { latLng: [-6.19649204759316, 106.583570279181], bearing: 46.7811066013104 },
  { latLng: [-6.1964460498036, 106.583619229495], bearing: 46.9762334222596 },
  { latLng: [-6.19640005201005, 106.583668515086], bearing: 47.8348500248525 },
  { latLng: [-6.19635572079942, 106.5837174654], bearing: 48.793021418015 },
  { latLng: [-6.19631138958507, 106.583768092095], bearing: 47.6212266137283 },
  { latLng: [-6.19626672504955, 106.58381704241], bearing: 48.9803731640929 },
  { latLng: [-6.19618272904713, 106.583913601934], bearing: 42.8231920831367 },
  { latLng: [-6.19615306378912, 106.583941094577], bearing: 45.1678426893377 },
  { latLng: [-6.19608873350478, 106.584005802869], bearing: 44.9668021775849 },
  { latLng: [-6.19604106909216, 106.584053412079], bearing: 46.3779613391843 },
  { latLng: [-6.19599473794569, 106.584102027118], bearing: 46.9889775459837 },
  { latLng: [-6.19594907343044, 106.584150977432], bearing: 45.779459033596 },
  { latLng: [-6.19590274227589, 106.584198586642], bearing: 46.7810752628475 },
  { latLng: [-6.19585674443498, 106.584247536957], bearing: 46.5845187592468 },
  { latLng: [-6.19581074659006, 106.584296151995], bearing: 47.1699139828629 },
  { latLng: [-6.19576474874113, 106.584345772862], bearing: 46.4810520122252 },
  { latLng: [-6.19567241971343, 106.584443002939], bearing: 47.0019098632022 },
  { latLng: [-6.19558175725895, 106.584540233016], bearing: 47.3775929356804 },
  { latLng: [-6.19549042815304, 106.584639474749], bearing: 49.2516503723176 },
  { latLng: [-6.19540376548319, 106.584740057587], bearing: 50.064364207102 },
  { latLng: [-6.19531843607128, 106.58484198153], bearing: 51.1940021628988 },
  { latLng: [-6.19523377328174, 106.584947258234], bearing: 51.2027462071299 },
  { latLng: [-6.19508444675374, 106.585133001208], bearing: 49.439794375254 },
  { latLng: [-6.19499778401723, 106.585234254598], bearing: 48.2223676756983 },
  { latLng: [-6.19490912135669, 106.585333496332], bearing: 50.1782420448333 },
  { latLng: [-6.19482245859138, 106.585437431931], bearing: 52.5934435399425 },
  { latLng: [-6.19474246218002, 106.585542038083], bearing: 52.7302185277111 },
  { latLng: [-6.19465979920887, 106.585650667548], bearing: 50.4699138342856 },
  { latLng: [-6.19457513631372, 106.585753262042], bearing: 52.8361272930413 },
  { latLng: [-6.19449380659061, 106.585860550403], bearing: 55.4886591165468 },
  { latLng: [-6.1936805086705, 106.587043404579], bearing: 43.1017772730815 },
  { latLng: [-6.19283787737282, 106.587831974029], bearing: 43.2490258412515 },
  { latLng: [-6.19226190077535, 106.58837378025], bearing: 47.5332529636672 },
  { latLng: [-6.19164325854501, 106.589049696922], bearing: 53.4860780818279 },
  { latLng: [-6.19126993960714, 106.589553952217], bearing: 38.8767528791248 },
  { latLng: [-6.1905712991716, 106.59011721611], bearing: 43.3584923877677 },
  { latLng: [-6.19030997541244, 106.590363979339], bearing: -59.7349773499787 },
  { latLng: [-6.19016598063276, 106.59011721611], bearing: -69.9455592020043 },
  { latLng: [-6.19004065181109, 106.589773893356], bearing: -71.8142195903314 },
  { latLng: [-6.18993932210375, 106.589465439319], bearing: 39.850179755211 },
  { latLng: [-6.19006465094946, 106.589360833168], bearing: -86.6763411507392 },
];
export default {
  components: {
    LMap,
    LTileLayer,
    LIconDefault,
    LPopup,
    LMovingRotatedMarker,
  },
  data() {
    return {
      icon: L.icon({
        iconUrl: iconUrl,
        iconSize: [35, 35],
        iconAnchor: [20, 20],
        popupAnchor: [0, -25],
      }),
      center: L.latLng(-6.21353795212654, 106.563973724842),
      mapData: {
        attribution: `&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>`,
        url: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png",
      },
      driveLatLng: L.latLng(drivePath[0].latLng),
      driveRotationAngle: drivePath[0].bearing,
      drivePath: drivePath.slice(),
      driveMarker: null,
    };
  },
  methods: {
    simulate() {
      if (!this.drivePath.length) {
        this.$refs.driveMarker.mapObject.setLatLng(
          L.latLng(drivePath[0].latLng)
        );
        this.drivePath = drivePath.slice();
        return;
      }
      let point = this.drivePath.shift();
      this.driveLatLng = L.latLng(point.latLng);
      this.driveRotationAngle = point.bearing;
    },
  },
  mounted() {
    setInterval(() => {
      this.simulate();
    }, 4000);
  },
};
</script>

<style>
</style>