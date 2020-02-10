<template>
  <div class="search">
    <input
      class="search__field"
      type="search"
      placeholder="find ye beauty"
      v-model="search.query"
    />
    <v-radio-group v-model="search.by" row>
      <v-radio label="by author" value="author" />
      <v-radio label="by title" value="title" />
    </v-radio-group>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';

@Component({
  name: 'Search'
})
export default class Search extends Vue {
  search = {
    query: '',
    by: 'title'
  };
  _timerId: number = 0;

  @Watch('search', { deep: true })
  handler() {
    clearTimeout(this._timerId);

    this._timerId = window.setTimeout(() => {
      this.$emit('search', {
        query: this.search.query,
        searchBy: this.search.by
      });
    }, 300);
  }
}
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;

  &__field {
    z-index: 1;
    flex-grow: 1;
  }
}
</style>
