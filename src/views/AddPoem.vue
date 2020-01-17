<template>
  <div class="add-poem">
    <h1>I heard you'd like to add another one</h1>
    <v-form>
      <v-text-field v-model="newPoem.title" label="Title" />
      <v-text-field v-model="newPoem.author" label="Author" required />
      <v-autocomplete
        :items="langs"
        label="Language"
        v-model="newPoem.lang"
        dense
        hide-selected
      />
      <v-autocomplete
        :items="completionStates"
        label="Status"
        v-model="status"
        dense
        hide-selected
      />
      <!-- but if i want to add another one? -->

      <wysiwyg v-model="newPoem.text" />
      <v-btn text @click="submitPoem">Add poem</v-btn>
      <v-btn text @click="clearForm">Clear</v-btn>
    </v-form>
    <!--  preview?  -->
  </div>
</template>

<script>
import { uxMixin } from "../utils/index";

export default {
  name: "AddPoem",

  mixins: [uxMixin],

  data() {
    return {
      newPoem: {
        author: "",
        title: "",
        text: "",
        completed: false,
        in_progress: false,
        lang: "English"
      },
      status: "pending",
      completionStates: ["current", "pending", "completed"],
      langs: ["English", "French", "Spanish"],
      snackbarMessage: "You just added a new poem"
    };
  },

  methods: {
    preparePoem() {
      if (!this.newPoem.title) this.newPoem.title = "***";
      if (this.status === "current") {
        this.newPoem.in_progress = true;
      } else if (this.status === "completed") {
        this.newPoem.completed = true;
      }
    },

    submitPoem() {
      this.preparePoem();
      this.$store.dispatch("poems/addPoem", this.newPoem);
      this.showMessage(this.snackbarMessage);
      this.clearForm();
    },

    clearForm() {
      this.newPoem = {
        author: "",
        title: "",
        text: "",
        completed: false,
        in_progress: false,
        lang: "English"
      };

      this.status = "pending";
    }
  }
};
</script>

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
