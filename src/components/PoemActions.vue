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
      <v-btn @click="redirectToEdit">
        Edit
      </v-btn>
    </div>
  </v-card-actions>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import { uxMixin } from '../utils/index';

interface SingleAuthor {
  id: string;
  name: string;
}

@Component({
  name: 'PoemActions'
})
export default class PoemActions extends mixins(uxMixin) {
  @Prop({ type: String, required: true }) id!: string;
  @Prop({ type: String, required: true }) authorId!: string;
  @Prop() q!: boolean | null;
  @Prop(Boolean) c!: boolean;

  snackbarMessage: string = 'Tis gone';
  stubAuthor: SingleAuthor = {
    name: 'me',
    id: 'tv23424h'
  };

  get isOwn() {
    return this.authorId === this.stubAuthor.id;
  }

  get pageType() {
    return this.isOwn ? 'personal' : 'general';
  }

  toggleQ() {
    const payload = {
      completed: this.c,
      in_progress: !this.q
    };
    this.updateStatus(payload);
  }

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
  }

  callConfirm() {
    const confirmDelete = confirm("You're sure you want to delete this?");
    if (confirmDelete) this.deletePoem();
  }

  updateStatus(payload: object) {
    this.$store.dispatch('poems/updatePoemStatus', {
      id: this.id,
      p: payload
    });
  }

  deletePoem() {
    const path = this.isOwn ? `own_poems/${this.id}` : `poems/${this.id}`;
    this.$store.dispatch('poems/deletePoem', path);

    this.showMessage(this.snackbarMessage);
    setTimeout(() => {
      this.$router.go(-1);
    }, 2000);
  }

  redirectToEdit() {
    this.$router.push({
      path: `/edit/${this.id}`,
      query: { type: this.pageType }
    });
  }
}
</script>
