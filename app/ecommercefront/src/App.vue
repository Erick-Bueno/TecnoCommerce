<template>
  <div class="container-geral">
    <div class="container-cima">
      <div v-show="mostrar">
        <cabeça></cabeça>
      </div>
      <div>
        <RouterView></RouterView>
      </div>
    </div>
    <div v-show="mostrar">
      footer
    </div>
  </div>
</template> 
<script>
  import cabeça from './components/header.vue'
  export default{
    components:{
      cabeça
    }, 
    computed:{
      mostrar(){
        return this.$route.name !== 'login' && this.$route.name !=='cadastro'
      }
    }
  }
</script>
<style>
*{
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
}
</style>
