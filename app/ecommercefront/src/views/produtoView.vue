<template>
  <section class="container-prod">
    <section>
      <img class="imgProduct" :src="'http://localhost:8055/' + img" alt="" />
    </section>
    <section class="container-info">
      <div class="container-vendidos">
        <article class="Vendidos">
          {{ Vendidos }}
        </article>
        <p class="vend">Vendidos</p>
      </div>

      <p class="name-prod">{{ NomeProduto }}</p>
      <section class="valores">
        <p class="preco" v-if="valor_antigo == 0">{{ Preco }}</p>
        <p class="preco" v-else>{{ valor_antigo }}</p>
        <span v-if="valor_antigo != 0" class="valor-antigo">{{ Preco }}</span>
      </section>
      <p class="avalia">{{ avsTot }} Avaliações</p>
      <p class="tee">
        <span class="por">Vendido por:</span>
        <span class="tecno">TecnoComerce</span>
      </p>
      <section class="cont-desc">{{ Desc }}</section>
      <div class="container-cart-button">
        <button @click="addtocart()" class="cart">COMPRAR</button>
      </div>
    </section>
  </section>
  <section class="container-detal">
    <h1 class="titulo-desc">Descrição</h1>
    <section class="descDetalhada">
      <section class="detalhesprod">
        <h1 class="NomeProdutoMaius">{{ NomeProdutoMaiusculo }}</h1>
        <p class="DescProduct">{{ Desc }}</p>
      </section>
      <section>
        <img
          class="imgProduct img_desc"
          :src="'http://localhost:8055/' + img"
          alt=""
        />
      </section>
    </section>
  </section>
  <section class="containeruserav">
    <section class="sec-av">
      <article class="container-av-1">
        <div class="container-av">
          <img class="av-icon" src="/images/avaliacoes.png" alt="" />
          <h2 class="title-av">Avaliações</h2>
        </div>
        <div>
          <button class="avaliar" @click="avalia()">AVALIAR</button>
        </div>
      </article>
      <section class="container-avaliar" :class="{ cont2: ativo }">
        <mensagemSucesso
          v-show="sucess"
          :mensagem="msgsucess"
        ></mensagemSucesso>
        <MensagemErro v-show="error" :mensagem="msgerro"></MensagemErro>
        <div class="container-form-av">
          <div class="text-left posi">
            <v-rating
              v-model="rating"
              hover
              half-increments
              size="xx-large"
              color="yellow"
              :dense="true"
            ></v-rating>
          </div>

          <article>
            <form class="formAv" action="">
              <textarea
                v-model="texto"
                class="avtext"
                name=""
                required
                id=""
                maxlength="500"
                rows="5"
                placeholder="Digite aqui sua avaliação"
              ></textarea>
            </form>
            <div class="container-enviar-av">
              <button class="enviar-av" @click="assessment()">ENVIAR</button>
            </div>
          </article>
        </div>
      </section>
    </section>
    <section class="user-av" v-for="av in avaliacoes">
      <article class="nome-user">
        <img class="icon-user" src="/images/us.png" alt="" />
        <p class="user-data">{{ av.UserName }}</p>
      </article>
      <article class="geral">
        <p>Geral:</p>
        <div class="cont-av">
          <div v-show="av.Nota == 5.0">
            <img width="20px" src="/images/fullstar.svg" alt="" />
            <img width="20px" src="/images/fullstar.svg" alt="" />
            <img width="20px" src="/images/fullstar.svg" alt="" />
            <img width="20px" src="/images/fullstar.svg" alt="" />
            <img width="20px" src="/images/fullstar.svg" alt="" />
          </div>
          <div v-show="av.Nota == 4.5">
            <img width="20px" src="/images/fullstar.svg" alt="" />
            <img width="20px" src="/images/fullstar.svg" alt="" />
            <img width="20px" src="/images/fullstar.svg" alt="" />
            <img width="20px" src="/images/fullstar.svg" alt="" />
            <img width="20px" src="/images/halfstar.svg" alt="" />
          </div>
          <div v-show="av.Nota == 4.0">
            <img width="20px" src="/images/fullstar.svg" alt="" />
            <img width="20px" src="/images/fullstar.svg" alt="" />
            <img width="20px" src="/images/fullstar.svg" alt="" />
            <img width="20px" src="/images/fullstar.svg" alt="" />
            <img width="20px" src="/images/emptystar.svg" alt="" />
          </div>
          <div v-show="av.Nota == 3.5">
            <img width="20px" src="/images/fullstar.svg" alt="" />
            <img width="20px" src="/images/fullstar.svg" alt="" />
            <img width="20px" src="/images/fullstar.svg" alt="" />
            <img width="20px" src="/images/halfstar.svg" alt="" />
            <img width="20px" src="/images/emptystar.svg" alt="" />
          </div>
          <div v-show="av.Nota == 3.0">
            <img width="20px" src="/images/fullstar.svg" alt="" />
            <img width="20px" src="/images/fullstar.svg" alt="" />
            <img width="20px" src="/images/fullstar.svg" alt="" />
            <img width="20px" src="/images/emptystar.svg" alt="" />
            <img width="20px" src="/images/emptystar.svg" alt="" />
          </div>
          <div v-show="av.Nota == 2.5">
            <img width="20px" src="/images/fullstar.svg" alt="" />
            <img width="20px" src="/images/fullstar.svg" alt="" />
            <img width="20px" src="/images/halfstar.svg" alt="" />
            <img width="20px" src="/images/emptystar.svg" alt="" />
            <img width="20px" src="/images/emptystar.svg" alt="" />
          </div>
          <div v-show="av.Nota == 2.0">
            <img width="20px" src="/images/fullstar.svg" alt="" />
            <img width="20px" src="/images/fullstar.svg" alt="" />
            <img width="20px" src="/images/emptystar.svg" alt="" />
            <img width="20px" src="/images/emptystar.svg" alt="" />
            <img width="20px" src="/images/emptystar.svg" alt="" />
          </div>
          <div v-show="av.Nota == 1.5">
            <img width="20px" src="/images/fullstar.svg" alt="" />
            <img width="20px" src="/images/halfstar.svg" alt="" />
            <img width="20px" src="/images/emptystar.svg" alt="" />
            <img width="20px" src="/images/emptystar.svg" alt="" />
            <img width="20px" src="/images/emptystar.svg" alt="" />
          </div>
          <div v-show="av.Nota == 1.0">
            <img width="20px" src="/images/fullstar.svg" alt="" />
            <img width="20px" src="/images/emptystar.svg" alt="" />
            <img width="20px" src="/images/emptystar.svg" alt="" />
            <img width="20px" src="/images/emptystar.svg" alt="" />
            <img width="20px" src="/images/emptystar.svg" alt="" />
          </div>
          <div v-show="av.Nota == 0.5">
            <img width="20px" src="/images/halfstar.svg" alt="" />
            <img width="20px" src="/images/emptystar.svg" alt="" />
            <img width="20px" src="/images/emptystar.svg" alt="" />
            <img width="20px" src="/images/emptystar.svg" alt="" />
            <img width="20px" src="/images/emptystar.svg" alt="" />
          </div>
          <div v-show="av.Nota == 0.0">
            <img width="20px" src="/images/emptystar.svg" alt="" />
            <img width="20px" src="/images/emptystar.svg" alt="" />
            <img width="20px" src="/images/emptystar.svg" alt="" />
            <img width="20px" src="/images/emptystar.svg" alt="" />
            <img width="20px" src="/images/emptystar.svg" alt="" />
          </div>
        </div>
        <p class="av-text">{{ av.Comentario }}</p>
      </article>
    </section>
    <div v-show="avsTot > 4" class="vejamais">
      <button @click="vermais()" class="veja">veja mais</button>
    </div>
  </section>
