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
  </div>
</template>

<script>
  import TSection from '../components/Section'
  import TBars from '../components/Bars'
  import TPoem from '../components/Poem'

  export default {
    components: {
      TSection,
      TPoem,
      TBars
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

    methods: {
      getData() {
        this.$http.get('http://localhost:3000/poems')
          .then(response => {
            this.statuses.forEach(status => this[status] = response.body.filter(el => el.status === status));
          })
      }
    }
  }
</script>

