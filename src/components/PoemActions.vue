<template>
  <v-card-actions>
    <v-speed-dial
      v-model="fab"
      absolute
      bottom
      right
      direction="left"
      transition="slide-y-reverse-transition"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="rgb(232, 181, 37)" fab>
          <v-icon v-if="fab" color="#fafafa">mdi-close</v-icon>
          <v-icon v-else color="#fafafa">touch_app</v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="#a5c882" @click="toggleCompletion">
        <v-icon v-if="!c">done</v-icon>
        <!-- <v-icon v-else>not_interested</v-icon> -->
        <!-- <v-icon v-else>remove</v-icon> -->
        <v-icon v-else>undo</v-icon>
      </v-btn>
      <v-btn fab dark small color="#5ab1bb" v-if="q !== null" @click="toggleQ">
        <v-icon v-if="!q">watch_later</v-icon>
        <!-- <v-icon v-else>restore</v-icon> -->
        <v-icon v-else>link_off</v-icon>
      </v-btn>
      <v-btn fab dark small color="#c17c74" @click="redirectToEdit">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn fab dark small color="#832232" @click="callConfirm">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>
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

  fab = true;
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
