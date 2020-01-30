<template>
  <div v-if="poems.length">
    <t-widget :poems="poems" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapState } from 'vuex';
import TWidget from '../components/Widget.vue';

@Component({
  name: 'Dashboard',
  components: {
    TWidget
  },
  computed: mapState('poems', ['poems'])
})
export default class Dashboard extends Vue {
  created() {
    this.$store.dispatch('poems/getPoemsData');
  }
}
</script>
