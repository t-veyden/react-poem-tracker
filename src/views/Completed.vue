<template>
  <div class="completed">
    <h1>Well done, here are your Completed</h1>
    <input type="search" placeholder="find your beauty">
    <br><br>
    <hr>
    <br>

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
    name: "Completed",

    data() {
      return {
        // poems: [],
        sortedPoems: []
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
      //       this.poems = response.body.filter(el => el.status === 'completed');
      //       this.sortedPoems = response.body.filter(el => el.status === 'completed');
      //     })
      // },

      getData() {
        this.$store.dispatch('poems/getPoemsData')
          .then(() => this.sortedPoems = this.poems.filter(el => el.status === 'completed'))
      }
    }
  }
</script>

<style scoped>

</style>
