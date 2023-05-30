<template>
  <footer>
    <section class="listas">
      <section>
        <ul>
          <li class="titulo">Cliente</li>
          <li class="lii">Minha Conta</li>
          <li class="lii">Meus Pedidos</li>
          <li class="lii">Minhas Avaliações</li>
        </ul>
      </section>
      <section>
        <ul>
          <li class="titulo">Ajuda</li>
          <li class="lii">Fale conosco</li>
        </ul>
      </section>
      <section>
        <p class="titulo">Sobre Mim</p>
        <p class="liii">
          Entusiasta do desenvolvimento, <br />
          que ama fazer projetos novos e busca um emprego :).
        </p>
      </section>
    </section>
    <section class="conts">
      <p class="sociais">Sociais</p>
      <section class="imagenss">
        <img class="imggg" src="/images/gitub.png" alt="" /><img
          class="imggg"
          src="/images/link.png"
          alt=""
        />
      </section>
    </section>
    <p class="por">
      Projeto Desenvolvido por Erick Bueno &copy; {{ data.getFullYear() }}
    </p>
  </footer>
</template>

<script>
export default {
  name: "footer",
  data() {
    return {
      data: new Date(),
    };
  },
};
</script>
<style scoped>
.conts {
  background-color: rgb(14, 78, 121);
  margin-right: 20px;
  width: 100%;
}
.imggg {
  width: 40px;
  margin: 10px;

  cursor: pointer;
  transition: 0.5s;
}
.imggg:hover {
  opacity: 0.5;
}
.por {
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bolder;
  color: white;
  padding-bottom: 20px;
  padding-top: 20px;
}

.imggg:hover {
}
.imagenss {
  text-align: center;
}
.borda {
  border-top: 3px solid rgb(3, 21, 26);

  margin-bottom: 20px;
}
footer {
  padding-top: 40px;
  background-color: rgb(9, 150, 185);
  padding-top: 80px;
}
.listas {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-right: 20px;
  margin-left: 40px;
}
ul {
  list-style: none;
}
.lii {
  color: white;
  font-weight: bolder;
  font-family: Arial, Helvetica, sans-serif;
  transition: 0.5s;
  cursor: pointer;
  margin-bottom: 5px;
}
.lii:hover {
  color: rgb(194, 179, 179);
}
.liii {
  color: white;
  font-weight: bolder;
  font-family: Arial, Helvetica, sans-serif;
}
.titulo {
  color: rgb(4, 52, 65);
  font-weight: bolder;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
  margin-bottom: 12px;
}
.sociais {
  text-align: center;
  color: white;
  font-weight: bolder;
  font-family: Arial, Helvetica, sans-serif;
  padding-top: 20px;
}
</style>
