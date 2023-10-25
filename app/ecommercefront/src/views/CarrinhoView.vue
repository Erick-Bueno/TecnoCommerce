<template>
  <section v-show="logadoornot">
    <h1 class="titcart">Carrinho</h1>

    <section class="continuarCompra" v-if="produtos.length == 0">
      <p>VOCÊ NÃO POSSUI PRODUTOS NO CARRINHO</p>
      <router-link to="/"
        ><button class="btn-conti">CONTINUAR COMPRANDO</button></router-link
      >
    </section>
    <section v-else class="cart">
      <section>
        <article class="endercontainer">
          <div class="seleender">
            <img class="pin" src="/images/pin.png" alt="" />
            <h1 class="titender">SELECIONE O ENDEREÇO</h1>
          </div>
          <article
            class="cont-enders"
            v-for="ender in enderecos"
            v-if="enderecos.length > 0"
          >
            <input
              class="radios"
              @click="radiometodo(ender.id)"
              v-model="selectop"
              :value="ender.Cep"
              type="radio"
              name="end"
              :id="'end' + ender.id"
            />
            <label :for="'end' + ender.id">
              <article
                :class="{ enderMarcado: opselected === ender.id }"
                class="enderecos"
              >
                <p class="titende3">{{ ender.Nome }}</p>
                <p class="rua">{{ ender.Rua }}</p>
                <p class="rua">Numero: {{ ender.Numero }},</p>
                <p class="rua">CEP {{ ender.Cep }} - {{ ender.Cidade }}</p>
              </article>
            </label>
          </article>
          <article v-else>
            <p class="NoEnder">*Você não tem endereços cadastrados</p>
          </article>
        </article>
        <article class="prodEfrete">
          <div class="contprodfret">
            <img class="cesta" src="/images/cesta.png" alt="" />
            <h1 class="titprodefret">Produto e frete</h1>
            <mensagem-erro
              :mensagem="mensagem"
              v-show="mostrar_msg_erro"
            ></mensagem-erro>
          </div>
          <article v-for="prod in produtos" class="produto">
            <div class="imgProd">
              <img :src="'http://localhost:8055/' + prod.img" alt="" />
            </div>
            <p class="infosProduto">{{ prod.ProdutoNome }}</p>
            <div class="quantidade">
              <p class="titquant">Quant.</p>
              <div class="contador">
                <span>
                  <img
                    class="setas"
                    @click="diminuir(prod.id)"
                    src="/images/setaesquerda.png"
                    alt=""
                  />
                </span>
                <span class="quantUnit">{{ prod.Quantidade }}</span>
                <span>
                  <img
                    class="setas"
                    @click="aumentar(prod.id)"
                    src="/images/setadireita.png"
                    alt=""
                  />
                </span>
              </div>
              <div @click="removeProduct(prod.id)" class="remove">
                <img class="removeimg" src="/images/excluir.png" alt="" />
                <p class="removebutton">REMOVER</p>
              </div>
            </div>
            <div class="Preco">
              <p>{{ prod.Total }}</p>
            </div>
          </article>

          <article class="frete">
            <div class="contprodfret">
              <img class="carro" src="/images/frete.png" alt="" />
              <h1 class="titprodefret">Frete</h1>
            </div>
            <p v-show="selectop == null" class="NoEnder">
              *Selecione um endereço para que o frete possa ser calculado
            </p>
            <article class="sedex" v-show="selectop != null">
              <div>
                <input
                  @change="enviar_frete()"
                  v-model="value_frete"
                  type="radio"
                  name=""
                  id="sedex"
                  value="185,30"
                />
                <label for="sedex"
                  >Sedex -
                  <span class="diasuteis">Até 3 dias Úteis</span></label
                >
              </div>
              <div>
                <p class="sedex-frete-price">R$ 185,30</p>
              </div>
            </article>
          </article>
        </article>
      </section>
      <section class="resumo">
        <h1 class="titresumo">RESUMO</h1>
        <div class="contvalorprod">
          <p class="valorprod">Valor dos produtos:</p>
          <span class="precotot">{{ total_sem_frete }}</span>
        </div>
        <div class="contvalorfrete">
          <p class="valorprod">Frete:</p>
          <span class="precotot">{{ frete }}</span>
        </div>
        <section class="totalcard">
          <p class="pix">Valor à vista no Pix:</p>
          <p class="valor">{{ valortotcart }}</p>
        </section>
        <div class="contbuttonpag">
          <button @click="sendOrder()" class="pag">EFETUAR O PAGAMENTO</button>
        </div>
      </section>
    </section>
  </section>
  <logout v-show="!logadoornot"></logout>
