<template>
  <section class="container-form" v-show="logadoorN">
    <form class="container1 center">
      <h1 class="titulo">Editar endereço</h1>
      <mensagemSucesso
        v-show="mostrarmsgSucess"
        :mensagem="mensagemSucess"
      ></mensagemSucesso>
      <mensagemErro
        v-show="mostrarmsgError"
        :mensagem="mensagemError"
      ></mensagemErro>
      <section class="container2">
        <div class="container1">
          <Label>Nome</Label
          ><input v-model="Nome" class="inp" required type="text" />
        </div>
        <div class="container1">
          <label>Cep</label
          ><input @keyup="cep" v-model="Cep" class="inp" required type="text" />
        </div>
        <div class="container1">
          <label>Endereço</label
          ><input class="inp" v-model="endereco" required type="text" />
        </div>
      </section>
      <section class="container2">
        <div class="container1">
          <label>Número</label
          ><input v-model="Numero" class="inp" required type="text" />
        </div>
        <div class="container1">
          <label>Bairro</label
          ><input v-model="bairro" class="inp" required type="text" />
        </div>
        <div class="container1">
          <label>Cidade</label
          ><input v-model="cidade" class="inp" required type="text" />
        </div>
      </section>
    </form>
    <button @click="atualizarEnder()" class="save">ATUALIZAR</button>
  </section>
  <logout v-show="!logadoorN"></logout>
</template>
<script>
import axios from "axios";
import mensagemSucesso from "@/components/mensagemSucesso.vue";
import mensagemErro from "@/components/mensagemErro.vue";
import jwtDecode from "jwt-decode";
import { authenticaded } from "../authcomponents";
import logout from "@/components/logout.vue";
export default {
  data() {
    return {
      Nome: "",
      Cep: "",
      endereco: "",
      bairro: "",
      Numero: null,
      cidade: "",
      id_ender: this.$route.params.id,
      mostrarmsgSucess: false,
      mostrarmsgError: false,
      mensagemSucess: "",
      mensagemError: "",
    };
  },
  components: { mensagemSucesso, mensagemErro, logout },
  mounted() {
    authenticaded();
    this.pegardados();
  },
  computed: {
    logadoorN() {
      return this.$store.state.user.jwt != null;
    },
  },

  methods: {
    async pegardados() {
      const req = await axios.get(
        `http://localhost:8055/address/${this.id_ender}`
      );

      this.bairro = req.data.Bairro;
      this.endereco = req.data.Rua;
      this.Numero = req.data.Numero;
      this.cidade = req.data.Cidade;
      this.Cep = req.data.Cep;
      this.Nome = req.data.Nome;
    },
    async atualizarEnder() {
      const req = await axios.put(
        `http://localhost:8055/address/${this.id_ender}`,
        {
          Nome: this.Nome,
          Cep: this.Cep,
          Numero: this.Numero,
          Bairro: this.bairro,
          Rua: this.endereco,
          Cidade: this.cidade,
        }
      );
      console.log(req.data);
      if (req.data.status == 200) {
        this.mensagemSucess = req.data.msg;
        this.mostrarmsgSucess = true;
        setTimeout(() => {
          this.mostrarmsgSucess = false;
        }, 2000);
      }
      if (req.data.status == 405) {
        this.mensagemError = req.data.msg;
        this.mostrarmsgError = true;
        setTimeout(() => {
          this.mostrarmsgError = false;
        }, 2000);
      }
    },
  },
};
</script>
<style scoped>
.center {
  justify-content: center;
  align-items: center;
  padding-top: 50px;
  padding-bottom: 70px;
}
.container-form {
  position: relative;
}
.container1 {
  display: flex;
  flex-direction: column;
  background-color: white;
  position: relative;
}
.inp {
  border: none;
  border-bottom: 1px solid black;
  width: 300px;
  margin-right: 20px;
  outline: none;
  padding-left: 5px;
  padding-bottom: 5px;
}
.inp:focus {
  border-bottom: 1px solid rgb(7, 103, 128);
}
.inp:valid {
  border-bottom: 1px solid rgb(7, 103, 128);
}
.container1 input {
  margin-left: 20px;
  width: 250px;
}
.container1 label {
  margin-left: 20px;
}
label {
  font-family: "Courier New", Courier, monospace;
  color: rgb(87, 77, 77);
  margin-bottom: 20px;
  margin-top: 20px;
}
.container2 {
  display: flex;
  flex-direction: row;
}
.titulo {
  text-align: center;
  padding-top: 50px;
  padding-bottom: 50px;
  font-family: Arial, Helvetica, sans-serif;

  font-size: 35px;
}
.save {
  position: absolute;
  right: 15px;
  width: 400px;
  padding: 10px;
  background-color: rgb(7, 103, 128);
  border: none;
  color: white;
  font-weight: bolder;
  cursor: pointer;
  margin-top: -50px;
}
.save:hover {
  background-color: rgb(7, 70, 86);
}
</style>
