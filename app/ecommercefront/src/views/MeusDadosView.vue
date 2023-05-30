<template>
  <section class="overlay2" v-show="mostrarPop">
    <section class="popup">
      <div class="fundo">
        <img class="alert" src="/images/alert.png" alt="" />
      </div>
      <p class="title">Excluir Conta</p>
      <p class="conteudo2">
        Voce tem certeza que deseja excluir esta <br />
        conta?
      </p>
      <p class="botoes">
        <button class="confirmar" @click="confirmar()">Confirmar</button
        ><button class="cancel" @click="cancelar()">Cancelar</button>
      </p>
    </section>
  </section>
  <section class="conta" v-show="logadinhoo">
    <h1 class="titulo">MEUS DADOS - CONTA PESSOAL</h1>

    <section class="formulario">
      <mensagemSucesso v-show="mostarMsg" :mensagem="msg"></mensagemSucesso>
      <mensagemErro v-show="mostarMsgError" :mensagem="msgErro"></mensagemErro>
      <form action="" class="forms">
        <div class="div1">
          <div class="div2">
            <Label>Nome Completo</Label>
            <input
              v-model="Nome"
              class="inp"
              required
              type="text"
              placeholder="Ex: Jõao da silva"
            />
          </div>
          <div class="div2">
            <label for="">CPF</label
            ><input
              disabled
              required
              v-model="cpf"
              @keyup="formatarCPF"
              class="inp"
              type="text"
            />
          </div>
        </div>
        <div class="div1">
          <div class="div2">
            <label for="">Email</label>
            <input disabled v-model="email" required class="inp" type="text" />
          </div>

          <div class="div2">
            <Label>Telefone</Label
            ><input
              v-model="telefone"
              @keyup="formatarTelefone"
              placeholder="Ex: (11)1111-1111"
              class="inp"
              required
            />
          </div>
        </div>
      </form>
      <button @click="excluir_acc()" class="excluir-cont">
        Excluir minha conta
      </button>
    </section>
    <button class="save" @click="atualizarDados()">SALVAR</button>
  </section>
  <logout v-show="!logadinhoo"></logout>
