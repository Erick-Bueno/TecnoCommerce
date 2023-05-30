<template>
  <div class="container-geral">
    <div class="container-cima">
      <div v-if="mostrar">
        <cabeça></cabeça>
      </div>
      <div class="conteudo">
        <RouterView></RouterView>
      </div>
    </div>
    <div v-show="mostrar">
      <rodape></rodape>
    </div>
  </div>
</template>
<script>
import cabeça from "./components/header.vue";
import rodape from "./components/footer.vue";
export default {
  components: {
    cabeça,
    rodape,
  },
  computed: {
    mostrar() {
      return this.$route.name !== "login" && this.$route.name !== "cadastro";
    },
  },
};
</script>
<style>
* {
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
}
.container-geral {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container-cima {
  flex: 1;
  background-color: rgb(196, 200, 204);
}
.conteudo {
  margin-top: 170px;
}
</style>
