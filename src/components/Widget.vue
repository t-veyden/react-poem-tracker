<template>
  <v-sheet>
    <p>You have {{ poems.length }} poems in total</p>
    <p>{{ numOfCompleted }} of them are completed</p>
    <hr />
    <p>In case you wanted to know:</p>
    <p v-for="(num, lang) in usedLangs" :key="lang">
      {{ num }} of them {{ num > 1 ? 'are' : 'is' }} in {{ lang }}
    </p>
    <p>Fav: {{ favPoet }} (but this is not certain)</p>
  </v-sheet>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'Widget'
})
export default class Widget extends Vue {
  @Prop(Array) poems!: object[];

  get numOfCompleted() {
    return this.poems.filter(poem => poem.status === 'completed').length;
  }

  get usedLangs() {
    return this.countUniqueItems(this.getArrOfValues('lang'));
  }

  get favPoet() {
    const sortedPoets = this.countUniqueItems(this.getArrOfValues('author'));
    const fav = Object.values(sortedPoets).sort((a, b) => (a < b ? 1 : -1))[0];
    return Object.keys(sortedPoets).find(key => sortedPoets[key] === fav);
  }

  countUniqueItems(arr) {
    return arr.reduce((obj, item) => {
      if (!obj[item]) {
        obj[item] = 0;
      }
      obj[item]++;
      return obj;
    }, {});
  }

  getArrOfValues(key) {
    return this.poems.map(poem => poem[key]);
  }
}
</script>

<style scoped></style>
