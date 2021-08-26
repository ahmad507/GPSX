<template>
  <b-button-group>
    <b-button
      v-for="btn in buttons"
      :key="btn.id"
      variant="outline-success"
      :title="btn.title"
    >
      <b-icon :icon="btn.icon" aria-hidden="true"></b-icon>
    </b-button>
  </b-button-group>
</template>

<script>
export default {
  data() {
    return {
      buttons: [
        { id: 1, title: "Play", icon: "play-btn-fill" },
        { id: 2, title: "Pause", icon: "pause-circle-fill" },
        { id: 3, title: "Stop", icon: "stop-btn-fill" },
      ],
    };
  },
};
</script>

<style>
</style>