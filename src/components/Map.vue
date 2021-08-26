<template>
  <div>
    <div class="__container">
      <div class="__controlContainer">
        <Control />
      </div>
      <div class="__mapContainer">
        <MapView />
      </div>
    </div>
    <Chart />
  </div>
</template>

<script>
import Chart from "./Chart.vue";
import Control from "./Control.vue";
import MapView from "./MapView.vue";
export default {
  components: { Control, MapView, Chart },
};
</script>

<style>
.__container {
  margin: 15px auto;
  width: 1400px;
  height: 800px;
  overflow: hidden;
  background: linear-gradient(87deg, #45eda4, #38dddb);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
  border-radius: 20px;
}
.__mapContainer {
  position: absolute;
  width: 1300px;
  margin-left: 50px;
  margin-right: 50px;
  border-radius: 20px;
  height: 650px;
  overflow: hidden;
  background-color: rgba(0, 255, 255, 0.836);
  z-index: 1;
}
.__controlContainer {
  display: flex;
  align-items: center;
  margin: 15px auto 15px;
  max-width: fit-content;
  height: 80px;
  background: transparent;
}
</style>