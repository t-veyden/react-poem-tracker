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
  data() {
    return {
      q: false,
      c: false
    };
  },

  props: {
    id: {
      type: String,
      required: true
    }
  },

  computed: {
    completed() {
      return this.c;
    }
  },

  methods: {
    toggleQ() {
      if (!this.completed) {
        this.q = !this.q;
        this.dispatchAction();
      }
    },

    toggleCompletion() {
      if (this.completed) {
        this.c = false;
        this.q = false;
        this.dispatchAction();
      } else {
        this.c = true;
        this.q = null;
        this.dispatchAction();
      }
    },

    dispatchAction() {
      this.$store.dispatch("poems/updatePoemStatus", {
        id: this.id,
        p: {
          completed: this.c,
          in_progress: this.q
        }
      });
    }
  }
};
</script>
