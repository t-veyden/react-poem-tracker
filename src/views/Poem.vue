<template>
  <div class="poem-view">
    <t-header :title="poem.title" />
    <t-poem class="poem-view__poem" :poemData="poem" />
    <t-actions
      v-if="poem.author"
      :id="id"
      :authorId="poem.author.id"
      :q="poem.in_progress"
      :c="poem.completed"
      class="pl-12"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapState } from 'vuex';
import THeader from '../components/Header.vue';
import TPoem from '../components/Poem.vue';
import TActions from '../components/PoemActions.vue';

@Component({
  name: 'Poem',
  components: {
    THeader,
    TPoem,
    TActions
  },
  computed: mapState('poems', ['poem'])
})
export default class Poem extends Vue {
  id: string = '';

  created() {
    this.id = this.$route.params.id;
    const path =
      this.$route.query.type === 'personal'
        ? `own_poems/${this.id}`
        : `poems/${this.id}`;

    this.$store.dispatch('poems/getSinglePoem', path);
  }
}
</script>

<style lang="scss" scoped>
.poem-view {
  &__poem {
    padding-top: 60px;
  }
}
</style>
