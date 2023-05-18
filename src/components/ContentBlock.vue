<template>
  <v-container height="100vh">
    <v-row align="start" justify="center" class="ma-4">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col cols="6" md="4" height="100%">
        <div class="filters">
          <FilterBlock
            v-for="filter in filters"
            :key="filter.name"
            :filter="filter"
            @changeFilter="changeFilter"
          />
        </div>
      </v-col>

      <v-col cols="6" md="4" height="100%">
          <UsersBlock :users="users" @openDialog="showDialog" />
          <AdressDialog
            :dialog="dialog"
            :adress="adress"
            @closeDialog="dialog = false"
          />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UsersBlock from "@/components/UsersBlock.vue";
import FilterBlock from "@/components/FilterBlock.vue";
import AdressDialog from "@/components/AdressDialog.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ContentBlock",
  components: {
    UsersBlock,
    FilterBlock,
    AdressDialog,
  },
  data: () => ({
    filters: [],
    users: [],
    adress: "",
    dialog: false,
  }),
  mounted() {
    this.loadUsers();
    this.filterUsers();
    this.filters = this.getFilters;
    this.users = this.getFilteredUsers;
    this.dialog = false;
  },
  watch: {
    filters() {
      this.filterUsers();
    },
    getFilteredUsers() {
      this.users = this.getFilteredUsers;
    },
    deep: true,
  },
  computed: {
    ...mapGetters(["getFilters", "getFilteredUsers"]),
  },
  methods: {
    ...mapActions(["changeFilter", "filterUsers", "loadUsers"]),
    showDialog(adress) {
      this.adress = adress;
      this.dialog = true;
    },
  },
};
</script>

