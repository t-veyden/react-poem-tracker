<template>
  <div class="purgatory">
    <h1>Welcome to Purgatory</h1>

    <t-search @search="findPoem($event)"/>
    <hr>

    <div class="filter">
      <p>with a flavour:</p>
      <ul>
        <li v-for="filter in filters" :key="filter.id">
          <label :for="filter.id">{{ filter.label }}&nbsp;</label>
          <input type="checkbox" :id="filter.id">
        </li>
      </ul>
    </div>
    <hr>

    <v-btn text @click="getRandomPoem">I feel lucky
      <v-icon right>mdi-dice-3</v-icon>
    </v-btn>
    <v-btn text v-show="luckyEnabled" @click="showAll">full list, please</v-btn>
    <hr>

    <ul>
      <li class="purgatory__item" v-for="poem in filteredPoems" :key="poem.id">
        <router-link :to="`/poem/${poem.id}`">{{ poem.title }}</router-link>
        <span>&nbsp;by {{ poem.author }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {searchMixin} from '../utils';
  import TSearch from '../components/Search';

  export default {
    name: "Purgatory",

    mixins: [
      searchMixin
    ],

    components: {
      TSearch
    },

    data() {
      return {
        filters: [
          {id: 'short', label: 'short ones'},
          {id: 'sonnet', label: 'gimme sonnets'},
          {id: 'shakespeare', label: 'shakespeare only'}
        ],
        luckyEnabled: false
      }
    },

    created() {
      this.$store.dispatch('poems/getPoemsData');
      this.dataStore = 'pendingPoems';
    },

    computed: {
      ...mapGetters('poems', ['pendingPoems'])
    },

    methods: {

      getRandomPoem() {
        this.sortedPoems = [this.pendingPoems[Math.floor(Math.random() * this.pendingPoems.length)]];
        this.luckyEnabled = true;
      },

      showAll() {
        this.sortedPoems = this.pendingPoems;
        this.luckyEnabled = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .purgatory__item {
    padding: 10px;

    &:nth-child(odd) {
      background-color: #ededed;
    }
  }
</style>
