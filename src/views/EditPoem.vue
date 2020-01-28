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

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import { mapState } from 'vuex';
import { uxMixin, textMixin } from '../utils';
import { defineID } from '../utils/helpers';

interface SinglePoem {
  text: string[];
  author: object;
}

@Component({
  name: 'EditPoem',
  computed: mapState('poems', ['poem'])
})
export default class EditPoem extends mixins(uxMixin, textMixin) {
  public poem!: SinglePoem;
  id: string = '';
  updPoem = {
    title: '',
    author: {
      name: '',
      id: ''
    },
    text: '',
    lang: ''
  };
  snackbarMessage = 'Update was successful';
  langs = ['English', 'French', 'Spanish'];
  rules = [v => !!v || "This field shouldn't be empty"];

  @Watch('poem')
  handler(val) {
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

  get isChanged() {
    if (this.isLoaded) {
      const keys = Object.keys(this.updPoem);
      const nestedKeys = Object.keys(this.updPoem.author);
      keys.splice(keys.indexOf('author'), 1);

      const differ = this.checkDiff(['updPoem'], ['poem']);
      const nestedDiffer = this.checkDiff(
        ['updPoem', 'author'],
        ['poem', 'author']
      );

      return keys.some(differ) || nestedKeys.some(nestedDiffer);
    } else return false;
  }

  get isLoaded() {
    return this.poem.author !== undefined;
  }

  created() {
    this.id = this.$route.params.id;
    this.$store.dispatch('poems/getPoemsData');
    this.$store.dispatch('poems/getSinglePoem', this.id);
  }

  updateID() {
    this.updPoem.author.id = defineID(this.updPoem.author.name);
  }

  checkDiff(x: string[], y: string[]) {
    return key => {
      return this.getPath(x)[key] !== this.getPath(y)[key];
    };
  }

  getPath(keyArr: string[]) {
    const path = keyArr.reduce((acc, key) => {
      return acc[key];
    }, this);
    return path;
  }

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
  }

  cancelEdit() {
    this.isChanged ? this.confirmCancel() : this.$router.go(-1);
  }

  confirmCancel() {
    const confirmCancel = confirm(
      'You have unsaved changes. Are you sure you wanna cancel?'
    );
    if (confirmCancel) {
      this.$router.go(-1);
    } else return;
  }
}
</script>

<style scoped>
@import '~vue-wysiwyg/dist/vueWysiwyg.css';
</style>
