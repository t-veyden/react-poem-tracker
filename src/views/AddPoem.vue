<template>
  <div class="add-poem">
    <h1>I heard you'd like to add another one</h1>
    <v-form ref="addForm" lazy-validation>
      <v-text-field v-model="newPoem.title" label="Title" :rules="rules" />
      <v-checkbox
        v-model="noTitle"
        label="No title here"
        @change="updateTitle('newPoem')"
      />
      <v-text-field
        v-model="newPoem.author.name"
        @blur="updateID"
        label="Author"
        :rules="rules"
      />
      <v-checkbox
        v-if="isAuthorized"
        v-model="ownPoem"
        label="That would be me"
        @change="setAuthor"
      />

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
import { mixins } from 'vue-class-component';
import { Vue, Component } from 'vue-property-decorator';
import MapVuex from '../customDecorators';
import { mapGetters, mapState } from 'vuex';
import { uxMixin, textMixin } from '../utils';
import { defineID } from '../utils/helpers';

@Component({
  name: 'AddPoem',
  computed: mapState('admin', ['isAuthorized'])
})
export default class AddPoem extends mixins(uxMixin, textMixin) {
  @MapVuex(mapGetters, 'poems', ['authorID'])
  newPoem = {
    author: {
      name: '',
      id: ''
    },
    title: '',
    text: '',
    completed: false,
    in_progress: false,
    lang: 'English'
  };
  ownPoem = false;
  status = 'pending';
  completionStates = ['current', 'pending', 'completed'];
  langs = ['English', 'French', 'Spanish'];
  snackbarMessage = 'You just added a new poem';
  rules = [v => !!v || "This field shouldn't be empty"];
  stubAuthor = {
    name: 'me',
    id: 'tv23424h'
  };

  created() {
    this.$store.dispatch('poems/getPoemsData');
  }

  updateID() {
    this.newPoem.author.id = defineID(this.newPoem.author.name);
  }

  setAuthor() {
    for (let prop in this.newPoem.author) {
      this.ownPoem
        ? (this.newPoem.author[prop] = this.stubAuthor[prop])
        : (this.newPoem.author[prop] = '');
    }
  }

  preparePoem() {
    if (!this.newPoem.title) this.newPoem.title = '***';
    if (this.status === 'current') {
      this.newPoem.in_progress = true;
    } else if (this.status === 'completed') {
      this.newPoem.completed = true;
    }
  }

  submitPoem() {
    this.preparePoem();
    const path = this.ownPoem ? 'own_poems' : 'poems';
    if (this.$refs.addForm.validate() && this.newPoem.text) {
      this.$store.dispatch('poems/addPoem', { path: path, body: this.newPoem });
      this.showMessage(this.snackbarMessage);
      this.clearForm();
    }
  }

  clearForm() {
    this.newPoem = {
      author: {
        name: '',
        id: ''
      },
      title: '',
      text: '',
      completed: false,
      in_progress: false,
      lang: 'English'
    };

    this.status = 'pending';
  }
}
</script>

<style scoped>
@import '~vue-wysiwyg/dist/vueWysiwyg.css';
</style>
