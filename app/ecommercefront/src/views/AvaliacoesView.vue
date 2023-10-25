<template>
  <section class="notHave" v-show="assessments.length == 0">
    <h1>Você não possui avaliações</h1>
  </section>
  <section v-show="assessments.length > 0">
    <ul>
      <li v-for="assessment in assessments">{{ assessment.Comentario }}</li>
    </ul>
    <div class="btn-container"><button class="seemore" @click="seeMore()">ver mais</button></div>
  </section>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      assessments: [],
    };
  },
  mounted() {
    this.findAssessments();
  },
  methods: {
    async findAssessments() {
      const listAssesments = await axios.get(
        `http://localhost:8055/assessment/${this.$store.state.user.id}`
      );
      this.assessments = listAssesments.data;
      console.log(this.assessments);
    },
    async seeMore() {
      let data = this.assessments[this.assessments.length - 1].Date;
      const listAssesmentsSeeMore = await axios.post(
        `http://localhost:8055/assessment/${this.$store.state.user.id}`,
        {
          data: data,
        }
      );
      console.log(listAssesmentsSeeMore.data)
      listAssesmentsSeeMore.data.forEach((element) => {
        this.assessments.push(element);
      });
    },
  },
};
</script>
<style scoped>
    ul{
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bold;
        text-align: center;
        padding: 2rem;
        list-style: none;
    }
    ul li{
        padding: 1rem;
        border-bottom: 1px solid black ;
    }
   .seemore{
    padding: 0.65rem;

  width: 300px;
  cursor: pointer;
  background-color: rgba(0, 162, 255, 0.993);
  border: none;
  color: white;
  transition: 0.2s ease-in-out;
  font-size: 1rem;
  font-weight: bolder;
  margin-bottom: 15px;

 
}
   .seemore:hover {
  background-color: rgba(14, 77, 113, 0.993);
}
.btn-container{
    text-align: center;
}
.notHave{
  padding: 2rem;
  text-align: center;
  font-size: 1.5rem;
  color: rgb(9, 150, 185);
}

</style>
