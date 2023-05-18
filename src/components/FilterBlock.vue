<template>
  <div class="filter">
    <v-select
      v-model="value"
      :items="filter.options"
      :label="filter.title"
      :clearable="value === 'all' ? false : true"
    ></v-select>
  </div>
</template>

<script>
export default {
  name: "FilterBlock",
  props: {
    filter: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    value: "",
  }),
  mounted() {
    this.value = this.filter.active;
  },
  watch: {
    value() {
      this.value === null ? (this.value = "all") : this.value;
      this.$emit("changeFilter", {
        name: this.filter.name,
        value: this.value,
      });
    },
  },
};
</script>
