<template>
  <div>
    <div class="t-bar" v-for="poem in poemBars" :key="poem.id">
      <div>
        <router-link :to="`/poem/${poem.id}`">{{poem.title}}</router-link>
        <span>||</span>
        <small>{{poem.author}}</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Bars",
  data() {
    return {
      bars: [],
      barsLength: 3
    };
  },

  props: {
    type: String,
    poems: Array
  },

  computed: {
    poemBars() {
      if (this.poems && this.poems.length <= this.barsLength) {
        return this.poems;
      } else {
        return this.getRandomPoems(this.poems, this.barsLength);
      }
    }
  },

  methods: {
    getRandomPoems(arr, num) {
      const bars = [];

      while (bars.length < num) {
        const el = arr[Math.floor(Math.random() * arr.length)];
        bars.indexOf(el) === -1 ? bars.push(el) : null;
      }
      return bars;
    }
  }
};
</script>

<style lang="scss" scoped>
.t-bar {
  padding: 10px;

  &:nth-child(odd) {
    background-color: #ededed;
  }
}
</style>
