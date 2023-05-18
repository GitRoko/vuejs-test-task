<template>
  <v-dialog :value="dialog" max-width="290">
    <v-card>
      <v-card-title class="headline">Adress</v-card-title>
      <v-card-text>
        {{ adress }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="green darken-1" text @click="$emit('closeDialog')">
          Ok
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AdressDialog",
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    adress: {
      type: String,
      required: true,
    },
  },
};
</script>
