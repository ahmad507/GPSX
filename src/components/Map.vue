<template>
  <div class="__container">
    <div class="__controlContainer">
      <Control />
    </div>
    <div class="__mapContainer">
      <MapView />
    </div>
  </div>
</template>

<script>
import Control from "./Control.vue";
import MapView from "./MapView.vue";
export default {
  components: { Control, MapView },
};
</script>

<style>
.__container {
  margin: 155px auto;
  width: 1300px;
  height: 950px;
  overflow: hidden;
  background: linear-gradient(87deg, #45eda4, #38dddb);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
  border-radius: 20px;
}
.__mapContainer {
  position: absolute;
  padding: 15px;
  width: 1300px;
  height: 850px;
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