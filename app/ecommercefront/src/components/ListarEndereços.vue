<template>
    <section v-show="logado">
        <h1 class="titulo">Endereços</h1>
        <section class="endere" v-for="ende in listaEnde">
             <p class="nome">{{ ende.Nome }}</p>
             <section class="container2">
                <p class="mento"> {{ ende.Rua }}, {{ ende.Numero }}</p>
                 <p class="bairro">{{ ende.Bairro }} - {{ ende.Cidade }}</p>
                 <p>CEP {{ ende.Cep }}</p>
            
             </section>
             <p class="botoes"><section class="container-botoes"><section class="container-botoes2"><button class="edit" @click="editarEnde(ende.id)">Editar</button> <button class="edit" @click="removerEnde(ende.id)">Remover</button></section></section></p>
        </section>
        <section class="container"><img class="mais" src="/images/mais.png" alt=""><router-link to="/endereco/CadastrarNovoEndereco"><button class="add">Adicionar novo endereço</button></router-link></section>
     
    </section>
    <logout v-show="!logado"></logout>
</template>

<script>
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import logout from './logout.vue';
import {authenticaded} from '../authcomponents'

    export default{
        name: 'listagem',
        data(){
            return{
                listaEnde: [],
               
            }
        },
        components:{logout},
        computed:{
            logado(){
                return this.$store.state.user.jwt != null
              
               
                
             
            }
        },
        mounted(){
            this.listarEnde()
            authenticaded()
            
            
            
        },
        methods:{
            async listarEnde(){
                const req = await axios.get(`http://localhost:8055/addressUser/${this.$store.state.user.id}`)
                console.log(req.data)
                
                this.listaEnde = req.data
                
               
        
                
            },
         
            async removerEnde(id){
                const req = await axios.delete(`http://localhost:8055/address/${id}`)
                const index = this.listaEnde.findIndex(ender=> ender.id == id)
                
                    
                    this.listaEnde.splice(index, 1)
                
               
                
                
            },
            async editarEnde(id){
                this.$router.push({name:'enderecoEditar', params:{id:id}})
            }
        }
    }
</script>

<style scoped>
    .titulo{
        text-align: center;
        margin-top: 230px;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bolder;
    }
    .container-ende:hover{
        transform: scale(10);
    }
    
    .edit{
        padding: 4px;
        border-radius: 5px;
        background-color:rgb(18, 101, 122);
        color: white;
        border: none;
        width: 80px;
        cursor: pointer;
        transition: 0.2s;
        font-size: 12px;
    }
    .edit:hover{
        background-color:rgb(18, 124, 151);
    }
    .container:hover .edit{
        background-color:rgb(12, 57, 68) ;
        
    }

    
    .endere{
        background-color:   rgb(18, 101, 122);;
        color: white;
        width: 400px;
        margin-top: 20px;
        margin-left: 20px;
        margin-bottom: 20px;
        transition: 0.5s;
    }
    .endere:hover{
        transform: scale(105%);
    }
    .container-botoes2{
        position: absolute;
        right: 5px;
        top: -14px;
    }
    .container-botoes{
        position: relative;
    }
    .nome{
        color:white ;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bolder;
        font-size: 20px;
        background-color:  rgba(13, 202, 186, 0.664);
        padding: 5px;
    }
    .botoes{
        background-color:  rgba(13, 202, 186, 0.664);
        padding: 15px;

    }
    .container2{
        padding: 5px;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bolder;
        padding-bottom: 60px;
    }
    .container{
        position: relative;
        margin-left: 20px;
        margin-top: 30px;
        margin-bottom: 20px;
    }
    .mais{
       
        width: 20px;
        position: absolute;
        top: 19px;
        left: 5px;
    }
    .add{
        padding: 20px;
        border-radius: 5px;
        background-color: rgb(9, 150, 185);
        color: white;
        font-weight: bolder;
        font-family: Arial, Helvetica, sans-serif;
        border: none;
        font-size: 15px;
        padding-left: 35px;
        cursor: pointer;
        transition: 0.2s;
        
    }
    .add:hover{
        background-color: rgb(5, 50, 61);
    }
</style>