</template>
<script>
import axios from "axios";
import mensagemSucesso from "@/components/mensagemSucesso.vue";
import mensagemErro from "@/components/mensagemErro.vue";
import iconfull from "@/components/iconfull.vue";
import iconhalf from "@/components/iconhalf.vue";
import emptystar from "@/components/emptystar.vue";
import MensagemErro from "@/components/mensagemErro.vue";
import { tSMethodSignature } from "@babel/types";
import jwtDecode from "jwt-decode";
import { captureRejectionSymbol } from "stream";
export default {
  data() {
    return {
      id: this.$route.params.id,
      NomeProduto: null,
      NomeProdutoMaiusculo: null,
      Desc: null,
      Preco: null,
      Vendidos: null,
      img: null,
      av: 0,
      texto: null,
      ativo: true,
      rating: 0,
      iconfull: iconfull,
      iconhalf: iconhalf,
      emptystar: emptystar,
      sucess: false,
      msgsucess: null,
      error: false,
      msgerro: null,
      avaliacoes: [],
      avsTot: null,
      contador: 1,
      valor_antigo: null,
    };
  },
  watch: {
    "$route.params.id"(newId) {
      this.id = newId;
      this.findedProduct();
      this.listFourAssessment();
    },
  },

  components: { iconfull, iconhalf, emptystar, mensagemSucesso, MensagemErro },
  methods: {
    async findedProduct() {
      const resp = await axios.get(`http://localhost:8055/product/${this.id}`);
      this.NomeProduto = resp.data.NomeProduto;
      this.Preco = resp.data.Preco;
      this.Desc = resp.data.DescProduto;
      this.Vendidos = resp.data.Vendidos;
      this.img = resp.data.img;
      this.NomeProdutoMaiusculo = resp.data.NomeProduto.toUpperCase();
      this.avsTot = resp.data.avaliacoes;
      this.valor_antigo = resp.data.Enderecos;
    },
    async addtocart() {
      const preco = this.valor_antigo != 0 ? this.valor_antigo : this.Preco;

      const res = await axios.post("http://localhost:8055/cart/add", {
        id_user: this.$store.state.user.id,
        id_product: this.id,
        quantidade: 1,
        valor_unit: preco,
      });

      if (res.data != true) {
        this.$store.commit("setCart", res.data);
        this.$router.push("/carrinho");
      }
      this.$store.commit("setCart", res.data);
      this.$router.push("/carrinho");
    },
    async vermais() {
      this.contador = this.contador + 1;
      const resp = await axios.get(
        `http://localhost:8055/seemore/${this.id}/${
          this.avaliacoes[this.avaliacoes.length - 1].Data
        }`
      );

      for (let c in resp.data) {
        this.avaliacoes.push(resp.data[c]);
      }
    },
    async assessment() {
      const res = await axios.post("http://localhost:8055/assessment", {
        id_user: this.$store.state.user.id,
        id_product: this.id,
        text: this.texto,
        note: this.rating,
      });
      console.log(res);
      const obje = {
        UserName: this.$store.state.user.Nome,
        Comentario: this.texto,
        Nota: this.rating,
        Data: res.data.Data,
      };

      if (res.data.status == 200) {
        this.avaliacoes.unshift(obje);
      }

      this.texto = null;
      this.rating = 0;
      console.log(res.data.msg);
      if (res.data.status == 200) {
        this.msgsucess = res.data.msg;
        this.sucess = true;
        setTimeout(() => {
          this.sucess = false;
        }, 3000);
      }
      if (res.data.status == 400) {
        this.msgerro = res.data.msg;
        this.error = true;
        setTimeout(() => {
          this.error = false;
        }, 3000);
      }
    },
    async listFourAssessment() {
      const res = await axios.get(
        `http://localhost:8055/listfourassessment/${this.id}`
      );
      this.avaliacoes = res.data;
      console.log(res);
    },
    avalia() {
      this.ativo = !this.ativo;
    },
  },
  mounted() {
    this.findedProduct();
    this.listFourAssessment();
    window.scrollTo(0, 0);
  },
};
</script>
<style>
.posi {
  margin-top: -0.2rem;
  margin-left: 0.5rem;
}
.container-cart-button {
  text-align: center;
}
.v-btn--icon .v-icon {
  font-size: 80px;
}
@media screen and (max-width: 375px) {
  .v-btn--icon .v-icon {
  font-size: 60px;

}
  .posi{
    margin-left: 0px;
  }
}
@media screen and (max-width: 320px) {
  .v-btn--icon .v-icon {
  font-size: 45px;
}
}

