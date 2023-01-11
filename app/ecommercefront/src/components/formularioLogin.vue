<template>
    <form action="">
        <div><input v-model="Email" type="text"></div>
        <div><input v-model="Senha" type="text"></div>
        <div><button @click="logar">logar</button></div>
    </form>
</template>

<script>
import axios from 'axios';

    export default{
        name:"formlogin",
        data(){
            return{
                Email: '',
                Senha: ''
            }
        },
        methods:{
            async logar(e){
                e.preventDefault()
                const log = await axios.post("http://localhost:8055/login",{
                    Email: this.Email,
                    Senha: this.Senha
                })
                if(log.data.msg.status == 404){
                    console.log(log.data.msg.erro)
                    return
                }
                this.$store.commit('setid', log.data.msg.id)
                this.$store.commit('setToken', log.data.msg.token)
                this.$router.push("/")
               
            }
        }
    }
</script>

<style scoped>

</style>