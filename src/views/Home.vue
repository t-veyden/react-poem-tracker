<template>
  <div class="home">
    <h1>Until changed</h1>
    <t-section sectionTitle="In Progress">
      <div style="width:400px">
        <v-carousel hide-delimiters show-arrows-on-hover height="350">
          <v-carousel-item v-for="(poem, idx) in poems" :key="idx">
            <t-poem :poemData="poem"/>
          </v-carousel-item>
        </v-carousel>
      </div>
    </t-section>
    <t-section sectionTitle="Purgatory" typeOfBar>
      <t-bars type="purgatory"/>
    </t-section>
    <t-section sectionTitle="Completed" typeOfBar>
      <t-bars type="completed"/>
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
        poems: []
      }
    },

    created() {
      this.getData()
    },

    methods: {
      getData() {
        this.$http.get('http://localhost:3000/purgatory')
          .then(response => {
            this.poems = response.body
            // console.log(response.body);
          })
      }
    }
  }
</script>

