<template>
  <section class="home">
    <article class="anuncio">
      <img class="img-placa" src="/images/2054.webp" alt="" />
    </article>
    <div class="containerrr">
      <section class="marcas">
        <div>
          <img src="/images/Geforce-logo.png" alt="" />
        </div>
        <div>
          <img src="/images/logo-superframe.webp" alt="" />
        </div>
        <div>
          <img src="/images/amd-logo-5.png" alt="" />
        </div>
        <div>
          <img src="/images/Asus-Logo.png" alt="" />
        </div>
        <div>
          <img src="/images/geillogo.png" alt="" />
        </div>
        <div>
          <img src="/images/intellogo.png" alt="" />
        </div>
        <div>
          <img src="/images/redragonlogo.png" alt="" />
        </div>
        <div>
          <img src="/images/adatalogo.png" alt="" />
        </div>
        <div>
          <img src="/images/Logo-XPG.png" alt="" />
        </div>
        <div>
          <img src="/images/Silverstonelogo.png" alt="" />
        </div>
        <div>
          <img src="/images/wsterndigitallogo.png" alt="" />
        </div>
        <div>
          <img src="/images/kingstonlogo.png" alt="" />
        </div>
        <div>
          <img src="/images/corsairlogo2.png" alt="" />
        </div>
        <div>
          <img src="/images/logitechlogo.png" alt="" />
        </div>
        <div>
          <img src="/images/alienwarelogo.png" alt="" />
        </div>
      </section>
    </div>
    <h4 class="mais-vendidos">Mais Vendidos</h4>
    <section class="card-container">
      <article v-for="product in products" class="card">
        <img
          class="fav"
          @click="Preencherfav(product.id)"
          src="/images/favorito.png"
          alt=""
        />
        <img
          src="/images/favoritoPre.png"
          @click="Preencherfav(product.id)"
          class="favPre"
          :class="{
            mostrarFavPre: product.fav.find(
              (p) => p.id_user == this.$store.state.user.id
            ),
          }"
          alt=""
        />

        <!-- Infos basicas do produto nome, preço e posição -->
        <img
          class="prod"
          :src="`http://localhost:8055/${product.img}`"
          alt=""
        />
        <p class="pos">{{ product.posicão }}º Mais vendido</p>
        <p class="productName">{{ product.NomeProduto }}</p>
        <!-- -------- -->

        <p v-if="parseFloat(product.promovalor) != 0" class="preco-antigo">
          {{ product.preco }}
        </p>

        <p
          class="preco"
          :class="{
            margenDeProdutosSemPromo: parseFloat(product.promovalor) == 0,
          }"
          v-if="product.promovalor != 0"
        >
          {{ product.promovalor }}
        </p>

        <p class="preco margenDeProdutosSemPromo" v-else>{{ product.Preco }}</p>

        <router-link :to="{ name: 'produto', params: { id: product.id } }"
          ><button class="add-to-cart">
            ADICIONAR AO CARRINHO
          </button></router-link
        >
      </article>
    </section>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      products: [],
      classesDinamicas: {
        mostrarFavPre: false,
      },
    };
  },
  mounted() {
    this.findProdutchBestSeller();
  },

  methods: {
    somar() {
      this.teste = this.teste + 1;
    },
    async findProdutchBestSeller() {
      const req = await axios.get("http://localhost:8055/productBestSeller");
      this.products = req.data;
      console.log(this.$store.state.user.productsFavoriteds )
    },
    async Preencherfav(productid) {
      if (this.$store.state.user.id != null) {
        const resp = await axios.post(
          "http://localhost:8055/favoriteProducts",
          {
            id_user: this.$store.state.user.id,
            id_product: productid,
          }
        );

        this.$store.commit("setFav", resp.data);
        const product = this.products.find((p) => p.id == productid);
        const fav = product.fav.find(
          (p) => p.id_user == this.$store.state.user.id
        );
        if (fav) {
          product.fav = product.fav.filter(
            (p) => p.id_user != this.$store.state.user.id
          );
        } else {
          const newfav = { id_user: this.$store.state.user.id };
          product.fav.push(newfav);
        }
      } else {
        this.$router.push("/login");
      }

      //envia o produto favorito pro backend
    },
  },
};
</script>

