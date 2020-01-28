<template>
  <div class="completed">
    <h1>Well done, here are your Completed</h1>

    <t-search @search="findPoem($event)" />

    <ul>
      <li class="purgatory__item" v-for="poem in filteredPoems" :key="poem.id">
        <router-link :to="`/poem/${poem.id}`">{{ poem.title }}</router-link>
        <span>&nbsp;by {{ poem.author.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import MapVuex from '../customDecorators';
import { mapGetters } from 'vuex';
import { searchMixin } from '../utils';
import TSearch from '../components/Search.vue';

@Component({
  name: 'Coompleted',
  components: {
    TSearch
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
