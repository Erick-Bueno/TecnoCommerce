import axios from "axios";
import store from "./store";

export default async (to, from, next) => {
  const jwt = store.state.user.jwt;

  if (jwt) {
    const validjwt = await axios.post("http://localhost:8055/jwt/verify", {
      jwt: jwt,
    });
    jwt.decode;

    if (validjwt.data.valid) {
      next();
      return;
    }

    this.$store.commit("setid", null);
    this.$store.commit("setToken", null);
    this.$store.commit("setNome", null);
    this.$store.commit("setFav", null);
    next("/login");
  } else {
    this.$store.commit("setid", null);
    this.$store.commit("setToken", null);
    this.$store.commit("setNome", null);
    this.$store.commit("setFav", null);
    next("/login");
  }
};
