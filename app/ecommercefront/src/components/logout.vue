<template>
  <section>
    <h2 class="logue">Logue pra continuar navegando</h2>
    <div class="butto-logar">
      <router-link to="/login"><button class="log">Logar</button></router-link>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
.logue {
  margin-top: 220px;
  text-align: center;
  font-weight: bolder;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 35px;
  color: rgb(6, 57, 70);
}
.butto-logar {
  text-align: center;
  margin-bottom: 20px;
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
</style>
