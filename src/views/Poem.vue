<template>
  <div class="poem-view">
    <h1>This is a single poem page</h1>
    <t-poem :poemData="poem" />
    <t-actions
      :id="id"
      :q="poem.in_progress"
      :c="poem.completed"
      class="pl-12"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapState } from 'vuex';
import TPoem from '../components/Poem.vue';
import TActions from '../components/PoemActions.vue';

@Component({
  name: 'Poem',
  components: {
    TPoem,
    TActions
  },
  computed: mapState('poems', ['poem'])
})
export default class Poem extends Vue {
  id: string = '';

  created() {
    this.id = this.$route.params.id;
    const path = this.$route.query.type === 'personal' ? `own_poems/${this.id}` : `poems/${this.id}`
    this.$store.dispatch('poems/getSinglePoem', path);
  }
}
</script>
