<template>
  <v-card-actions>
    <div>
      <v-btn v-if="q !== null" @click="toggleQ">
        <span v-if="!q">queue</span>
        <span v-else>UNqueue</span>
      </v-btn>
      <v-btn @click="toggleCompletion">
        <span v-if="!c">complete it</span>
        <span v-else>UNcomplete</span>
      </v-btn>
    </div>

    <div>
      <v-btn @click="callConfirm">
        Delete
      </v-btn>
      <v-btn>
        Edit
      </v-btn>
    </div>
  </v-card-actions>
</template>

<script>
import { uxMixin } from '../utils/index';

export default {
  name: 'PoemActions',

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

  mixins: [uxMixin],

  data() {
    return {
      snackbarMessage: 'Tis gone'
    };
  },

  methods: {
    toggleQ() {
      const payload = {
        completed: this.c,
        in_progress: !this.q
      };
      this.updateStatus(payload);
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

      this.updateStatus(payload);
    },

    callConfirm() {
      const confirmDelete = confirm("You're sure you want to delete this?");
      if (confirmDelete) this.deletePoem();
    },

    updateStatus(payload) {
      this.$store.dispatch('poems/updatePoemStatus', {
        id: this.id,
        p: payload
      });
    },

    deletePoem() {
      this.$store.dispatch('poems/deletePoem', this.id);
      this.showMessage(this.snackbarMessage);
      setTimeout(() => {
        this.$router.go(-1);
      }, 2000);
    }
  }
};
</script>
