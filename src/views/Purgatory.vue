<template>
  <div class="purgatory">
    <h1>Welcome to Purgatory</h1>

    <input type="search" placeholder="search here">
    <v-radio-group v-model="searchBy" row>
      <v-radio label="by author" value="author"/>
      <v-radio label="by title" value="title"/>
    </v-radio-group>
    <hr>

    <div class="filter">
      <p>with a flavour:</p>
      <ul>
        <li v-for="filter in filters" :key="filter.id">
          <label :for="filter.id">{{filter.label}}&nbsp;</label>
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
      <li class="purgatory__item" v-for="poem in sortedPoems" :key="poem.id">
        <router-link :to="`/poem/${poem.id}`">{{poem.title}}</router-link>
        <span>&nbsp;by {{poem.author}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    name: "Purgatory",

    data() {
      return {
        // poems: [],
        sortedPoems: [],
        filters: [
          {id: 'short', label: 'short ones'},
          {id: 'sonnet', label: 'gimme sonnets'},
          {id: 'shakespeare', label: 'shakespeare only'}
        ],
        searchBy: 'author',
        luckyEnabled: false
      }
    },

    created() {
      this.getData()
    },

    computed: {
      ...mapState('poems', ['poems'])
    },

    methods: {
      // getData() {
      //   this.$http.get('http://localhost:3000/poems')
      //     .then(response => {
      //       this.poems = response.body.filter(el => el.status === 'pending');
      //       this.sortedPoems = response.body.filter(el => el.status === 'pending');
      //     })
      // },

      getData() {
        this.$store.dispatch('poems/getPoemsData')
          .then(() => {
            this.sortedPoems = this.poems.filter(el => el.status === 'pending')
          })
      },

      getRandomPoem() {
        this.sortedPoems = [this.poems[Math.floor(Math.random() * this.poems.length)]];
        this.luckyEnabled = true;
      },

      showAll() {
        this.sortedPoems = this.poems;
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
