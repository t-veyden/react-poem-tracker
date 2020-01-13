<template>
  <div class="container" ref="poemBox">
    <v-card min-width="300" min-height="300">
      <v-card-title>{{ poemData.title }}</v-card-title>
      <v-list-item-subtitle>{{ poemData.author }}</v-list-item-subtitle>
      <v-card-text v-if="Array.isArray(poemData.text)" class="pl-12">
        <span v-for="(line, idx) in poemData.text" :key="idx">{{ line }}</span>
      </v-card-text>
      <v-card-text v-else class="pl-12" v-html="poemData.text" />
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Poem",

  data() {
    return {

    };
  },

  props: {
    poemData: Object
  },

  mounted() {
    this.getBoxHeight();
  },

  methods: {
    getBoxHeight() {
      this.$emit('assignHeight', this.$refs.poemBox.clientHeight);
    }
  }
};
</script>

<style scoped>
.v-card__text {
  display: flex;
  flex-direction: column;
}
</style>
