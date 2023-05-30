<template>
  <section v-show="!logadoOrn">
    <h1 class="titulo">Cadastrar novo endereço</h1>
    <form class="container1 center">
      <mensagemErro
        v-show="MensagemError"
        :mensagem="mensagemErro"
      ></mensagemErro>
      <mensagemSucesso
        v-show="MensagemSucess"
        :mensagem="mensagem"
      ></mensagemSucesso>
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
    <button @click="cadastrarEnder()" class="save">SALVAR</button>
  </section>

  <logout v-show="logadoOrn"></logout>
</template>

<script>
import axios from "axios";
import logout from "@/components/logout.vue";
import mensagemErro from "@/components/mensagemErro.vue";
import mensagemSucesso from "@/components/mensagemSucesso.vue";
export default {
  data() {
    return {
      Nome: "",
      Cep: "",
      endereco: "",
      bairro: "",
      Numero: null,
      cidade: "",
      mensagemErro: "",
      mensagem: "",
      MensagemError: false,
      MensagemSucess: false,
    };
  },
  components: { logout, mensagemErro, mensagemSucesso },
  computed: {
    logadoOrn() {
      return this.$store.state.user.jwt == null;
    },
  },

  methods: {
    async cep(e) {
      var c = e.target.value.replace(/\D/g, "");
      c = c.replace(/(\d{5})(\d)/, "$1-$2");
      c = c.replace(/(-\d{3})\d+?$/, "$1");
      e.target.value = c;

      const dado = await axios.get(
        `https://cep.awesomeapi.com.br/json/${this.Cep}`
      );

      this.endereco = dado.data.address;
      this.cidade = dado.data.city;
      this.bairro = dado.data.district;
    },
    async cadastrarEnder() {
      const dados = await axios.post(
        `http://localhost:8055/address/add/${this.$store.state.user.id}`,
        {
          Nome: this.Nome,
          Cep: this.Cep,
          Numero: this.Numero,
          Bairro: this.bairro,
          Rua: this.endereco,
          Cidade: this.cidade,
        }
      );
      console.log(dados.data);
      if (dados.data.status == 200) {
        this.mensagem = dados.data.msg;
        this.MensagemSucess = true;
        setTimeout(() => {
          this.MensagemSucess = false;
        }, 2000);
        (this.Nome = ""),
          (this.Cep = ""),
          (this.Numero = ""),
          (this.bairro = ""),
          (this.endereco = ""),
          (this.cidade = "");
        return;
      }
      if (dados.data.status == 405) {
        this.mensagemErro = dados.data.msg;
        this.MensagemError = true;
        setTimeout(() => {
          this.MensagemError = false;
        }, 2000);
        return;
      }
    },
  },
};
</script>

<style scoped>
.center {
  justify-content: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 80px;
}
.container1 {
  display: flex;
  flex-direction: column;
  background-color: white;
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
  background-color: rgb(6, 48, 58);
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
  background-color: rgb(221, 214, 214);
  font-size: 35px;
}
</style>
