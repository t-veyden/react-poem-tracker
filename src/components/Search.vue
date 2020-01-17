<template>
  <div>
    <input
      type="search"
      placeholder="find your beauty"
      v-model="search.query"
    />
    <v-radio-group v-model="search.by" row>
      <v-radio label="by author" value="author" />
      <v-radio label="by title" value="title" />
    </v-radio-group>
  </div>
</template>

<script>
export default {
  name: 'Search',

  data() {
    return {
      search: {
        query: '',
        by: 'title'
      }
    };
  },

  watch: {
    search: {
      handler() {
        clearTimeout(this._timerId);

        this._timerId = setTimeout(() => {
          this.$emit('search', {
            query: this.search.query,
            searchBy: this.search.by
          });
        }, 300);
      },
      deep: true
    }
  }
};
</script>
