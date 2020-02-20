<template>
  <ul class="list">
    <li class="list__item list-item" v-for="poem in poems" :key="poem.id">
      <router-link class="list-item__link" :to="`/poem/${poem.id}`">{{
        poem.title
      }}</router-link>
      <div class="list-item__author">
        _by_
        <router-link :to="`/authors/${poem.author.id}`">{{
          poem.author.name
        }}</router-link>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'List'
})
export default class List extends Vue {
  @Prop(Array) poems!: object[];
}
</script>

<style lang="scss" scoped>
.list {
  padding: 0;
  list-style: none;
  text-align: center;

  &__item {
    padding: 10px;
  }
}

.list-item {
  display: flex;
  position: relative;

  &__link {
    position: relative;
    text-decoration: none;
  }

  &::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    width: 10px;
    height: 20px;
    background-color: #fac227;
    transform: rotate(45deg);
  }
}
</style>