</template>
<script>
import mensagemSucesso from "@/components/mensagemSucesso.vue";
import mensagemErro from "../components/mensagemErro.vue";
import axios from "axios";
import logout from "@/components/logout.vue";
import jwtDecode from "jwt-decode";
import { authenticaded } from "../authcomponents";
export default {
  data() {
    return {
      logado: true,
      cpf: "",
      email: "",
      telefone: "",
      Nome: "",
      msg: "",
      msgErro: "",
      mostrarPop: false,
      mostarMsg: false,
      mostarMsgError: false,
    };
  },
  components: { logout, mensagemSucesso, mensagemErro },

  computed: {
    logadinhoo() {
      return this.$store.state.user.jwt != null;
    },
  },
  mounted() {
    authenticaded();
    this.getdata();
  },
  methods: {
    formatarCPF(e) {
      var v = e.target.value.replace(/\D/g, "");

      v = v.replace(/(\d{3})(\d)/, "$1.$2");

      v = v.replace(/(\d{3})(\d)/, "$1.$2");

      v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

      e.target.value = v;
    },
    formatarTelefone(e) {
      var v = e.target.value.replace(/\D/g, "");

      v = v.replace(/^(\d\d)(\d)/g, "($1)$2");

      v = v.replace(/(\d{5})(\d)/, "$1-$2");

      e.target.value = v;
    },
    formatandoCpfChegando(cpf) {
      var cpfff = this.cpf.replace(/\D/g, "");
      cpfff = cpfff.replace(/(\d{3})(\d)/, "$1.$2");
      cpfff = cpfff.replace(/(\d{3})(\d)/, "$1.$2");
      cpfff = cpfff.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      var value = cpfff;
      this.cpf = value;
    },
    formantandoTelefoneChegando(telefone) {
      var telefone = telefone.replace(/\D/g, "");

      telefone = telefone.replace(/^(\d\d)(\d)/g, "($1)$2");

      telefone = telefone.replace(/(\d{5})(\d)/, "$1-$2");

      var value = telefone;
      this.telefone = value;
    },
    async getdata() {
      const dados = await axios.get(
        `http://localhost:8055/user/${this.$store.state.user.id}`
      );

      this.cpf = dados.data.userFoundOrNot.dado.cpf;
      this.email = dados.data.userFoundOrNot.dado.Email;
      this.Nome = dados.data.userFoundOrNot.dado.Nome;
      this.$store.commit("setNome", dados.data.userFoundOrNot.dado.Nome);
      this.telefone = dados.data.userFoundOrNot.dado.Telefone;
      this.formatandoCpfChegando(this.cpf);
      this.formantandoTelefoneChegando(this.telefone);
    },
    async atualizarDados() {
      const data = await axios.put(
        `http://localhost:8055/profile/${this.$store.state.user.id}`,
        {
          Nome: this.Nome,
          Telefone: this.telefone,
        }
      );

      if (data.data.updatedUser.status == 200) {
        this.msg = data.data.updatedUser.msg;
        this.mostarMsg = true;
        setTimeout(() => {
          this.mostarMsg = false;
        }, 2000);
        this.getdata();
        return;
      }

      if (data.data.updatedUser.status == 405) {
        this.msgErro = data.data.updatedUser.msg;
        this.mostarMsgError = true;
        setTimeout(() => {
          this.mostarMsgError = false;
        }, 2000);
      }
    },
    excluir_acc() {
      this.mostrarPop = true;
    },
    cancelar() {
      this.mostrarPop = false;
    },
    async confirmar() {
      console.log(this.email);
      const dado = await axios.delete(
        `http://localhost:8055/user/${this.$store.state.user.id}`,
        {
          data: {
            Email: this.email,
          },
        }
      );
      this.$store.commit("setid", null);
      this.$store.commit("setToken", null);
      this.$store.commit("setNome", null);
      this.mostrarPop = false;

      console.log(dado);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Anton&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Fjalla+One&display=swap");

.conta {
  background-color: rgb(211, 209, 209);
  padding-bottom: 80px;
  position: relative;
}
.fundo {
  background-color: red;
  text-align: center;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
}
.title {
  text-align: center;
  margin-top: 20px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bolder;
  color: red;
  font-size: 20px;
}
.confirmar {
  padding: 14px;
  background-color: red;
  color: white;
  font-weight: bolder;
  border-radius: 5px;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
  transition: 0.5s;
  border: none;
  width: 150px;
}
.confirmar:hover {
  background-color: rgb(136, 22, 22);
}
.overlay2 {
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.562);
  position: fixed;
  top: 0;
  z-index: 3000;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(6px);
}
.popup {
  height: 280px;
  width: 400px;
  background-color: white;
  z-index: 3001;
  position: absolute;
  box-shadow: 10px 15px 31px -5px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 10px 15px 31px -5px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 15px 31px -5px rgba(0, 0, 0, 0.75);

  border-radius: 15px;
}
.conteudo2 {
  text-align: center;
  margin-top: 20px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px;
  font-weight: bolder;
}
.botoes {
  margin-top: 30px;
  text-align: center;
}
.botoes button {
  margin-right: 20px;
  margin-left: 20px;
}
.cancel {
  background: transparent;
  color: black;
  padding: 14px;
  font-weight: bolder;
  font-family: Arial, Helvetica, sans-serif;
  transition: 0.5s;
  cursor: pointer;
  width: 150px;
  border-radius: 5px;
}
.cancel:hover {
  background-color: black;
  color: white;
}
.log {
  margin-top: 60px;
  width: 200px;
  padding: 15px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bolder;
  font-size: 20px;
  color: white;
  background-color: rgb(7, 103, 128);
  border-radius: 5px;
  border: none;
  transition: 0.5s;
  cursor: pointer;
}
.log:hover {
  background-color: rgb(6, 57, 70);
}
.butto-logar {
  text-align: center;
}
.logue {
  margin-top: 220px;
  text-align: center;
  font-weight: bolder;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 35px;
  color: rgb(6, 57, 70);
}
.titulo {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bolder;
  color: rgb(46, 42, 42);
  font-size: 35px;
  margin-top: 220px;
  padding-top: 20px;
  padding-left: 20px;
  padding-bottom: 20px;
}
.save {
  margin-top: 40px;
  margin-bottom: 20px;
  padding: 20px;
  width: 400px;
  background-color: rgb(7, 103, 128);
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bolder;
  font-family: Arial, Helvetica, sans-serif;
  margin-right: 20px;
  cursor: pointer;
  transition: 0.5s;

  position: absolute;
  right: -10px;
  z-index: 1;
  bottom: -10px;
}
.save:hover {
  background-color: rgb(6, 48, 58);
}
.div2 {
  display: flex;
  flex-direction: column;
}
.excluir-cont {
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: rgb(7, 103, 128);
  bottom: 90px;
}

.div1 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 30px;
}
.formulario {
  background-color: white;
  padding-bottom: 80px;
  padding-top: 20px;
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
label {
  font-family: "Courier New", Courier, monospace;
  color: rgb(87, 77, 77);
  margin-bottom: 20px;
}
</style>
