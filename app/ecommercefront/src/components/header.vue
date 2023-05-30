<template>
  <section :class="mostrar_menu" class="menu">
    <article v-if="!logadoounao2" class="a1">
      <h1 class="logue">Ola. Faça seu login</h1>
      <div class="buttons2">
        <router-link to="/login"
          ><button @click="fechar_overlay" class="button_2">
            Login
          </button></router-link
        >
        <router-link to="/cadastro"
          ><button @click="fecharr" class="button_3">
            Cadastro
          </button></router-link
        >
      </div>
    </article>
    <article class="links" v-show="logadoounao2">
      <h1 class="logado">Olá. {{ firstName }}</h1>
      <router-link to="/perfil">
        <section @click="fechar_overlay" class="opc">
          <img
            style="width: 30px"
            class="imgs"
            src="/images/perfil.png"
            alt=""
          />
          Minha Conta
        </section>
      </router-link>
      <router-link to="/endereco">
        <section @click="fechar_overlay" class="opc">
          <img style="width: 30px" class="imgs" src="/images/casa.png" alt="" />
          Meus Endereços
        </section>
      </router-link>
      <section class="opc">
        <img
          style="width: 30px"
          class="imgs"
          src="/images/ferramenta.png"
          alt=""
        />
        Meus Pedidos
      </section>
      <section class="opc">
        <img style="width: 30px" class="imgs" src="/images/joinha.png" alt="" />
        Minhas Avaliações
      </section>

      <section class="logg">
        <button class="btn-logout" @click="logout">logout</button>
      </section>
    </article>
  </section>
  <div v-show="MostarOverlay" class="overlay" @click="fechar_overlay"></div>
  <header>
    <router-link to="/"
      ><img class="logo" src="/images/logo.png" alt=""
    /></router-link>
    <div class="input-cont">
      <input
        class="inputt"
        type="text"
        placeholder="Buscar"
        @input="pesquisar()"
        v-model="ProductName"
      />
      <transition name="fade">
        <div
          class="produtos"
          v-show="produtos.length > 0"
        >
          <div class="prods" v-for="produto in produtos">
            <div class="produto_dado">
              <img
                class="imgprod"
                :src="`http://localhost:8055/${produto.img}`"
                alt=""
              />
              <p class="NomeProduto">{{ produto.NomeProduto }}</p>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <section v-show="!logadoounao" class="sec1">
      <div><img src="/images/user.png" alt="" /></div>
      <p class="p1">
        Faça
        <router-link to="/login"><span class="log">LOGIN</span></router-link> ou
        <br />
        crie seu
        <router-link to="/cadastro"
          ><span class="log">CADASTRO</span></router-link
        >
      </p>
    </section>
    <section class="config" v-show="logadoounao">
      <span class="perfil">{{ Inicial }}</span>
      <p class="username">{{ firstName }}</p>
    </section>
    <section class="config2">
      <div class="carrin">
        <router-link to="/carrinho"
          ><img class="carrinho" src="/images/cartWhite.png" alt=""
        /></router-link>
        <span class="container-fav">
          <div v-if="parseInt(countCart) > 0" class="count-fav-2">
            {{ countCart }}
          </div>
        </span>
      </div>
      <div class="carrin">
          <img
            class="carrinho conf"
            @click="mostrar_overlay"
            src="/images/engreWhite.png"
            alt=""
          />
      </div>

      <div class="carrin">
          <span class="container-fav">
            <div
              v-show="logadoounao2"
              v-if="parseInt(countFav) > 0"
              class="count-fav"
            >
              {{ countFav }}
            </div>
            <router-link to="/favoritos"
              ><img class="carrinho" src="/images/favwhite.png" alt=""
            /></router-link>
          </span>
      </div>
    </section>
  </header>
</template>

<script>
import axios from "axios";
export default {
  name: "cabeça",
  data() {
    return {
      Nome: "",
      teste: false,
      Inicial: "",
      ativado: true,
      produtos: [],
      ProductName: "",

      MostarOverlay: false,
      mostrar_menu: {
        menu_aberto: false,
      },
      firstName: "",
    };
  },
  computed: {
    logadoounao() {
      this.carregardados();
      return this.$store.state.user.jwt != null;
    },
    countFav() {
      return this.$store.state.user.countFavorites;
    },
    logadoounao2() {
      return this.$store.state.user.jwt != null;
    },
    countCart() {
      return this.$store.state.user.countCart;
    },
  },
  mounted() {
    this.carregardados();
  },
  methods: {
    async carregardados() {
      this.Nome = this.$store.state.user.Nome;
      this.Inicial = this.$store.state.user.Nome[0];
      this.firstName = this.Nome.split(" ")[0];
    },
    async pesquisar() {
      if (this.ProductName == "") {
        this.ativado = true;
        this.produtos = []
        return;
      }
      this.ativado = false;
      const res = await axios.post("http://localhost:8055/search", {
        product_name: this.ProductName,
      });
      console.log(res.data)
      this.produtos = res.data;
    },
    mostrar_overlay() {
      this.MostarOverlay = true;
      this.mostrar_menu.menu_aberto = true;
      document.body.style.overflow = "hidden";
    },
    fechar_overlay() {
      this.MostarOverlay = false;
      this.mostrar_menu.menu_aberto = false;
      document.body.style.overflow = "auto";
    },
    fecharr() {
      this.MostarOverlay = false;
      this.mostrar_menu.menu_aberto = false;
    },
    logout() {
      this.$store.commit("setid", null);
      this.$store.commit("setToken", null);
      this.$store.commit("setNome", null);
      this.$store.commit("setFav", null);
      this.$store.commit("setCart", null);

      this.fechar_overlay();
    },
  },
};
</script>

