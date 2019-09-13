<template>
  <div class="add-poem">
    <h1>I heard you'd like to add another one</h1>
    <v-form ref="form">
      <v-text-field v-model="newPoem.title" label="Title"/>
      <v-text-field v-model="newPoem.author" label="Author" required/>
      <v-textarea v-model="rawText" auto-grow label="Text" rows="1" required/>
      <v-text-field v-model="newPoem.lang" label="Language"/>

      <v-btn text @click="submitPoem">Add</v-btn>
      <v-btn text @click="$refs.form.reset()">Clear</v-btn>
    </v-form>
    <!--  preview?  -->
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
          text: [],
          status: '',
          completed: false,
          in_progress: false,
          lang: ''
        },
        rawText: ''
      }
    },

    methods: {
      preparePoem() {
        if (!this.newPoem.title) this.newPoem.title = '***';
        this.newPoem.text = this.rawText.split(/\n/); // there's a lag, inspect it
        this.rawText = '';
      },

      submitPoem() {
        this.preparePoem();
        // post
      }
    }
  }
</script>

<style scoped>

</style>