<template>
  <section class="cont-log">
    <span v-show="mostrarerro" class="msgerro">
      <img class="aviso" src="/images/aviso.png" alt="" /><span
        class="content-msgerro"
        >{{ msgerro }}</span
      >
      <div class="load"></div>
    </span>
    <div class="cont-logo"><img src="/images/logo.png" alt="" /></div>
    <form class="log" action="">
      <h1 class="tituloTec">TecnoComerce</h1>

      <h2 class="subti">Bem vindo ao TecnoComerce</h2>

      <div class="cont-input">
        <img src="/images/email.png" class="iconEmail" alt="" />
        <input
          class="inputt"
          autocomplete="off"
          id="Email"
          v-model="Email"
          type="text"
          placeholder=""
          required
        />
        <Label for="Email">Email</Label>
      </div>
      <div class="cont-input">
        <img src="/images/trancar.png" class="iconEmail" alt="" />
        <input
          class="senha"
          autocomplete="off"
          v-model="Senha"
          id="senha"
          :type="tipo"
          required
          placeholder=""
        />
        <img
          @click="mostrarO()"
          v-show="mostrarOlho"
          class="iconOlho"
          src="/images/olho.png"
          alt=""
        />
        <img
          @click="mostrarO()"
          v-show="!mostrarOlho"
          class="iconOlhoF"
          src="/images/olhofechado.png"
        />
        <Label for="senha">Senha</Label>
      </div>
      <p class="esque">Esqueceu a senha?</p>
      <div class="cont-btnlog">
        <button class="logar" @click="logar">Logar</button>
      </div>
      <p class="criarConta">
        Novo na TecnoComerce?
        <router-link to="/cadastro"
          ><span class="linkCadastro">Criar Conta</span></router-link
        >
      </p>
    </form>
  </section>
</template>

