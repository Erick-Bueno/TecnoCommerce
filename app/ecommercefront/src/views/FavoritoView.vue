<template>
  <section v-show="logadoornot">
    <h1 class="favoritos">FAVORITOS</h1>

    <div v-if="lista == 0" class="lista-vazia">
      Sua lista de favoritos está vazia.
      <router-link to="/"
        ><button class="continuar">CONTINUAR COMPRANDO</button></router-link
      >
    </div>
    <div class="card" v-for="prod in favList">
      <img
        @click="desfavoritar(prod.id)"
        class="cor"
        src="/images/favoritoPre.png"
        alt=""
      />
      <div class="containerImgName">
        <img width="137" :src="'http://localhost:8055/' + prod.img" alt="" />
        <router-link
          style="text-decoration: none"
          :to="{ name: 'produto', params: { id: prod.id } }"
        >
          <p class="ProductName">{{ prod.NomeProduto }}</p>
        </router-link>
      </div>
      <div class="precos">
        <p class="precoantigo" v-if="prod.promovalor != 0">
          {{ prod.Preco }}
        </p>
        <p class="prodpreco" v-if="prod.promovalor != 0">
          R$ {{ prod.promovalor }}
        </p>
        <p v-else class="prodpreco preco">{{ prod.Preco }}</p>
      </div>
      <div>
        <button class="buy">COMPRAR</button>
      </div>
    </div>
  </section>
  <logout v-show="!logadoornot"></logout>
</template>

<script>
import axios from "axios";
import logout from "@/components/logout.vue";
import jwtDecode from "jwt-decode";
import { authenticaded } from "../authcomponents";

export default {
  data() {
    return {
      favList: [],
    };
  },
  components: [logout],
  components: { logout },
  computed: {
    logadoornot() {
      return this.$store.state.user.jwt != null;
    },
    lista() {
      return this.favList;
    },
  },
  mounted() {
    authenticaded();
    this.ToListFav();
  },
  methods: {
    async ToListFav() {
      const res = await axios.get(
        `http://localhost:8055/productlistfavorited/${this.$store.state.user.id}`
      );

      this.favList = res.data;
    },
    async desfavoritar(id_prod) {
      const res = await axios.delete(
        `http://localhost:8055/desfavoriteProducts/${id_prod}/${this.$store.state.user.id}`
      );
      this.$store.commit("setFav", res.data);

      const indice = this.favList.findIndex((p) => p.id == id_prod);

      this.favList.splice(indice, 1);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap");
.precoantigo {
  text-decoration: line-through;
  color: rgb(127, 133, 141);
  font-size: 14, 5px;
}
.continuar {
  padding: 10px;
  font-family: "Poppins", sans-serif;
  color: white;
  background-color: rgb(9, 150, 185);
  margin-bottom: 20px;
  margin-top: 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: 0.5s;
}
.continuar:hover {
  background-color: rgb(10, 67, 82);
}
.cor {
  position: absolute;
  right: 20px;
  top: 5px;
  cursor: pointer;
}
.buy {
  padding: 10px;
  font-family: "Poppins", sans-serif;
  background-color: rgb(9, 150, 185);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 40px;
  transition: 0.5s;
}
.buy:hover {
  background-color: rgb(11, 114, 139);
}
.lista-vazia {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-family: "Poppins", sans-serif;
  font-size: 25px;
  margin-top: 70px;
}
.card {
  display: flex;
  margin-bottom: 20px;
  margin-left: 20px;
  margin-right: 20px;
  box-shadow: rgb(40 41 61 / 8%) 2px 2px 2px, rgb(96 97 112 / 16%) 2px 2px;
  border-radius: 5px;
  font-family: "Poppins", sans-serif;
  padding: 20px;
  position: relative;
  background-color: white;
}
.containerImgName {
  display: flex;
}
.preco {
  margin-top: 20px;
}
.ProductName {
  margin-top: 20px;
  margin-bottom: 20px;
  padding-top: 30px;
  padding-right: 20px;
  border-right: 1px solid rgba(82, 76, 76, 0.479);
  cursor: pointer;
  transition: 0.2s ease-in;
  color: black;
}

.ProductName:hover {
  color: rgb(9, 150, 185);
}
.favoritos {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bolder;
  font-size: 22px;
  margin-top: 200px;
  margin-left: 40px;
  margin-bottom: 20px;
}
.prodpreco {
  font-size: 22px;
  color: rgb(9, 150, 185);
}
.precos {
  margin-left: 40px;
  width: 300px;
  margin-top: 35px;
}
</style>
