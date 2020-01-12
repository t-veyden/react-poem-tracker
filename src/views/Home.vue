<template>
  <div class="home">
    <h1 class="visually-hidden">Poetry Tracker home page</h1>
    <t-section sectionTitle="in progress">
      <v-card style="box-shadow: 0;" elevation="0">
        <v-carousel
          :show-arrows="false"
          hide-delimiter-background
          light
          elevation="0"
          :height="boxHeight"
          v-model="currIdx"
        >
          <v-carousel-item v-for="(poem, idx) in currentPoems" :key="idx">
            <t-poem :poemData="poem" @assignHeight="updateHeight"/>
          </v-carousel-item>
        </v-carousel>
        </v-card>
    </t-section>

    <t-section class="bar-section" sectionTitle="purgatory" typeOfBar>
      <t-bars type="purgatory" :poems="pendingPoems"/>
    </t-section>
    <t-section class="bar-section" sectionTitle="completed" typeOfBar>
      <t-bars type="completed" :poems="completedPoems"/>
    </t-section>

    <!-- <h3>widget</h3>
    <aside>
      <t-widget :poems="poems"/>
    </aside> -->
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
        currIdx: 0,
        heights: []
      }
    },

    created() {
      this.$store.dispatch('poems/getPoemsData');
    },

    computed: {
      ...mapState('poems', ['poems']),
      ...mapGetters('poems', ['pendingPoems', 'currentPoems', 'completedPoems']),

      boxHeight() {
        return this.heights.length ? this.heights[this.currIdx] : '350';
      }
    },

    methods: {
      updateHeight(evt) {
        this.heights.splice(this.currIdx, 0, evt);
      }
    }
  }
</script>

<style lang="scss" scoped>
 @import '../styles/style-heap.scss';

.home::v-deep {
  .v-card {
    box-shadow: none;
  }

  .v-window__container, .v-carousel__item {
    height: inherit !important;
  }
}

</style>
