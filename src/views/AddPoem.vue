<template>
  <div class="add-poem">
    <h1>I heard you'd like to add another one</h1>
    <v-form>
      <v-text-field v-model="newPoem.title" label="Title"/>
      <v-text-field v-model="newPoem.author" label="Author" required/>
      <v-autocomplete :items="['English', 'French', 'Spanish']" label="Language" v-model="newPoem.lang"/>
      <!-- but if i want to add another one? -->

      <wysiwyg v-model="newPoem.text"/>
      <v-btn text @click="submitPoem">Add poem</v-btn>
      <v-btn text @click="clearForm">Clear</v-btn>
    </v-form>
    <!--  preview?  -->

    <div v-if="isAdded">
      you just added a new poem
    </div>
  </div>
</template>

<script>
  export default {
    name: "AddPoem",

    data() {
      return {
        newPoem: {
          author: '',
          title: '',
          text: '',
          status: '',
          completed: false,
          in_progress: false,
          lang: 'English'
        }
      }
    },

    computed: {
      isAdded() {
        let status = this.$store.getters['poems/newPoemStatus'];
        return status;
      }
    },

    methods: {
      preparePoem() {
        if (!this.newPoem.title) this.newPoem.title = '***';
      },

      submitPoem() {
        this.preparePoem();
        this.$store.dispatch('poems/addPoem', this.newPoem)
        this.clearForm();
      },

      clearForm() {
        this.newPoem = {
          author: '',
          title: '',
          text: '',
          status: '',
          completed: false,
          in_progress: false,
          lang: 'English'
        }
      }
    }
  }
</script>

<style scoped>
  @import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
