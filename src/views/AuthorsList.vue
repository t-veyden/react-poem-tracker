<template>
  <div class="authors">
    <t-header title="the great and good" />
    <ul class="authors__list authors-list">
      <li
        class="authors-list__item"
        v-for="author in authorsList"
        :key="author.id"
      >
        <v-icon class="authors-list__item-icon">chevron_right</v-icon>
        <router-link
          class="authors-list__item-link"
          :to="`/authors/${author.id}`"
          >{{ author.name }}</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import MapVuex from '../customDecorators';
import { mapGetters } from 'vuex';
import THeader from '../components/Header.vue';

@Component({
  name: 'AuthorsList',
  components: {
    THeader
  }
})
export default class AuthorsList extends Vue {
  @MapVuex(mapGetters, 'poems', ['authorsList'])
  created() {
    this.$store.dispatch('poems/getPoemsData');
  }
}
</script>

<style lang="scss" scoped>
.authors {
  display: flex;
  flex-direction: column;

  &__list {
    margin-top: 60px;
  }
}

.authors-list {
  list-style: none;

  &__item {
    padding: 8px 0;
    margin-bottom: 5px;
  }

  &__item-link {
    text-decoration: none;
  }

  &__item-icon {
    margin-right: 10px;
  }
}
</style>
