<template>
    <header>
        <router-link to="/"><img class="logo" src="/images/logo.png" alt=""></router-link>
        <div><input class="inputt" type="text" placeholder="Buscar"></div>
        <section class="sec1">
            <div><img src="/images/user.png" alt=""></div>
            <p class="p1">Faça <router-link to="/login"><span class="log">LOGIN</span></router-link> ou  <br> crie seu <router-link to="/cadastro"><span class="log">CADASTRO</span></router-link></p>
        </section>
        <section class="config2">
            <router-link to="/carrinho"><img class="carrinho" src="/images/carrinho.png" alt=""></router-link>
            <img class="carrinho" src="/images/config.png" alt="">
        </section>
    </header>
</template>

<script>
    export default{
        name: "cabeça",
        data(){
            return{

            }
        }
    }
</script>

<style scoped>
header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: rgba(9, 150, 185, 0.884);
}
.logo{
    width: 180px;
    margin-left: 20px;
    margin-top: 20px;
    margin-right: 20px;
}
.inputt{
    width: 300px;
    margin-top: 60px;
    padding: 5px;
    border-radius: 5px;
    border: none;
}
.sec1{
    display: flex;
    flex-direction: row;
    margin-top: 30px;
   
}
.p1{
    font-family: 'Courier New', Courier, monospace;
    color: white;
    margin-top: 12px;
}
.log{
    font-weight: bolder;
    cursor:  pointer;
}
.log:hover{
    text-decoration: underline;
}
.carrinho{
    width: 30px;
    margin-right: 40px;
    cursor: pointer;
}
.config2{
    margin-top: 40px;
}
a:visited{
    color: white;
   
}
a{
    text-decoration: none;
}
</style>