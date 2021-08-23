<template>
  <div id="app">
    <Map />
  </div>
</template>

<script>
import Map from "./components/Map.vue";
export default {
  name: "App",
  components: { Map },
};
</script>

<style>
body {
  background: linear-gradient(87deg, #2dce89, #2dcecc);
}
</style>
