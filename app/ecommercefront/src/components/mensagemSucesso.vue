<template>
  <section class="cont-mens">{{ mensagem }}</section>
</template>

<script>
export default {
  name: "mensagem",
  props: ["mensagem"],
};
</script>

<style scoped>
.cont-mens {
  background-color: green;
  color: white;
  font-family: "Courier New", Courier, monospace;
  font-weight: bolder;
  max-width: 400px;
  padding: 5px;
  text-align: center;
  margin: auto;
}
</style>
