<template>
  <div class="poem-view">
    <h1>This is a single poem page</h1>
    <t-poem :poemData="poem" />
  </div>
</template>

<script>
import TPoem from "../components/Poem";

export default {
  name: "Poem",
  data() {
    return {
      poem: {},
      id: this.$route.params.id
    };
  },

  components: {
    TPoem
  },

  created() {
    this.getPoem(this.id);
  },

  methods: {
    getPoem(id) {
      this.$http.get(`http://localhost:3000/poems/${id}`).then(response => {
        this.poem = response.body;
      });
    }
  }
};
</script>

<style scoped>
</style>
