<template>
  <ul>
    <li v-for="(author, idx) in authorsList" :key="idx">
      <!-- <router-link>{{ author }}</router-link> -->
      {{ author.name }}
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  created() {
    this.$store.dispatch('poems/getPoemsData');
  },

  computed: {
    ...mapGetters('poems', ['authorsList'])
  }
};
</script>
