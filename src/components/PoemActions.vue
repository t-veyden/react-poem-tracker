<template>
  <v-card-actions>
    <v-btn v-if="q !== null" @click="toggleQ">
      <span v-if="!q">queue</span>
      <span v-else>UNqueue</span>
    </v-btn>
    <v-btn @click="toggleCompletion">
      <span v-if="!c">complete it</span>
      <span v-else>UNcomplete</span>
    </v-btn>
  </v-card-actions>
</template>

<script>
export default {
  name: "PoemActions",

  props: {
    id: {
      type: String,
      required: true
    },
    q: {
      type: Boolean || null
    },
    c: {
      type: Boolean
    }
  },

  methods: {
    toggleQ() {
      const payload = {
        completed: this.c,
        in_progress: !this.q
      };
      this.dispatchAction(payload);
    },

    toggleCompletion() {
      const payload = this.c
        ? {
            completed: false,
            in_progress: false
          }
        : {
            completed: true,
            in_progress: null
          };

      this.dispatchAction(payload);
    },

    dispatchAction(payload) {
      this.$store.dispatch("poems/updatePoemStatus", {
        id: this.id,
        p: payload
      });
    }
  }
};
</script>
