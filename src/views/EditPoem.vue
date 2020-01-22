<template>
  <div class="edit-poem">
    <v-form ref="editForm" lazy-validation>
      <v-text-field v-model="updPoem.title" label="Title" :rules="rules" />
      <v-checkbox
        v-model="noTitle"
        label="No title here"
        @change="updateTitle('updPoem')"
      />
      <v-text-field
        v-model="updPoem.author.name"
        @blur="updateID"
        label="Author"
        :rules="rules"
      />
      <v-autocomplete
        :items="langs"
        label="Language"
        v-model="updPoem.lang"
        dense
        hide-selected
      />
      <wysiwyg v-model="updPoem.text" />
      <v-btn @click="submitPoem" :disabled="!isChanged">Save</v-btn>
      <v-btn @click="cancelEdit">Cancel</v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { uxMixin, textMixin } from '../utils';
import { defineID } from '../utils/helpers';

export default {
  data() {
    return {
      id: this.$route.params.id,
      updPoem: {
        title: '',
        author: {
          name: '',
          id: ''
        },
        text: '',
        lang: ''
      },
      snackbarMessage: 'Update was successful',
      langs: ['English', 'French', 'Spanish'],
      rules: [v => !!v || "This field shouldn't be empty"]
    };
  },

  mixins: [uxMixin, textMixin],

  computed: {
    ...mapState('poems', ['poem']),

    isChanged() {
      if (this.isLoaded) {
        const keys = Object.keys(this.updPoem);
        const differ = key => this.updPoem[key] !== this.poem[key]; // damn, we have a nested object now
        return keys.some(differ);
      } else return false;
    },

    isLoaded() {
      return Object.keys(this.poem);
    }
  },

  created() {
    this.$store.dispatch('poems/getPoemsData');
    this.$store.dispatch('poems/getSinglePoem', this.id);
  },

  watch: {
    poem(val) {
      const keys = Object.keys(this.updPoem);
      if (val) {
        keys.forEach(key => {
          if (key !== 'text' && key !== 'author') {
            this.updPoem[key] = this.poem[key];
          }
        });

        this.updPoem.author = Object.assign(
          this.updPoem.author,
          this.poem.author
        );

        if (Array.isArray(this.poem.text)) {
          const poemString = this.poem.text
            .map(line => `<div>${line}</div>`)
            .join('');
          this.updPoem.text = poemString;
        } else {
          this.updPoem.text = this.poem.text;
        }
      }
    }
  },

  methods: {
    updateID() {
      this.updPoem.author.id = defineID(this.updPoem.author.name);
    },

    submitPoem() {
      if (this.$refs.editForm.validate() && this.updPoem.text) {
        this.$store.dispatch('poems/updatePoemInfo', {
          id: this.id,
          body: this.updPoem
        });

        this.showMessage(this.snackbarMessage);
        setTimeout(() => {
          this.$router.go(-1);
        }, 2000);
      }
    },

    cancelEdit() {
      this.isChanged ? this.confirmCancel() : this.$router.go(-1);
    },

    confirmCancel() {
      const confirmCancel = confirm(
        'You have unsaved changes. Are you sure you wanna cancel?'
      );
      if (confirmCancel) {
        this.$router.go(-1);
      } else return;
    }
  }
};
</script>

<style scoped>
@import '~vue-wysiwyg/dist/vueWysiwyg.css';
</style>
