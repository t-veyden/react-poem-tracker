<template>
  <div class="poem-view">
    <h1>This is a single poem page</h1>
    <t-poem :poemData="poem" />
    <t-actions :id="id" :q="poem.in_progress" :c="poem.completed" class="pl-12" />
  </div>
</template>

<script>
import {mapState} from 'vuex';
import TPoem from "../components/Poem";
import TActions from "../components/PoemActions";

export default {
  name: "Poem",
  data() {
    return {
      id: this.$route.params.id
    };
  },

  components: {
    TPoem,
    TActions
  },

  created() {
    this.$store.dispatch('poems/getSinglePoem', this.id);
  },

  computed: {
    ...mapState('poems', ['poem'])
  }
};
</script>

<style scoped>
</style>
