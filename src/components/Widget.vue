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

interface SinglePoem {
  completed?: boolean;
}

interface SingleAuthor {
  name: string;
}

@Component({
  name: 'Widget'
})
export default class Widget extends Vue {
  @Prop(Array) poems!: object[];

  get numOfCompleted() {
    return this.poems.filter((poem: SinglePoem ) => poem.completed).length;
  }

  get usedLangs() {
    return this.countUniqueItems(this.getArrOfValues('lang'));
  }

  get favPoet() {
    const poets = this.countUniqueItems(this.getArrOfValues('author'));
    const maxCount = Math.max(...Object.values(poets));
    const fav = Object.keys(poets).find(key => poets[key] === maxCount);
    return fav;
  }

  countUniqueItems(arr: string[] | object[]): object {
    return arr.reduce((acc: object, item: string | SingleAuthor) => {
      const key = item instanceof Object ? item.name : item;
      if (!acc[key]) {
        acc[key] = 0;
      }
      acc[key]++;
      return acc;
    }, {});
  }

  getArrOfValues(key: string) {
    return this.poems.map(poem => poem[key]);
  }
}
</script>

<style scoped></style>