<script>
import axios from "axios";
import mensagemErro from "./mensagemErro.vue";
import mensagemSucesso from "./mensagemSucesso.vue";
export default {
  name: "formlogin",
  data() {
    return {
      Email: "",
      Senha: "",
      mostrarOlho: false,
      tipo: "password",
      msgerro: "",
      mostrarerro: false,
    };
  },
  components: { mensagemErro, mensagemSucesso },
  methods: {
    async logar(e) {
      e.preventDefault();
      const log = await axios.post("http://localhost:8055/login", {
        Email: this.Email,
        Senha: this.Senha,
      });
      if (log.data.msg.status == 405) {
        this.msgerro = log.data.msg.erro;
        this.mostrarerro = true;
        setTimeout(() => {
          this.msgerro = "";
          this.mostrarerro = false;
        }, 4000);
        console.log(log.data.msg.erro);
        return;
      }
      this.$store.commit("setid", log.data.msg.id);
      this.$store.commit("setToken", log.data.msg.token);
      this.$store.commit("setNome", log.data.msg.Nome);
      this.$store.commit("setFav", log.data.msg.countfav);
      this.$store.commit("setCart", log.data.msg.countCart._sum.quantidade);
      this.$store.commit("setProductFav", log.data.msg.listProductsFavoriteds)
   
      this.$router.push("/"); 
    },
    mostrarO() {
      this.mostrarOlho = !this.mostrarOlho;
      if (this.mostrarOlho == true) {
        this.tipo = "text";
        return;
      }
      this.tipo = "password";
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Oswald:wght@500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Lobster&display=swap");
.cont-log {
  display: flex;
  justify-content: center;
  align-items: center; 
  margin-bottom: 150px;
  height: 100vh;
  background-color: rgb(7, 103, 128);
  top: 0;
 
}
.log {

  background-color: rgb(9, 64, 78);
  width: 400px;
  border-radius: 15px;
  box-shadow: 5px 5px 15px 5px #000000;
  animation-name: mostrarLog;
  animation-duration: 0.2s;
  animation-timing-function: linear;



}
.content-msgerro {
  padding-left: 20px;
}
.iconEmail {
  width: 20px;
  position: absolute;
  left: 55px;
  border-bottom: 2px solid rgb(7, 103, 128);
  
  top: 4px;
}
.aviso {
  position: absolute;
  width: 22px;
  left: 10px;
  bottom: 20px;
}
.load {
  width: 100%;
  background-color: rgb(168, 37, 37);
  height: 20px;
  position: absolute;
  left: 0;
  border-radius: 5px;
  animation-name: loading;
  animation-duration: 4.2s;
}
@keyframes loading {
  to {
    width: 0%;
  }
}
.msgerro {
  position: absolute;
  background-color: red;
  padding: 20px;
  color: white;
  font-weight: bolder;
  font-size: 16px;
  border-radius: 5px;
  top: 0;
  font-family: Arial, Helvetica, sans-serif;
  animation: aparece 0.3s ease-in, desaparece 0.3s 3.8s;

  right: 50px;
  top: 10px;
}
@keyframes aparece {
  0% {
    transform: translateX(0%);
  }
  25% {
    transform: translateX(15%);
  }
  30% {
    transform: translateX(10%);
  }
  50% {
    transform: translateX(15%);
  }
}
@keyframes desaparece {
  to {
    transform: translateX(20%);
  }
}
.iconOlho {
  position: absolute;
  right: 76px;
  top: -8px;
  width: 32px;
  border-bottom: 2px solid rgb(7, 103, 128);
  cursor: pointer;
}
.iconOlhoF {
  position: absolute;
  right: 76px;
  top: -8px;
  width: 32px;
  border-bottom: 2px solid rgb(7, 103, 128);
  cursor: pointer;
}

.linkCadastro {
  cursor: pointer;
  text-decoration: underline;
  color: white;
}
.cont-btnlog {
  text-align: center;
  margin-top: 50px;
}
.logar {
  padding: 10px;
  width: 150px;
  background-color: rgb(13, 148, 182);
  border-radius: 10px;
  border: none;
  font-weight: bolder;
  font-size: 15px;
  font-family: Arial, Helvetica, sans-serif;
  color: white;
  cursor: pointer;
  transition: 0.5s;
}
.logar:hover {
  background-color: rgb(11, 108, 133);
}
.esque {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bolder;
  font-size: 12px;
  color: rgb(190, 183, 183);
  float: right;
  margin-right: 70px;
  cursor: pointer;
}
.esque:hover {
  text-decoration: underline;
}
.criarConta {
  text-align: center;
  color: white;
  margin-top: 50px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bolder;
}

.tituloTec {
  color: rgb(255, 255, 255);
  font-family: "Lobster", cursive;
  padding-top: 40px;
  text-align: center;
  margin-bottom: 40px;
}
.cont-input {
  position: relative;
  text-align: center;
  margin-top: 35px;
}
.cont-input label {
  position: absolute;
  left: 80px;
  font-family: Arial, Helvetica, sans-serif;
  color: rgba(127, 165, 190, 0.452);
  cursor: auto;
  transition: 0.2s;
  font-weight: bolder;
}
.cont-input input:focus ~ label,
.cont-input input:valid ~ label {
  transform: translateY(-20px);
}
.subti {
  color: rgb(184, 179, 179);
  text-align: center;
  font-family: "Lobster", cursive;
  font-weight: bolder;
  margin-bottom: 20px;
}
.cont-logo {
  background-color: rgb(7, 103, 128);
}

.senha {
  border: none;
  border-bottom: 2px solid rgb(7, 103, 128);
  width: 250px;
  background-color: transparent;
  outline: 0;
  padding-left: 2px;
  color: rgb(245, 245, 245);
  font-family: Arial, Helvetica, sans-serif;
  margin-bottom: 20px;
}

@keyframes mostrarLog {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
}
.inputt {
  border: none;
  border-bottom: 2px solid rgb(7, 103, 128);
  width: 250px;
  background-color: transparent;
  outline: 0;
  padding-left: 5px;
  color: rgb(245, 245, 245);
  font-family: Arial, Helvetica, sans-serif;
  margin-bottom: 20px;
}

@media screen and (max-width: 1111px) {
    .cont-logo{
      display:  none;
    }
}
@media screen and (max-width: 426px) {
  .log{
    width: 300px;
  }
  .cont-input label{
    left: 50px;
  }
  .iconEmail{
    left: 25px;
  }
  .inputt{
    padding-left: 25px;
    
  }
  .senha{
    padding-left: 25px;
    padding-right: 33px;
  }
  .iconOlhoF{
    right: 28px;
  }
  .iconOlho{
    right: 28px;
  }
  .cont-log{

  }

}
</style>
