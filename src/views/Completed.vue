<template>
  <div class="completed">
    <h1>Well done, here are your Completed</h1>
    <input type="search" placeholder="find your beauty">
    <br><br>
    <hr>
    <br>

    <ul>
      <li class="purgatory__item" v-for="poem in completedPoems" :key="poem.id">
        <router-link :to="`/poem/${poem.id}`">{{ poem.title }}</router-link>
        <span>&nbsp;by {{ poem.author }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: "Completed",

    data() {
      return {
        //
      }
    },

    created() {
      this.$store.dispatch('poems/getPoemsData');
    },

    computed: {
      ...mapGetters('poems', ['completedPoems'])
    }
  }
</script>

<style scoped>

</style>
