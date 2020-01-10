<template>
  <div class="container" ref="poemBox">
    <v-card min-width="300" min-height="300">
      <v-card-title>{{ poemData.title }}</v-card-title>
      <v-list-item-subtitle>{{ poemData.author }}</v-list-item-subtitle>
      <v-card-text v-if="Array.isArray(poemData.text)" class="pl-12">
        <span v-for="(line, idx) in poemData.text" :key="idx">{{ line }}</span>
      </v-card-text>

      <v-card-text v-else class="pl-12" v-html="poemData.text" />

      <v-card-actions class="pl-12">
        <v-btn icon @click="toggleCompletion">
          <v-icon>{{ icon[poemData.status] }}</v-icon>
        </v-btn>
        <v-btn icon v-if="isInProgress" @click="ejectPoem">
          <v-icon>mdi-eject</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Poem",

  data() {
    return {
      icon: {
        pending: "mdi-check",
        completed: "mdi-close",
        current: "mdi-check"
        // this is horrible, change it
      }
    };
  },

  props: {
    poemData: Object
  },

  mounted() {
    this.getBoxHeight();
  },

  computed: {
    isInProgress() {
      return this.poemData.status === "current";
    },

    completionStatus() {
      switch (this.poemData.status) {
        case "completed":
          return "pending";
        case "pending":
          return "completed";
      }
    }
  },

  methods: {
    getBoxHeight() {
      this.$emit('assignHeight', this.$refs.poemBox.clientHeight);
    },

    toggleCompletion() {
      this.poemData.status = this.completionStatus;
    },

    ejectPoem() {
      this.poemData.status = "pending";
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
