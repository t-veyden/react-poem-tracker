<template>
  <ul>
    <li v-for="author in authorsList" :key="author.id">
      <router-link :to="`/authors/${author.id}`">{{ author.name }}</router-link>
    </li>
  </ul>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import MapVuex from '../customDecorators';
import { mapGetters } from 'vuex';

@Component({
  name: 'AuthorsList'
})
export default class AuthorsList extends Vue {
  @MapVuex(mapGetters, 'poems', ['authorsList'])
  created() {
    this.$store.dispatch('poems/getPoemsData');
  }
}
</script>
