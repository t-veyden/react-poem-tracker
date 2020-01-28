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
            <t-poem :poemData="poem" @assignHeight="updateHeight" />
            <t-actions
              :id="poem.id"
              :q="poem.in_progress"
              :c="poem.completed"
              class="pl-12"
            />
          </v-carousel-item>
        </v-carousel>
      </v-card>
    </t-section>

    <t-section class="bar-section" sectionTitle="purgatory" typeOfBar>
      <t-bars :poems="pendingPoems" />
    </t-section>
    <t-section class="bar-section" sectionTitle="completed" typeOfBar>
      <t-bars :poems="completedPoems" />
    </t-section>

    <!-- <h3>widget</h3>
    <aside>
      <t-widget :poems="poems"/>
    </aside> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import MapVuex from '../customDecorators';
import { mapState, mapGetters } from 'vuex';
import TSection from '../components/Section.vue';
import TBars from '../components/Bars.vue';
import TPoem from '../components/Poem.vue';
import TActions from '../components/PoemActions.vue';
import TWidget from '../components/Widget.vue';

@Component({
  name: 'Home',
  components: {
    TSection,
    TPoem,
    TActions,
    TBars,
    TWidget
  },
  computed: mapState('poems', ['poems'])
})
export default class Home extends Vue {
  @MapVuex(mapGetters, 'poems', ['pendingPoems', 'currentPoems', 'completedPoems'])
  currIdx: number = 0;
  heights: number[] = [];

  created() {
    this.$store.dispatch('poems/getPoemsData');
  }

  get boxHeight() {
    return this.heights.length ? this.heights[this.currIdx] + 100 : '350';
  }

  updateHeight(evt: number) {
    this.heights.splice(this.currIdx, 0, evt);
  }
};
</script>

<style lang="scss" scoped>
@import '../styles/style-heap.scss';

.home::v-deep {
  .v-card {
    box-shadow: none;
  }

  .v-window__container,
  .v-carousel__item {
    height: inherit !important;
  }
}
</style>
