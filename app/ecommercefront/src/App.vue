<template>
  <div class="container-geral">
    <div class="container-cima" :class="{coloro: !mostrar, coloro1:mostrar}">
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
.coloro{
  background-color: rgb(7, 103, 128);
}
.container-cima {
  flex: 1;
  
}
.coloro1{
  background-color: rgb(196, 200, 204);
}
.conteudo {
  margin-top: 170px;
}
</style>