</template>
<script>
import axios from "axios";
import jwtDecode from "jwt-decode";
import { authenticaded } from "../authcomponents";
import mensagemErro from "@/components/mensagemErro.vue";
import logout from "@/components/logout.vue";
import MensagemErro from "@/components/mensagemErro.vue";
export default {
  name: "carrinho",
  data() {
    return {
      ativado: false,
      quant: 1,
      produtos: [],
      valortotcart: null,
      enderecos: [],
      opselected: null,
      selectop: null,
      value_frete: null,
      frete: 0,
      cep: null,
      total_sem_frete: null,
      mensagem: "",
      mostrar_msg_erro: false,
    };
  },
  components: { mensagemErro, logout, MensagemErro },
  computed: {
    logadoornot() {
      return this.$store.state.user.jwt != null;
    },
  },
  methods: {
    aplicarclasse() {
      this.ativado = !this.ativado;
    },
    radiometodo(id) {
      this.opselected = id;
    },
    async find_cep() {
      try {
        const res = await axios.get(
          `https://cep.awesomeapi.com.br/json/${this.cep}`
        );
        this.selectop = res.data.cep;
      } catch (error) {
        return;
      }
    },
    async aumentar(id) {
      let prod = this.produtos.filter((p) => p.id == id);
      prod[0].Quantidade = prod[0].Quantidade + 1;
      const res = await axios.post("http://localhost:8055/cart", {
        id_user: this.$store.state.user.id,
        id_product: id,
        quantity: prod[0].Quantidade,
        frete: this.frete,
      });
      if (res.data.status != 400) {
        this.valortotcart = res.data.totalincart;

        prod[0].Total = res.data.quantidadeUnit;
        this.total_sem_frete = res.data.totnotshipping;
        this.$store.commit(
          "setCart",
          res.data.QuantityProductInCart._sum.quantidade
        );
        return;
      }
      prod[0].Quantidade = prod[0].Quantidade - 1;
      this.mensagem = res.data.msg;
      this.mostrar_msg_erro = true;
      setTimeout(() => {
        this.mensagem = " ";
        this.mostrar_msg_erro = false;
      }, 2000);
    },
    async sendOrder() {
      const res = await axios.post("http://localhost:8055/order", {
        userId: this.$store.state.user.id,
        totalOrder: this.valortotcart,
        productData: this.produtos,
        priceFrete: this.value_frete,
        enderecoId:this.opselected
      });
      console.log(res.data);
      if (res.data.status == 200) {
        this.$store.commit("setCart", 0);
        this.produtos = [];
      }

      if (res.data.status == 400) {
        this.mostrar_msg_erro = true;
        this.mensagem = res.data.msg;
        setTimeout(() => {
          this.mostrar_msg_erro = false;
          this.mensagem = "";
        }, 2000);
      }
    },
    async enviar_frete() {
      const res = await axios.post("http://localhost:8055/frete", {
        id_user: this.$store.state.user.id,
        price: this.value_frete,
      });
      this.valortotcart = res.data.newtot;
      this.frete = res.data.frete;
    },
    async diminuir(id) {
      let prod = this.produtos.filter((p) => p.id == id);

      prod[0].Quantidade = prod[0].Quantidade - 1;

      if (prod[0].Quantidade < 1) {
        prod[0].Quantidade = 1;
        return;
      }

      const res = await axios.post("http://localhost:8055/cart", {
        id_user: this.$store.state.user.id,
        id_product: id,
        quantity: prod[0].Quantidade,
        frete: this.frete,
      });

      if (res.data.status == 400) {
        prod[0].Quantidade = 1;
        return;
      }
      this.$store.commit(
        "setCart",
        res.data.QuantityProductInCart._sum.quantidade
      );
      this.valortotcart = res.data.totalincart;
      this.total_sem_frete = res.data.totnotshipping;
      prod[0].Total = res.data.quantidadeUnit;
    },
    async ListProductsInCart() {
      const res = await axios.get(
        `http://localhost:8055/cart/${this.$store.state.user.id}`
      );
      this.produtos = res.data.responseSucess;
      this.valortotcart = res.data.priceTotalCart;
      this.total_sem_frete = res.data.priceTotalCart;
      console.log(res.data);
      scrollTo(0, 0);
    },
    async ListEnderecos() {
      const req = await axios.get(
        `http://localhost:8055/addressUser/${this.$store.state.user.id}`
      );
      this.enderecos = req.data;
     
    },
    async removeProduct(id) {
      const res = await axios.post("http://localhost:8055/remove", {
        id_user: this.$store.state.user.id,
        id_product: id,
        freteprice: this.frete,
      });
      this.total_sem_frete = res.data.totalincart;
      this.valortotcart = res.data.newtot;
      const indice_produto = this.produtos.findIndex((prod) => prod.id == id);
      this.produtos.splice(indice_produto, 1);
      console.log(res.data);
      this.$store.commit(
        "setCart",
        res.data.quantiyProductInCart._sum.quantidade
      );
    },
  },
  mounted() {
    authenticaded();
    this.ListProductsInCart();
    this.ListEnderecos();
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap");
.titcart {
  font-weight: bolder;
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  margin-top: 220px;
  margin-bottom: 20px;
}
.cep {
  border: 1px solid rgba(0, 0, 0, 0.483);
  padding: 5px;
  border-radius: 2px;
}
/*     input[type="radio"]:checked + label > article {
        background-color: rgba(0, 0, 0, 0.305);
        color: rgb(127, 133, 141) ;
        border-left: 10px solid  rgb(13, 202, 186);
} */
.pag {
  background-color: rgb(9, 150, 185);
  color: white;
  padding: 10px;
  margin-top: 40px;
  display: flex;
  border-radius: 5px;
  transition: 0.5s ease-in-out;
}
.cont-enders {
  display: flex;
}
.btn-conti {
  background-color: rgb(9, 150, 185);
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin-top: 20px;
  margin-bottom: 20px;
  transition: 0.2s ease-in;
}
label {
  width: 100%;
}
.btn-conti:hover {
  background-color: rgb(8, 101, 124);
}
.findcep {
  margin-top: 20px;
  margin-left: 20px;
}
.continuarCompra {
  text-align: center;
  font-family: "poppins";
}
.pesqCep {
  background-color: green;
  padding: 5px;
  color: white;
  border-radius: 2px;
  transition: 0.2s ease-in-out;
}
.pesqCep:hover {
  background-color: rgb(6, 76, 6);
}
.radios {
  display: none;
}
.pag:hover {
  background-color: rgb(8, 87, 107);
}
.infosProduto {
  width: 582px;
  padding-right: 10px;
}
.diasuteis {
  color: rgba(0, 0, 0, 0.535);
  font-size: 14px;
}
label {
  margin-left: 10px;
}
.titresumo {
  padding: 15px;
}
.sedex {
  display: flex;
  justify-content: space-between;
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 20px;
}
.carro {
  width: 32px;
  position: absolute;
  left: -5px;
}
.contbuttonpag {
  display: flex;
  justify-content: center;
}
.pix {
  font-size: 14px;
}
.valor {
  font-size: 25px;
}
.totalcard {
  text-align: center;
  background-color: rgba(0, 128, 0, 0.434);
  color: rgb(11, 122, 11);
  padding: 20px;

  margin-top: 40px;
}
.contvalorfrete {
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
}
.precotot {
  margin-top: -2px;
  margin-left: 10px;

}
.valorprod {
  font-size: 12px;

  color: rgba(0, 0, 0, 0.576);
}
.NoEnder {
  color: red;
  text-align: center;
  margin-top: -20px;
}
.resumo {
  background-color: white;
  width: 300px;
  padding-right: 20px;
  padding-left: 20px;
  height: 400px;
}
.quantUnit {
  width: 40px;
  text-align: center;
}
.frete {
  margin-top: 20px;
}
.contvalorprod {
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.409);
  padding-bottom: 10px;

  justify-content: space-between;
}
.setas {
  width: 20px;

  margin-top: 3px;
  cursor: pointer;
}
.Preco {
  color: rgb(13, 202, 186);
  margin-left: 40px;
}
.cart {
  display: flex;
  justify-content: center;
  font-family: "Poppins";
  margin-bottom: 50px;
}
.removebutton {
  padding-left: 20px;
  font-size: 12px;
}
.remove {
  display: flex;
  margin-top: 20px;
  cursor: pointer;
  color: red;
  position: relative;
}
.quantidade {
  margin-top: -20px;
}
.titquant {
  margin-left: 15px;
  font-size: 15px;
}
.produto {
  display: flex;
  margin-top: 40px;
}

.imgProd img {
  object-fit: contain;
  width: 88px;
  margin-top: -20px;
}
.removeimg {
  width: 12px;
  position: absolute;
  top: 3px;
  left: 5px;
}
.contador {
  display: flex;
}
.titender {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 20px;
  padding-left: 30px;
}
.prodEfrete {
  background-color: white;
  margin-top: 20px;
  background-color: white;
  width: 950px;
  padding: 15px;
  margin-right: 40px;
}
.pin {
  width: 22px;
  position: absolute;
  top: 3px;
}
.endercontainer {
  background-color: white;
  width: 950px;
  padding: 15px;
  margin-right: 40px;
}
.enderecos {
  background-color: rgb(242, 236, 236);
  padding: 10px 0px 10px 30px;
  border-left: 4px solid rgb(13, 202, 186);
  border-radius: 5px;
  cursor: default;
  transition: 0.1s ease-in-out;
  margin-top: 20px;
  cursor: pointer;
}
.enderMarcado {
  background-color: rgba(0, 0, 0, 0.305);
  color: rgb(127, 133, 141);
  border-left: 10px solid rgb(13, 202, 186);
}
.enderecos:hover {
  border-left: 10px solid rgb(13, 202, 186);
}
.seleender {
  display: flex;
  position: relative;
}
.rua {
  color: rgb(127, 133, 141);
  font-size: 0.875rem;
}
.contprodfret {
  display: flex;
  position: relative;
  padding-left: 30px;
}
.cesta {
  position: absolute;
  left: 0;
  width: 22px;
  top: 3px;
}
.titprodefret {
  font-size: 1.25rem;
}
@media screen and (max-width: 1024px) {
  .prodEfrete {
    width: 480px;
  }
  .endercontainer {
    width: 480px;
  }
  .infosProduto{
    width: 100px;
    padding-right: 0px;
    text-align: center;
    margin-bottom: 1.5rem;
  }
}
@media screen and (max-width: 425px) {
  .cart {
    flex-direction: column;
  }
  .endercontainer {
    width: 300px;
    margin: auto;
  }
  .prodEfrete {
    width: 366px;
    margin: auto;
    margin-bottom: 1rem;
    margin-top: 1rem;
   
  }
  .resumo {
    margin: auto;
  }
  .produto{
    flex-direction: column;
    align-items: center;
   

  }
  .Preco  {
    margin-left: 0px;
    margin-bottom: 3rem ;
    margin-top: 1rem;
  }

  
  .sedex-frete-price {
    font-size: 0.9rem;
  }
  @media screen and (max-width: 320px) {
    .prodEfrete {
      width: 305px;
    }
    .cep {
      width: 150px;
    }
  
   
  }
}
</style>
