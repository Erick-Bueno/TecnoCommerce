<template>
  <h1 class="order-title">Detalhes do pedido</h1>
  <section class="container-data-order">
    <p>Código:{{ codigo }}</p>
    <p>Data: {{ data }}</p>
    <p>Valor Total: {{ orderTotValue }}</p>
  </section>
  <section>
    <h1 class="order-title">Produtos</h1>
    <section class="container-order-products" v-for="product in products">
      <img
        class="product-order-image"
        :src="`http://localhost:8055/${product.img}`"
        alt=""
      />
      <p class="productname">{{ product.name }}</p>
      <p>{{ product.preco }}</p>
      <p>{{ product.quantity }}</p>
    </section>
  </section>
</template>
<script>
import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
      orderCode: this.$route.params.id,
      codigo: null,
      data: null,
      orderTotValue: null,
      products: [],
    };
  },
  methods: {
    async listOrderProducts() {
      const res = await axios.get(
        `http://localhost:8055/orderproducts/${this.orderCode}`
      );

      this.codigo = res.data[0].orderNumber;

      this.data = this.convertData(res.data[0].date);
      this.orderTotValue = res.data[0].valorTotal;
      this.products = res.data[0].produto;
      console.log(res.data[0]);
    },
    convertData(data) {
      return moment(data).format("DD/MM/YYYY");
    },
  },
  mounted() {
    this.listOrderProducts();
  },
};
</script>
<style scoped>
.order-title {
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  color: rgb(9, 150, 185);
  margin-top: 230px;
}
.container-data-order {
  font-weight: bolder;
  margin-top: 3rem;
  margin-left: 3rem;
}
.productname {
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
}
.product-order-image {
  width: 150px;
}
.container-order-products {
  display: flex;
  margin: 3rem;
  padding: 1rem;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(9, 150, 185);
  font-weight: bolder;
  font-size: 1.5rem;
  gap: 30px;
  border-radius: 10px;
  color: white;
}
</style>
