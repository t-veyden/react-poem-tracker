<template>
  <div v-if="currentAuthor">
    <h1>{{ currentAuthor.name }}</h1>
    <p>{{ poemCounter }} in total</p>
    <ul>
      <li v-for="poem in authorsWorks" :key="poem.id">
        <router-link :to="`/poem/${poem.id}`">{{ poem.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import MapVuex from '../customDecorators';
import { mapState, mapGetters } from 'vuex';

interface SingleAuthor {
  id: string;
  name: string;
}

interface SinglePoem {
  author: SingleAuthor;
}

@Component({
  name: 'Author',
  computed: mapState('poems', ['poems'])
})
export default class Author extends Vue {
  @MapVuex(mapGetters, 'poems', ['authorsList'])
  authorsList!: () => SingleAuthor[];
  poems!: () => SinglePoem[];
  id: string = '';

  created() {
    this.id = this.$route.params.id;
    this.$store.dispatch('poems/getPoemsData');
  }

  get currentAuthor() {
    return this.authorsList.find(
      (author: SingleAuthor) => author.id === this.id
    );
  }

  get authorsWorks() {
    return this.poems.filter((poem: SinglePoem) => poem.author.id === this.id);
  }

  get poemCounter() {
    return this.authorsWorks.length;
  }
}
</script>
