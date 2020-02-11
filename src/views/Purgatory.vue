<template>
  <div class="purgatory">
    <t-header title="welcome to purgatory" />

    <t-search @search="findPoem($event)" />

    <!-- <div class="filter">
      <p>with a flavour:</p>
      <ul>
        <li v-for="filter in filters" :key="filter.id">
          <label :for="filter.id">{{ filter.label }}&nbsp;</label>
          <input type="checkbox" :id="filter.id" />
        </li>
      </ul>
    </div>
    <hr /> -->

    <!-- <v-btn text @click="getRandomPoem"
      >I feel lucky
      <v-icon right>mdi-dice-3</v-icon>
    </v-btn>
    <v-btn text v-show="luckyEnabled" @click="showAll">full list, please</v-btn>
    <hr /> -->
    <t-list :poems="randomPoems || filteredPoems" />
  </div>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component';
import { Vue, Component } from 'vue-property-decorator';
import MapVuex from '../customDecorators';
import { mapGetters } from 'vuex';
import { searchMixin } from '../utils';
import THeader from '../components/Header.vue';
import TSearch from '../components/Search.vue';
import TList from '../components/List.vue';

@Component({
  name: 'Purgatory',
  components: {
    THeader,
    TSearch,
    TList
  }
})
export default class Purgatory extends mixins(searchMixin) {
  @MapVuex(mapGetters, 'poems', ['pendingPoems'])
  filters = [
    { id: 'short', label: 'short ones' },
    { id: 'sonnet', label: 'gimme sonnets' },
    { id: 'shakespeare', label: 'shakespeare only' }
  ];
  randomPoems: object[] | null = null;
  luckyEnabled: boolean = false;

  created() {
    this.$store.dispatch('poems/getPoemsData');
    this.dataStore = 'pendingPoems';
  }

  getRandomPoem() {
    this.randomPoems = [
      this.filteredPoems[Math.floor(Math.random() * this.filteredPoems.length)]
    ];
    this.luckyEnabled = true;
  }

  showAll() {
    this.randomPoems = null;
    this.luckyEnabled = false;
  }
}
</script>

<style lang="scss" scoped></style>
