<template>
  <div class="home">
    <h1>Until changed</h1>
    <t-section sectionTitle="In Progress">
      <div style="width:400px">
        <v-carousel hide-delimiters show-arrows-on-hover height="350">
          <v-carousel-item v-for="(poem, idx) in current" :key="idx">
            <t-poem :poemData="poem"/>
          </v-carousel-item>
        </v-carousel>
      </div>
    </t-section>
    <t-section sectionTitle="Purgatory" typeOfBar>
      <t-bars type="purgatory" :poems="pending"/>
    </t-section>
    <t-section sectionTitle="Completed" typeOfBar>
      <t-bars type="completed" :poems="completed"/>
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
  import {mapState} from 'vuex';
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
        current: [],
        pending: [],
        completed: [],
        statuses: ['current', 'pending', 'completed']
      }
    },

    created() {
      this.getData()
    },

    computed: {
      ...mapState('poems', ['poems'])
    },

    methods: {
      getData() {
        this.$store.dispatch('poems/getPoemsData')
          .then(() => this.statuses.forEach(status => this[status] = this.poems.filter(el => el.status === status)))
      }
    }
  }
</script>
