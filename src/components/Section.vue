<template>
  <div>
    <h2>{{sectionTitle}}</h2>
    <slot></slot>
    <router-link :to="`/${sectionTitle}`" v-if="typeOfBar">see more</router-link>
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

<style scoped>

</style>