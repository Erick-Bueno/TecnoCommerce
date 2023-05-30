<template>
  <section class="cont-mens">{{ mensagem }}</section>
</template>
<script>
export default {
  name: "mensagemErro",
  props: ["mensagem"],
};
</script>

<style scoped>
.cont-mens {
  background-color: red;
  color: white;
  font-family: "Courier New", Courier, monospace;
  font-weight: bolder;
  width: 400px;
  padding: 5px;
  text-align: center;
  margin: auto;
}
</style>
