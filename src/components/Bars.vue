<template>
  <div>
    <div class="t-bar">
      <div><router-link to="/">Something something llama</router-link><span> || </span><small>someone</small></div>
    </div>
    <div class="t-bar">
      <div><router-link to="/">Something something llama</router-link><span> || </span><small>someone</small></div>
    </div>
    <div class="t-bar">
      <div><router-link to="/">Something something llama</router-link><span> || </span><small>someone</small></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Bars",
    data() {
      return {
        bars: []
      }
    },

    props: {
      type: String
    }
  }
</script>

<style lang="scss" scoped>
  .t-bar {
    padding: 10px;

    &:nth-child(odd) {
      background-color: #ededed;
    }
  }
</style>