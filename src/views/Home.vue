<template>
  <div class="home">
    <h1>Until changed</h1>
    <t-section sectionTitle="In Progress">
      <div style="width:400px">
        <v-carousel hide-delimiters show-arrows-on-hover height="350">
          <v-carousel-item v-for="(poem, idx) in currentPoems" :key="idx">
            <t-poem :poemData="poem"/>
          </v-carousel-item>
        </v-carousel>
      </div>
    </t-section>
    <t-section sectionTitle="Purgatory" typeOfBar>
      <t-bars type="purgatory" :poems="pendingPoems"/>
    </t-section>
    <t-section sectionTitle="Completed" typeOfBar>
      <t-bars type="completed" :poems="completedPoems"/>
    </t-section>

    <br>
    <hr>
    <br>
    <h3>widget</h3>
    <aside>
      <t-widget :poems="poems"/>
    </aside>
  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex';
  import TSection from '../components/Section'
  import TBars from '../components/Bars'
  import TPoem from '../components/Poem'
  import TWidget from '../components/Widget'

  export default {
    components: {
      TSection,
      TPoem,
      TBars,
      TWidget
    },

    data() {
      return {
        //
      }
    },

    created() {
      this.$store.dispatch('poems/getPoemsData');
    },

    computed: {
      ...mapState('poems', ['poems']),
      ...mapGetters('poems', ['pendingPoems', 'currentPoems', 'completedPoems'])
    }
  }
</script>
