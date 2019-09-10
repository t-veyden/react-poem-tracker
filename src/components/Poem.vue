<template>
  <div class="container">
    <v-card min-width="300" min-height="300">
      <v-card-title>{{poemData.title}}</v-card-title>
      <v-card-text class="pl-12">
        <span v-for="(line, idx) in poemData.text" :key="idx">{{line}}</span>
      </v-card-text>
      <v-card-actions class="pl-12">
        <v-btn icon @click="markCompleted(poemData.id)">
          <v-icon>mdi-check</v-icon>
        </v-btn>
        <v-btn icon @click="ejectPoem(poemData.id)">
          <v-icon>mdi-eject</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
  export default {
    name: "Poem",

    props: {
      poemData: Object
    },

    methods: {
      markCompleted(id) {
        // emit completed
        console.log(id);
      },

      ejectPoem(id) {
        // emit ejected
        console.log(id);
      }
    }
  }

</script>

<style scoped>
  .v-card__text {
    display: flex;
    flex-direction: column;
  }

</style>