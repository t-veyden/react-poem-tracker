<template>
  <v-card-actions>
    <v-btn v-if="isCurrent !== null" @click="toggleQ">
      <span v-if="!isCurrent">queue</span>
      <span v-else>UNqueue</span>
    </v-btn>
    <v-btn @click="toggleCompletion">
      <span v-if="!isDone">complete it</span>
      <span v-else>UNcomplete</span>
    </v-btn>
  </v-card-actions>
</template>

<script>
export default {
  name: "PoemActions",
  data() {
    return {
      isCurrent: false,
      isDone: false
    };
  },

  props: {
    id: {
      type: String,
      required: true
    },
    q: {
      type: Boolean || null,
      required: true
    },
    c: {
      type: Boolean,
      required: true
    }
  },

  created() {
      this.isCurrent = this.q;
      this.isDone = this.c;
  },

  computed: {
    completed() {
      return this.isDone;
    }
  },

  methods: {
    toggleQ() {
      if (!this.completed) {
        this.isCurrent = !this.isCurrent;
        this.dispatchAction();
      }
    },

    toggleCompletion() {
      if (this.completed) {
        this.isDone = false;
        this.isCurrent = false;
        this.dispatchAction();
      } else {
        this.isDone = true;
        this.isCurrent = null;
        this.dispatchAction();
      }
    },

    dispatchAction() {
      this.$store.dispatch("poems/updatePoemStatus", {
        id: this.id,
        p: {
          completed: this.isDone,
          in_progress: this.isCurrent
        }
      });
    }
  }
};
</script>
