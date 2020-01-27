<template>
  <ul>
    <li v-for="(author, idx) in authorsList" :key="idx">
      <!-- <router-link>{{ author }}</router-link> -->
      {{ author.name }}
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
