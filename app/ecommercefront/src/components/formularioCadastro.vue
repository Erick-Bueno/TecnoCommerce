<template>
    <form action="">
        <div><input v-model="Nome" type="text"></div>
        <div><input v-model="Email" type="text"></div>
        <div><input v-model="Senha" type="text"></div>
        <div><button @click="cadastro">Cadastrar</button></div>

    </form>

</template>

<script>
    import axios from 'axios'
    export default{
        name: "formularioCadastro",
        data(){
            return{
                Nome:'',
                Email:'',
                Senha:'',
                
            }
        },
        methods:{
           async cadastro(e){
                e.preventDefault()
                const dado = await axios.post("http://localhost:8055/cadastro",{Nome: this.Nome, Email: this.Email, Senha:this.Senha})
                if (dado.data.msg.status == 200){
                    this.$store.commit('setid', dado.data.msg.id)
                    this.$store.commit('setToken', dado.data.msg.token)
                    this.$router.push("/")
                }
                if(dado.data.msg.status == 404){
                    console.log(dado.data.msg.erro)
                }
             
            }
        }
    }
    
</script>

<style scoped>

</style>