<template>
  <div class="add-poem">
    <t-header title="here we meet again" />
    <v-form class="add-poem__form form" ref="addForm" lazy-validation>
      <div class="form__field-group">
        <v-text-field
          class="form__input-field"
          v-model="newPoem.title"
          label="Title"
          :rules="rules"
        />
        <v-checkbox
          class="form__check-field"
          v-model="noTitle"
          label="No title here"
          @change="handleChange"
        />
      </div>
      <div class="form__field-group">
        <v-text-field
          class="form__input-field"
          v-model="newPoem.author.name"
          @blur="updateID"
          label="Author"
          :rules="rules"
        />
        <v-checkbox
          class="form__check-field"
          v-if="isAuthorized"
          v-model="ownPoem"
          label="That would be me"
          @change="setAuthor"
        />
      </div>

      <div class="form__options">
        <v-autocomplete
          class="form__option-field"
          :items="langs"
          label="Language"
          v-model="newPoem.lang"
          dense
          hide-selected
        />
        <v-autocomplete
          class="form__option-field"
          v-if="!ownPoem"
          :items="completionStates"
          label="Status"
          v-model="status"
          dense
          hide-selected
        />
      </div>

      <!-- but if i want to add another one? -->

      <wysiwyg v-model="newPoem.text" />
      <div class="add-poem__actions">
        <v-btn text @click="clearForm">Clear</v-btn>
        <v-btn text @click="submitPoem">Add poem</v-btn>
      </div>
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
import THeader from '../components/Header.vue';

@Component({
  name: 'AddPoem',
  components: {
    THeader
  },
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

  handleChange() {
    if (this.noTitle) {
      this.updateTitle('newPoem');
    } else {
      this.newPoem.title = '';
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

<style lang="scss" scoped>
@import '~vue-wysiwyg/dist/vueWysiwyg.css';

.add-poem {
  display: flex;
  flex-direction: column;

  &__form {
    margin-top: 60px;
  }

  &__actions {
    margin-top: 20px;
    float: right;
  }
}

.form {
  &__field-group {
    display: flex;
  }

  &__input-field {
    margin-right: 25px;
  }

  &__check-field {
    width: 160px;
    transform: translateY(12px);
  }

  &__options {
    margin: 35px 0;
  }

  &__option-field {
    margin-bottom: 15px;
  }
}
</style>
