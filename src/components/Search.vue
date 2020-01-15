<template>
  <div>
    <input type="search" placeholder="find your beauty" v-model="query" />
    <v-radio-group v-model="searchBy" row>
      <v-radio label="by author" value="author" />
      <v-radio label="by title" value="title" />
    </v-radio-group>
  </div>
</template>

<script>
export default {
  name: "Search",

  data() {
    return {
      searchBy: "title",
      query: ""
    };
  },

  watch: {
    query() {
      clearTimeout(this._timerId);

      this._timerId = setTimeout(() => {
        this.$emit("search", { query: this.query, searchBy: this.searchBy });
      }, 300);
    }
  }
};
</script>
