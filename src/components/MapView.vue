<template>
  <div>
    <!-- <h1>lat: {{ newLat }}</h1>
    <h1>lng: {{ newLng }}</h1> -->
    <l-map style="height: 650px" :zoom="zoom" :center="center">
      <l-tile-layer
        :url="mapInnitial.url"
        :attribution="mapInnitial.attribution"
      ></l-tile-layer>
      <l-marker :lat-lng="{ lat: newLat, lng: newLng }"></l-marker>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    return {
      mapInnitial: {
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        attribution:
          '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      },
      zoom: 15,
      center: [-6.20180276542041, 106.573283672332],
      lat: -6.20180276542041,
      lng: 106.573283672332,
      ivl: 0,
      speed: 1,
    };
  },

  methods: {
    updateCoord() {
      clearInterval(this.ivl);
      this.ivl = setInterval(() => {
        console.log("tick...");
        (this.lat = this.lat + 0.00000015013),
          (this.lng = this.lng + 0.0000001251);
      }, this.speed);
    },
  },
  computed: {
    newLat() {
      let self = this;
      if (this.ivl === 0) {
        this.updateCoord();
      }
      return this.lat;
    },
    newLng() {
      let self = this;
      if (this.ivl === 0) {
        this.updateCoord();
      }
      return this.lng;
    },
  },
};
</script>

<style>
</style>