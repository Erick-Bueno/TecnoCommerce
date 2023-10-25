<template>
  <section>
    <section v-if="produtos.length == 0" class="notProduct">
      <h1>Nenhum Produto Encontrado</h1>
    </section>
    <section v-if="produtos.length > 0" class="page-products-container">
      <div class="card-container" v-for="produto in produtos">
        <img
          class="fav"
          @click="Preencherfav(produto.id)"
          src="/images/favorito.png"
          alt=""
        />
        <img
          src="/images/favoritoPre.png"
          @click="Preencherfav(produto.id)"
          class="favPre"
          :class="{
            mostrarFavPre: produto.fav.find(
              (p) => p.id_user == this.$store.state.user.id
            ),
          }"
          alt=""
        />

        <img
          class="prod"
          :src="`http://localhost:8055/${produto.img}`"
          alt=""
        />
        <p class="productName">{{ produto.NomeProduto }}</p>
        <p v-if="parseFloat(produto.promovalor) != 0" class="preco-antigo">
          {{ produto.preco }}
        </p>

        <p
          class="preco"
          :class="{
            margenDeProdutosSemPromo: parseFloat(produto.promovalor) == 0,
          }"
          v-if="produto.promovalor != 0"
        >
          {{ produto.promovalor }}
        </p>
        <p class="preco margenDeProdutosSemPromo" v-else>{{ produto.preco }}</p>
        <router-link :to="{ name: 'produto', params: { id: produto.id } }"
          ><button class="add-to-cart">
            ADICIONAR AO CARRINHO
          </button></router-link
        >
      </div>
    </section>
  </section>
  <article v-show="produtos.length > 0" ref="Container" class="page-container-btn" :class="{wid}">
    <button
      @click="page(c)"
      class="page-btn"
      ref="buttonContainer"
      v-for="c in countPages"
      :class="{ active: c == currentPage }"
    >
      {{ c }}
    </button>
  </article>
</template>

<script>
import axios from "axios";

export default {
  name: "paginacao",
  data() {
    return {
      currentPage: this.$route.query.page,
      produto: this.$route.query.produto,
      countPages: 0,
      produtos: [],
    };
  },
  mounted() {
    this.findPagesTot();
    this.findProducts();
    this.centerButton()
  },
  updated() {
    this.centerButton()
  },
  watch: {
    "$route.query.page"(newPage) {
      this.currentPage = newPage;
      this.findPagesTot();
      this.findProducts();
      this.scrolltop();

    },
    "$route.query.produto"(newProduto) {
      this.produto = newProduto;
      this.findPagesTot();
      this.findProducts();
      this.scrolltop();

    },
  },
  methods: {
    async findPagesTot() {
      const res = await axios.get(
        `http://localhost:8055/products/${this.produto}`
      );
      this.countPages = res.data;
    },
    page(page) {
      this.centerButton()
      this.$router.push({
        path: "/produtos",
        query: { page: page, produto: this.produto },
      });
    },
    async findProducts() {
      const res = await axios.post("http://localhost:8055/pagination", {
        currentPage: this.currentPage,
        productName: this.produto,
      });

      this.produtos = res.data;
      console.log(this.produtos.length);
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
        const product = this.produtos.find((p) => p.id == productid);
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
    scrolltop() {
       scrollTo(0, 0);
    },
    centerButton() {
      const container = this.$refs.Container;
      const selectedButton = container.querySelector('.page-btn.active');

      if (selectedButton) {
        const containerRect = container.getBoundingClientRect();
        const selectedButtonRect = selectedButton.getBoundingClientRect();
        const scrollOffset = selectedButtonRect.left - containerRect.left - (containerRect.width - selectedButtonRect.width) / 2;
        container.scrollLeft += scrollOffset;
      }
      
    },
  },
};
</script>

<style scoped>
.page-btn {
  padding: 0.5rem;
  width: 30px;
  font-size: 0.5rem;
  background-color: rgb(13, 202, 186);
  color: white;
  border: 2px solid rgba(0, 0, 0, 0.474);
  margin: 0.5rem;
  cursor: pointer;
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
.notProduct {
  color: rgb(7, 128, 158);
  font-size: 2rem;
  font-weight: bolder;
  padding: 4rem;
  margin-left: auto;
  margin-right: auto;
}

.mostrarFavPre {
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
.favPre.mostrarFavPre {
  display: block;
}
.fav:hover {
  filter: brightness(50%);
}
.card-container:hover .fav {
  display: block;
}
.margenDeProdutosSemPromo {
  margin-top: 22px;
}
.page-btn:hover {
  background-color: rgb(15, 127, 117);
}
.preco {
  color: black;
  transition: 0.2s ease-out;
  padding-left: 12px;
  padding-top: -5px;
}
.active {
  background-color: rgb(15, 127, 117);
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
.card-container:hover {
  -webkit-box-shadow: -1px 1px 27px 3px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -1px 1px 27px 3px rgba(0, 0, 0, 0.75);
  box-shadow: -1px 1px 27px 3px rgba(0, 0, 0, 0.75);
}
.card-container {
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
.card-container:hover .preco-antigo {
  opacity: 1;
  padding-bottom: 5px;
}

.prod {
  width: 228px;
  height: 210px;
  border-bottom: 1px solid rgb(109, 105, 105);
  margin-bottom: 10px;
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
.page-products-container {
  margin-top: 20px;
  margin-left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.card-container:hover .add-to-cart {
  display: block;
  -webkit-box-shadow: -1px 13px 27px 3px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -1px 13px 27px 3px rgba(0, 0, 0, 0.75);
  box-shadow: -1px 13px 27px 3px rgba(0, 0, 0, 0.75);
}
.notProduct h1 {
  text-align: center;
}
.page-container-btn {
  width: 120px;

  display: flex;
  overflow-x: hidden;

  
 
}
</style>