<style scoped>
.logg {
  display: flex;
  justify-content: center;
  align-items: center;
}
.container-fav {
  position: relative;
}
.produto_dado {
  display: flex;
  padding: 10px;
  animation: produtoaparece 0.5s ease-in-out;
}

@keyframes produtoaparece {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
}

.NomeProduto {
  font-size: 12px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}
.NomeProduto:hover {
  color: rgb(13, 202, 186);
}
.fade-leave-active {
  transition: opacity 0.2s ;
}

.fade-leave-to {
  opacity: 0;

}


.imgprod {
  width: 80px;
  object-fit: contain;
  margin-right: 20px;
}
.count-fav {
  background-color: rgb(13, 202, 186);
  position: absolute;
  color: white;
  border-radius: 50%;
  font-weight: bolder;
  text-align: center;
  width: 20px;
  height: 20px;
  top: -25px;
  right: -10px;
  font-family: Arial, Helvetica, sans-serif;
}
.input-cont {
  position: relative;
}
.count-fav-2 {
  background-color: rgb(13, 202, 186);
  position: absolute;
  color: white;
  border-radius: 50%;
  font-weight: bolder;
  text-align: center;
  width: 20px;
  height: 20px;
  font-family: Arial, Helvetica, sans-serif;
  top:-20px;
  right: -10px;
}
.carrin {
  position: relative;
  padding-right: 40px;
  
}
.menu {
  position: fixed;
  width: 0%;
  height: 100vh;
  background-color: rgb(9, 150, 185);
  right: 0;
  transition: 0.2s;
  white-space: nowrap;
  overflow: hidden;
  z-index: 115;
}
.links .router-link-active .opc {
  background-color: rgb(7, 103, 128);
}
.links .router-link-active .opc {
  background-color: rgb(7, 103, 128);
}
.produtos {
  height: 200px;
  width: 300px;
  background-color: white;
  position: absolute;
  top: 100px;
  overflow-y: scroll;
  animation-name: produto_aparece_2;
  animation-duration: 0.5s;
  animation-timing-function: ease-in-out;
}
@keyframes produto_aparece_2 {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.btn-logout {
  padding: 10px;
  width: 200px;
  font-size: 20px;
  font-weight: bolder;
  font-family: "Courier New", Courier, monospace;
  color: white;
  background-color: rgb(13, 82, 99);
  border: none;
  border-radius: 15px;
  margin-bottom: 10px;
  cursor: pointer;

  position: absolute;
  bottom: 20px;
}

.conf:hover {
  animation-name: girar;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
@keyframes girar {
  to {
    transform: rotate(0deg);
  }
  from {
    transform: rotate(360deg);
  }
}
.btn-logout:hover {
  background-color: rgb(8, 172, 212);
}
.imgs {
  position: absolute;
  left: 10px;
  top: 2px;
}
.opc {
  padding-left: 50px;
  font-weight: bolder;
  color: white;
  font-family: "Courier New", Courier, monospace;
  font-size: 20px;
  position: relative;
  margin-bottom: 20px;
  margin-top: 10px;
  padding-top: 5px;
  cursor: pointer;
}
.opc:hover {
  background-color: rgb(7, 103, 128);
}

.a1 {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.logado {
  color: white;
  font-size: 25px;
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 50px;
}
.button_3 {
  font-size: 20px;
  font-weight: bolder;
  font-family: "Courier New", Courier, monospace;
  color: white;
  background-color: transparent;
  border: none;
  cursor: pointer;
}
.button_3:hover {
  text-decoration: underline;
}
.menu_aberto {
  width: 30%;
}
.buttons2 {
  display: flex;
  flex-direction: column;
}
.logue {
  margin-top: 50px;
  color: white;
  font-size: 25px;
  font-family: Arial, Helvetica, sans-serif;
  position: absolute;
  top: 0;
  left: 75px;
}
.button_2 {
  padding: 10px;
  width: 200px;
  font-size: 20px;
  font-weight: bolder;
  font-family: "Courier New", Courier, monospace;
  color: white;
  background-color: rgb(13, 82, 99);
  border: none;
  border-radius: 15px;
  margin-bottom: 10px;
  cursor: pointer;
}
.buttons2 a {
  text-align: center;
}
.button_2:hover {
  background-color: rgb(8, 172, 212);
}
header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: rgb(9, 150, 185);
  position: fixed;
  right: 0;
  left: 0;
  box-shadow: 3px 5px 15px 5px rgba(0, 0, 0, 0.5);
  z-index: 10;
}
.username {
  margin-top: 50px;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bolder;
  margin-left: 10px;
}
.config {
  display: flex;
}
.overlay {
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.562);
  position: fixed;
  z-index: 11;
}
.perfil {
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
.logo {
  width: 180px;
  margin-left: 20px;
  margin-top: 20px;
  margin-right: 20px;
}
.inputt {
  width: 300px;
  margin-top: 60px;
  padding: 5px;
  border-radius: 5px;
  border: none;
  background-color: white;
}
.sec1 {
  display: flex;
  flex-direction: row;
  margin-top: 30px;
}
.p1 {
  font-family: "Courier New", Courier, monospace;
  color: white;
  margin-top: 12px;
}
.log {
  font-weight: bolder;
  cursor: pointer;
}
.log:hover {
  text-decoration: underline;
}
.carrinho {
  width: 30px;
  
  cursor: pointer;
}
.config2 {
  margin-top: 50px;
  display: flex;
  
 
}
a:visited {
  color: white;
}
a {
  text-decoration: none;
  color: white;
}
</style>
