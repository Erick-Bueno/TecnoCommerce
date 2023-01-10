<template>
    <header>
        <router-link to="/"><img class="logo" src="/images/logo.png" alt=""></router-link>
        <div><input class="inputt" type="text" placeholder="Buscar"></div>
        <section v-show="!logadoounao" class="sec1">
            <div><img src="/images/user.png" alt=""></div>
            <p class="p1">Faça <router-link to="/login"><span class="log">LOGIN</span></router-link> ou  <br> crie seu <router-link to="/cadastro"><span class="log">CADASTRO</span></router-link></p>
        </section>
        <section class="config" v-show="logadoounao">
            <span class="perfil">{{ Nome[0] }}</span>
            <p class="username">{{ Nome }}</p>
        </section>
        <section class="config2">
            <router-link to="/carrinho"><img class="carrinho" src="/images/carrinho.png" alt=""></router-link>
            <img class="carrinho" src="/images/config.png" alt="">
        </section>
    </header>
</template>

<script>
import axios from 'axios'

    export default{
        name: "cabeça",
        data(){
            return{
                Nome: ''
            }
        },
        computed:{
            logadoounao(){
                this.carregardados()
                return this.$store.state.user.id != null
            }
        },
        mounted(){
            this.carregardados()
        },
        methods:{
            async carregardados(){
                if(this.$store.state.user.id != null){
                    const dado = await axios.get(`http://localhost:8055/user/${this.$store.state.user.id}`)
                    this.Nome = dado.data.usuario.Nome
                }
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
.username{
    margin-top: 50px;
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bolder;
    margin-left: 10px;
}
.config{
    display: flex;
}
.perfil{
    padding: 15px;
    height: 45px;
    background-color: rgba(13, 202, 186, 0.664);
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid white;
    border-radius: 50%;
    margin-top: 35px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bolder;
    color: white;
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
    margin-top: 50px;
}
a:visited{
    color: white;
   
}
a{
    text-decoration: none;
}
</style>