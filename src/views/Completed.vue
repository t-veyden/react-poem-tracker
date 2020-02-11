<template>
  <div class="completed">
    <t-header title="well done, your highness" />

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
import THeader from '../components/Header.vue';
import TSearch from '../components/Search.vue';
import TList from '../components/List.vue';

@Component({
  name: 'Completed',
  components: {
    THeader,
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
