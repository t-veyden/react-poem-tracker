<template>
  <div class="section">
    <h2 class="section__title">{{sectionTitle}}</h2>
    <slot></slot>
    <router-link :to="`/${sectionTitle}`" v-if="typeOfBar" class="section__link">see more</router-link>
  </div>
</template>

<script>
  export default {
    name: "Section",

    props: {
      sectionTitle: String,
      typeOfBar: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .section {
    margin-bottom: 25px;
    background-color: #fff;
    padding-bottom: 15px;

    &__title {
      margin-bottom: 5px;
      font-size: 34px;
      // font-weight: 300;
      text-align: center;
      // text-transform: uppercase;
      color: #455a64;
      opacity: 0.2;
    }

    &__link {
      background-color: #607d8b;
      display: block;
      width: 200px;
      padding: 5px;
      margin: 10px auto 0;
      color: #fff;
      text-align: center;
      text-decoration: none;
      border-radius: 4px;
      cursor: pointer;
    }
  }
</style>