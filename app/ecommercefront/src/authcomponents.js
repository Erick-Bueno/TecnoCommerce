import store from "./store";
import router from "./router";
import jwtDecode from "jwt-decode";

export function authenticaded() {
  if (store.state.user.jwt != null) {
    try {
      if (jwtDecode(store.state.user.jwt).exp < Date.now() / 1000) {
        router.push("/login");
      }
    } catch (error) {
      router.push("/login");
    }
    return;
  }
  router.push("/login");
}
