import Vue from "vue";
import Vuex from "vuex";
import { getFetchUsers } from "@/api/api.js";
import usersFromFile from "@/api/users.json";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    BASE_URL: "URL",
    users: [],
    filteredUsers: [],
    filters: [
      {
        name: "country",
        options: ["all", "russia", "usa"],
        title: "Filter by country",
        active: "all",
        conditions: (user, active) => {
          return user.country === active;
        },
      },
      {
        name: "score",
        options: ["all", "> 20", "< 10"],
        active: "all",
        title: "Filter by score",
        conditions: (user, active) => {
          if (active === "> 20") {
            return user.score > 20;
          }
          if (active === "< 10") {
            return user.score < 10;
          }
        },
      },
    ],
  },
  actions: {
    async filterUsers(context) {
      
      let filteredData = [...context.state.users];

      context.state.filters.forEach((filter) => {
        if (filter.active === "all") {
          return;
        }

        filteredData = filteredData.filter((user) =>
          filter.conditions(user, filter.active)
        );
      });

      context.commit("setFilteredUsers", filteredData);
    },
    changeFilter(context, { name, value }) {
      context.commit("setFilter", { name, value });
      context.dispatch("filterUsers");
    },
    // action для асинхронной загрузки users по адресу BASE_URL: "URL" с обработкой ошибок, если они возникнут тогда загружаем данные из файла users.json
    async loadUsers(context) {
      try {
        await getFetchUsers(context.store.BASE_URL)
        .then(data => context.store.users = data);
      } catch (error) {
        console.log(error);
        context.state.users = usersFromFile;
      }
    },
  },
  mutations: {
    setFilteredUsers(state, filteredData) {
      // Мутация для изменения состояния с отфильтрованными данными
      state.filteredUsers = filteredData;
    },
    // Мутация для изменения состояния фильтра
    setFilter(state, { name, value }) {

      state.filters.forEach((filter) => {
        if (filter.name === name) {
          filter.active = value;
        }
      }
      );
    },
  },
  getters: {
    // Геттер для получения отфильтрованных данных
    getFilteredUsers(state) {
      return state.filteredUsers;
    },
    // Геттер для получения фильтров
    getFilters(state) {
      return state.filters;
    }
  },
});

export default store;
