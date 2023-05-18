<template>
  <v-card max-width="450" class="mx-auto">
    <v-list three-line v-if="users.length > 0">
      <v-subheader>List</v-subheader>
      <transition-group name="list" tag="div">
        <template v-for="(item, index) in users">
          <v-list-item v-if="true" :key="item.title">
            <v-list-item-avatar @click="openDialog(item.adress)">
              <v-img :src="item.avatar"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="item.title"></v-list-item-title>
              <v-list-item-subtitle
                v-html="item.subtitle"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider
            v-if="users.length > 1 && index < users.length - 1"
            :key="index"
            inset
          ></v-divider>
        </template>
      </transition-group>
    </v-list>
    <v-subheader v-else>No filtered data.</v-subheader>
  </v-card>
</template>

<script>
export default {
  name: "UsersBlock",
  props: {
    users: {
      type: Array,
      required: true,
    },
    dialog: {
      type: Boolean,
      required: false,
    },
  },
  methods: {
    openDialog(adress) {
      this.$emit("openDialog", adress);
    },
  },
};
</script>

<style>
.list-enter,
.list-leave-to {
  opacity: 0;
}
.list-enter-active,
.list-leave-active {
  transition: opacity 0.5s ease-in;
}
.list-move {
  transition: transform 0.5s ease-out;
}
</style>