</style>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap");
.imgProduct {
  width: 600px;
  margin-right: 50px;
  padding-top: 3rem;
}
.container-avaliar {
  animation-name: aparecercont;
  animation-duration: 0.5s;
  animation-timing-function: ease-in-out;
}
@keyframes aparecercont {
  from {
    opacity: 0;
  }
}
.title-av {
  padding-top: 0.45rem;
  font-family: "Poppins";
}
.vejamais {
  text-align: center;
}
.nome-user {
  display: flex;
}
.mar {
  margin-top: 20px;
}
.veja {
  padding: 0.65rem;
  margin-right: 2rem;
  width: 300px;
  cursor: pointer;
  background-color: rgba(0, 162, 255, 0.993);
  border: none;
  color: white;
  transition: 0.2s ease-in-out;
  font-size: 1rem;
  font-weight: bolder;
  margin-bottom: 15px;
}
.containeruserav {
  background-color: white;
}
.container-detal {
  background-color: white;
}
.veja:hover {
  background-color: rgba(14, 77, 113, 0.993);
}

.enviar-av {
  padding: 0.65rem;
  margin-right: 2rem;
  width: 300px;
  cursor: pointer;
  background-color: rgba(0, 162, 255, 0.993);
  border: none;
  color: white;
  transition: 0.2s ease-in-out;
  font-size: 1rem;
  font-weight: bolder;
  float: right;
  margin-right: 1px;
}
.enviar-av:hover {
  background-color: rgba(11, 82, 123, 0.993);
}

