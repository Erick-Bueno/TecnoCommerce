<template>
  <form action="">
    <div><input v-model="Nome" type="text" /></div>
    <div><input v-model="Email" type="text" /></div>
    <div><input v-model="Senha" type="text" /></div>
    <div><input v-model="Cpf" type="text" /></div>
    <div><input v-model="Telefone" type="text" /></div>
    <div><button @click="cadastro">Cadastrar</button></div>
  </form>
</template>

<script>
import axios from "axios";
export default {
  name: "formularioCadastro",
  data() {
    return {
      Nome: "",
      Email: "",
      Senha: "",
      Cpf: "",
      Telefone: "",
    };
  },
  methods: {
    async cadastro(e) {
      e.preventDefault();
      const dado = await axios.post("http://localhost:8055/register", {
        Nome: this.Nome,
        Email: this.Email,
        Senha: this.Senha,
        cpf: this.Cpf,
        Telefone: this.Telefone,
      });
      console.log(dado.data.msg);
      if (dado.data.msg.status == 200) {
        this.$store.commit("setid", dado.data.msg.id);
        this.$store.commit("setToken", dado.data.msg.token);
        this.$store.commit("setNome", dado.data.msg.Nome);
        this.$router.push("/");
      }
      if (dado.data.msg.status == 404) {
        console.log(dado.data.msg.erro);
      }
    },
  },
};
</script>

<style scoped></style>
