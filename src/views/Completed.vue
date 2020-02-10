<template>
  <div class="completed">
    <h1>Well done, here are your Completed</h1>

    <t-search @search="findPoem($event)" />

    <t-list :poems="filteredPoems" />
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import MapVuex from '../customDecorators';
import { mapGetters } from 'vuex';
import { searchMixin } from '../utils';
import TSearch from '../components/Search.vue';
import TList from '../components/List.vue';

@Component({
  name: 'Completed',
  components: {
    TSearch,
    TList
  }
})
export default class Completed extends mixins(searchMixin) {
  @MapVuex(mapGetters, 'poems', ['completedPoems'])
  created() {
    this.$store.dispatch('poems/getPoemsData');
    this.dataStore = 'completedPoems';
  }
}
</script>