.container-form-av {
  display: flex;
  justify-content: space-around;
  margin-top: 40px;

  padding-top: 20px;
}
.cont2 {
  display: none;
}

.cont-av {
  width: 200px;
}
.avtext {
  border: 1px solid rgba(0, 0, 0, 0.481);
  padding: 2px;
  width: 600px;
  resize: none;
}
.sec-av {
  padding-top: 5rem;
  margin-bottom: 2rem;
}
.icon-user {
  padding-left: 0.4rem;
  padding-top: 0.4rem;
}
.user-data {
  padding-left: 0.6rem;
  font-weight: bolder;
}
.user-av {
  margin-left: 3rem;
  margin-right: 3rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(132, 126, 126, 0.412);
  padding-top: 1rem;
  padding-bottom: 0.4rem;
  background-color: white;
}
.av-text {
  margin-left: 20px;
  padding-left: 22px;
  margin-top: -35px;
  border-left: 1px solid rgba(0, 0, 0, 0.319);
}
.geral {
  display: flex;
  padding-left: 3rem;
  font-weight: bolder;
  padding-right: 0.2rem;
}

.container-prod {
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-family: Arial, Helvetica, sans-serif;
  background-color: white;
}
.img_desc {
  margin-top: -140px;
}
.container-av-1 {
  display: flex;
  justify-content: space-between;
}
.avaliar {
  padding: 0.65rem;
  margin-right: 2rem;
  width: 300px;
  cursor: pointer;
  background-color: rgba(0, 162, 255, 0.993);
  border: none;
  color: white;
  transition: 0.2s ease-in-out;
  font-size: 1rem;
  font-weight: bolder;
}
.avaliar:hover {
  background-color: rgba(16, 117, 175, 0.993);
}
.detalhesprod {
  margin-top: -100px;
  margin-right: 50px;
}
.av-icon {
  width: 3em;
}
.container-av {
  display: flex;
  margin-left: 2rem;
}
.name-prod {
  width: 500px;
  margin-top: 20px;
  margin-bottom: 10px;
  color: white;
  font-weight: bolder;
}
.tee {
  padding-top: 20px;
}
.por {
  color: #a8a8a8;
}
.imgProduct {
  width: 500px;
}
.DescProduct {
  width: 400px;
  margin-left: 150px;
  margin-top: 20px;
  font-family: Arial, Helvetica, sans-serif;
}
.titulo-desc {
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 27px;
  padding-top: 70px;
  margin-bottom: 150px;
  padding-top: 40px;
  border-top: 1px solid rgba(119, 115, 115, 0.363);
}
.descDetalhada {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: white;
}
.tecno {
  color: white;
}
.NomeProdutoMaius {
  width: 500px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bolder;
  font-size: 26px;
  margin-left: 150px;
}
.cont-desc {
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  padding-top: 20px;
  color: white;
}
.container-info {
  background-color: rgba(0, 162, 255, 0.993);
  height: 424px;
  width: 600px;
  margin-top: 70px;
  padding: 20px;
  border-radius: 10px;
  -webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  position: relative;
  margin-right: 20px;
}
.vend {
  text-align: center;
  margin-top: 5px;
  color: white;
}
.Vendidos {
  color: white;
  background-color: rgba(11, 78, 117, 0.993);
  padding: 10px;
  width: 200px;
  text-align: center;
  font-size: 20px;

  text-shadow: #fff 0px 0px 5px, #fff 0px 0px 10px, #fff 0px 0px 15px,
    #ff2d95 0px 0px 20px, #ff2d95 0px 0px 30px, #ff2d95 0px 0px 40px,
    #ff2d95 0px 0px 50px, #ff2d95 0px 0px 75px;
}
.container-vendidos {
  position: absolute;
  right: 80px;
  top: 90px;
}
.preco {
  padding-top: 10px;
  font-size: 20px;
  color: white;
}
.valores {
  display: flex;
  flex-direction: row;
}
.valor-antigo {
  padding-top: 12px;
  padding-left: 10px;
  color: rgba(185, 188, 190, 0.938);
  font-weight: bolder;
  text-decoration: line-through;
}
.desc {
  padding-top: 20px;
  padding-bottom: 10px;
  color: white;
  font-size: 20px;
}
.avalia {
  color: rgb(218, 215, 215);
  padding-top: 20px;
}