<style scoped>
.anuncio {
  width: 100%;
  text-align: center;
  padding-top: 70px;
}
.margenDeProdutosSemPromo {
  margin-top: 22px;
}

.mais-vendidos {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 30px;
  margin-top: 20px;
  margin-left: 20px;
}

.marcas {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.cor {
  background-color: red;
}
/* imagens do mesmo tamanho sem perder qualidade */
.marcas div img {
  width: 110px;
  height: 80px;
  object-fit: contain;
  padding-right: 40px;
  animation-name: slidermarcas;
  animation-duration: 10s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.containerrr {
  overflow: hidden;
  max-width: 1200px;
  padding-top: 40px;
  padding-bottom: 40px;

  margin: auto;
}
@keyframes slidermarcas {
  0% {
    transform: translateX(-190%);
  }
  50% {
    transform: translateX(220%);
  }
  100% {
    transform: translateX(-190%);
  }
}

.container-marcas::-webkit-scrollbar {
  display: block;
}

.fav {
  position: absolute;
  cursor: pointer;
  right: 10px;
  top: 10px;
  display: none;
  transition: 0.2s ease-in-out;
}
.favPre {
  position: absolute;
  cursor: pointer;
  right: 10px;
  top: 10px;
  display: none;
  transition: 0.2s ease-in-out;
}
.mostrarFavPre {
  display: block;
}
.card:hover .fav {
  display: block;
}
.fav:hover {
  filter: brightness(50%);
}

.preco-antigo {
  color: rgb(78, 77, 77);
  font-size: 14px;
  padding-left: 14px;
  padding-top: 0px;
  text-decoration: line-through;
  bottom: 22px;
  opacity: 0;
  transition: 0.2s ease-in-out;
}

.add-to-cart {
  width: 100%;
  padding: 10px;
  background-color: rgb(9, 150, 185);
  border: none;
  color: white;
  font-size: 12px;

  transition: 0.2s ease-in-out;
  cursor: pointer;
  display: none;
  position: absolute;
  bottom: -30px;
}
.add-to-cart:hover {
  background-color: rgb(6, 52, 63);
}

.img-placa {
  width: 95%;
}
.card-container {
  margin-top: 20px;
  margin-left: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

}
.home {
  background-color: rgb(196, 200, 204);
  padding-bottom: 20px;
}
.card {
  background-color: white;
  color: white;
  width: 228px;
  height: 380px;
  font-weight: bolder;
  font-family: Arial, Helvetica, sans-serif;
  margin: 30px;
  -webkit-transition: 0.2s ease-in-out;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.card:hover .add-to-cart {
  display: block;
  -webkit-box-shadow: -1px 13px 27px 3px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -1px 13px 27px 3px rgba(0, 0, 0, 0.75);
  box-shadow: -1px 13px 27px 3px rgba(0, 0, 0, 0.75);
}
.card:hover .preco-antigo {
  opacity: 1;
  padding-bottom: 5px;
}

.card:hover {
  -webkit-box-shadow: -1px 1px 27px 3px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -1px 1px 27px 3px rgba(0, 0, 0, 0.75);
  box-shadow: -1px 1px 27px 3px rgba(0, 0, 0, 0.75);
}

.productName {
  color: black;
  font-size: 14px;
  margin-left: 15px;
  /* limitar a 3 linhas em um container */
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  display: -webkit-box;
}
.preco {
  color: black;
  transition: 0.2s ease-out;
  padding-left: 12px;
  padding-top: -5px;
}

.pos {
  background-color: rgb(7, 103, 128);
  width: 120px;
  margin-left: 10px;
  padding: 2px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  text-align: center;
  border-radius: 2px;
}
.prod {
  width: 228px;
  height: 210px;
  border-bottom: 1px solid rgb(109, 105, 105);
  margin-bottom: 10px;
}
.productName {
  padding-top: 10px;
}

@media screen and (max-width:768px) {
    .p1{
      font-size: 0.2rem;
    }
}
@media screen and (max-width:425px) {
  .anuncio{
    padding-top: 0px;
  }
}
</style>
