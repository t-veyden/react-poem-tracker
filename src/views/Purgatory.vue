<template>
  <div class="purgatory">
    <h1 class="page-title">welcome to purgatory</h1>

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

    <ul class="list">
      <li
        class="list__item list-item"
        v-for="poem in randomPoems || filteredPoems"
        :key="poem.id"
      >
        <router-link class="list-item__link" :to="`/poem/${poem.id}`">{{
          poem.title
        }}</router-link>
        <div class="list-item__author">
          _by_
          <router-link :to="`/authors/${poem.author.id}`">{{
            poem.author.name
          }}</router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component';
import { Vue, Component } from 'vue-property-decorator';
import MapVuex from '../customDecorators';
import { mapGetters } from 'vuex';
import { searchMixin } from '../utils';
import TSearch from '../components/Search.vue';

@Component({
  name: 'Purgatory',
  components: {
    TSearch
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

<style lang="scss" scoped>
.list {
  padding: 0;
  list-style: none;
  text-align: center;

  &__item {
    padding: 10px;

    // &:nth-child(odd) {
    //   background-color: #ededed;
    // }
  }
}

.list-item {
  display: flex;
  position: relative;

  &::before {
    content: "..";
    position: absolute;
    top: -8px;
    left: 4px;
    width: 20px;
    height: 20px;
    color: #000;
  }
}

.page-title {
  text-align: center;
  position: absolute;
  opacity: 0.1;
  font-size: 60px;
  line-height: 0.5;
  right: 15px;
  text-align: right;
}
</style>
