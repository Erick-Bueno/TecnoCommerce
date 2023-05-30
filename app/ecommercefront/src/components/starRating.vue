<template></template>

<script>
import iconfull from "./iconfull.vue";
import iconhalf from "./iconhalf.vue";
import emptystar from "./emptystar.vue";
export default {
  data() {
    return {
      rating: 0,
      iconfull: iconfull,
      iconhalf: iconhalf,
      emptystar: emptystar,
    };
  },
  components: {
    iconfull,
    iconhalf,
  },
};
</script>

<style>
.posi {
  margin-top: -0.2rem;
  margin-left: 0.5rem;
}
.v-rating__item .v-btn .v-icon {
  font-size: 80px;
}
</style>