.ContentDesc {
  color: white;
  width: 600px;
}
.cart {
  width: 80%;
  padding: 10px;
  font-size: 18px;
  margin-top: 50px;
  background-color: transparent;
  color: white;
  background-color: rgba(23, 109, 158, 0.993);
  border: none;
  transition: 0.2s;
  cursor: pointer;
  border-radius: 5px;
  position: absolute;
  bottom: 20px;
  right: 50px;
}
.cart:hover {
  background-color: rgba(17, 66, 94, 0.993);
}

@media screen and (max-width: 1024px) {
  .imgProduct {
    width: 300px;
  }
  .container-info {
    width: 400px;
    margin-top: 20px;
  }
  .container-vendidos {
    right: 10px;
  }
  .NomeProdutoMaius {
    width: 0px;
  }
  .DescProduct {
    width: 200px;
  }
  .cart {
    right: 42px;
  }
  .container-form-av {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
@media screen and (max-width: 768px) {
  .container-info {
    margin-top: 3rem;
  }
  .name-prod {
    width: 100px;
  }
}
@media screen and (max-width: 425px) {
  .container-prod {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .geral{
    flex-direction: column;
    word-wrap: break-word;
  }
  .veja{
    margin: 0px;
    margin-bottom: 1rem;
  }
  .av-text{
  
    margin: 0px;
    padding: 10px;
  }
  .avtext {
    width: 300px;
  }
  .container-detal {
    display: flex;
    flex-direction: column;
  }
  .imgProduct {
    margin-right: 0;
  }
  .container-info {
    margin: 0px;
  }
  .descDetalhada {
    flex-direction: column;
  }
  .detalhesprod {
    margin-right: 0px;
    text-align: center;
    width: 100%;
  }
  .img_desc {
    margin: 0px;
  }
  .DescProduct {
    margin-left: 0px;
    width: 100%;
  }
  .NomeProdutoMaius {
    margin-left: 0px;
    width: 100%;
  }
  .container-av-1 {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding-bottom: 1rem;
  }
  .container-av {
    margin: 0px;
  }
  .avaliar {
    margin: 0px;
  }
}
@media screen and (max-width: 375px) {
  .container-info {
    width: 350px;
  }
  .Vendidos {
    width: 150px;
  }
  .cart {
    right: 35px;
  }
 
}
@media screen and (max-width: 320px) {
  .container-info {
    width: 300px;
  }
  .cart {
    right: 30px;
  }
}
</style>
