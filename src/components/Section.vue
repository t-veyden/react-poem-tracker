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

    &__title {
      margin-bottom: 5px;
      font-size: 34px;
      // font-weight: 300;
      text-align: center;
      // text-transform: uppercase;
      opacity: 0.1;
    }

    &__link {
      display: inline-block;
      width: 100%;
      margin-top: 10px;
      text-align: center;
      text-decoration: none;
      color: #535251;
      cursor: pointer;
    }
  }
</style>