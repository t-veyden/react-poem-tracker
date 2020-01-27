<template>
  <ul class="t-bars">
    <li class="t-bar" v-for="poem in poemBars" :key="poem.id">
      <router-link class="t-bar__link" :to="`/poem/${poem.id}`">{{
        poem.title
      }}</router-link>
      &nbsp;
      <span class="t-bar__delimeter">..</span>
      &nbsp;
      <small class="t-bar__author">{{ poem.author.name }}</small>
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'Bars'
})
export default class Bars extends Vue {
  @Prop(String) type: string | undefined;
  @Prop(Array) poems!: object[];

  bars = [];
  barsLength = 3;

  get poemBars() {
    if (this.poems && this.poems.length <= this.barsLength) {
      return this.poems;
    } else {
      return this.getRandomPoems(this.poems, this.barsLength);
    }
  }

  getRandomPoems(arr: object[], num: number) {
    const bars = [];

    while (bars.length < num) {
      const el = arr[Math.floor(Math.random() * arr.length)];
      bars.indexOf(el) === -1 ? bars.push(el) : null;
    }
    return bars;
  }
}
</script>

<style lang="scss" scoped>
.t-bars {
  margin: 0;
  padding: 10px;
  list-style: none;
}

.t-bar {
  position: relative;
  display: flex;
  justify-content: space-between;

  &__delimeter {
    position: absolute;
    left: 50%;
  }

  &__link {
    color: #535251;
  }
}
</style>
