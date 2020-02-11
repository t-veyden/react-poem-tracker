<template>
  <div v-if="currentAuthor">
    <t-header :title="currentAuthor.name" />
    <p>{{ poemCounter }} in total</p>
    <ul>
      <li v-for="poem in authorsWorks" :key="poem.id">
        <router-link
          :to="{
            name: 'poem',
            params: { id: poem.id },
            query: { type: pageType }
          }"
          >{{ poem.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import MapVuex from '../customDecorators';
import { mapState, mapGetters } from 'vuex';
import THeader from '../components/Header.vue';

interface SingleAuthor {
  id: string;
  name: string;
}

interface SinglePoem {
  author: SingleAuthor;
}

@Component({
  name: 'Author',
  components: {
    THeader
  },
  computed: mapState('poems', ['poems'])
})
export default class Author extends Vue {
  @MapVuex(mapGetters, 'poems', ['authorsList'])
  authorsList!: SingleAuthor[];
  poems!: SinglePoem[];
  id: string = '';
  stubAuthor: SingleAuthor = {
    name: 'me',
    id: 'tv23424h'
  };
  ownPage = false;
  pageType = 'general';

  created() {
    this.id = this.$route.params.id;
    this.ownPage = this.id === this.stubAuthor.id;
    this.pageType = this.ownPage ? 'personal' : 'general';
    const path = this.ownPage ? 'own_poems' : 'poems';
    this.$store.dispatch('poems/getPoemsData', path);
  }

  get currentAuthor() {
    if (!this.ownPage) {
      return this.authorsList.find(
        (author: SingleAuthor) => author.id === this.id
      );
    } else return this.stubAuthor;
  }

  get authorsWorks() {
    if (!this.ownPage) {
      return this.poems.filter(
        (poem: SinglePoem) => poem.author.id === this.id
      );
    } else return this.poems;
  }

  get poemCounter() {
    const source = this.ownPage ? 'poems' : 'authorsWorks';
    return this[source].length;
  }
}
</script>
