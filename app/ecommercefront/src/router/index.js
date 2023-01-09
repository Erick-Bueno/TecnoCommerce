import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import loginView from '../views/loginView.vue'
import cadastroView from '../views/cadastroView.vue'
import carrinhoView from '../views/CarrinhoView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name:'login',
    component: loginView
  },
  {
    path:"/cadastro",
    name:'cadastro',
    component:cadastroView
  },
  {
    path:'/carrinho',
    name: 'carrinho',
    component:carrinhoView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
