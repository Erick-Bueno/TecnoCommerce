<template>
  <h1 class="title-orders">Pedidos</h1>
  <section>
    <ul>
      <li v-for="order in orders">
        <router-link :to="`/pedidos/${order.orderNumber}`">
            <div class="card-order">
                {{ order.orderNumber }}
                <span>{{ formatData(order.date) }}</span>
            </div>
        </router-link>
      </li>
    </ul>
  </section>
</template>
<script>
import axios from "axios";
import moment from "moment";

export default {
  data() {
    return {
      orders: [],
    };
  },
  mounted() {
    this.listOrders();
  },
  methods: {
    async listOrders() {
      const listOrders = await axios.get(
        `http://localhost:8055/order/${this.$store.state.user.id}`
      );
      this.orders = listOrders.data;
    },
    formatData(data) {
      return moment(data).format("DD/MM/YYYY HH:mm:ss");
    },
  },
};
</script>

<style scoped>
.title-orders {
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  color: rgb(9, 150, 185);
  margin-top: 230px;
}
a {
  text-decoration: none;
  color: white;
}
.card-order {
  background-color: rgb(9, 150, 185);
  padding: 1.5rem;
  margin: 1rem;
  list-style: none;
  border: 2px solid black;
  display: flex;
  justify-content: space-between;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bolder;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}
.card-order:hover {
  transform: scale(101%);
}
</style>
