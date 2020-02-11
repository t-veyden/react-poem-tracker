<template>
  <div class="poem" v-if="isLoaded" ref="poemBox">
    <p class="poem__author">by {{ poemData.author.name }}</p>
    <div class="poem__text-box" v-if="Array.isArray(poemData.text)">
      <span
        class="poem__text-line"
        v-for="(line, idx) in poemData.text"
        :key="idx"
        >{{ line }}</span
      >
    </div>
    <div v-else v-html="poemData.text" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

interface singlePoem {
  author: object;
}

@Component({
  name: 'Poem'
})
export default class Poem extends Vue {
  @Prop(Object) poemData!: singlePoem;
  // TODO shouldn't be manipulating or accessing DOM at all
  @Watch('poemData.text', { immediate: true, deep: true })
  handler() {
    setTimeout(() => {
      if (this.$refs.poemBox !== undefined) {
        this.height = this.$refs.poemBox.clientHeight;
        this.getBoxHeight();
      }
    }, 0);
  }
  height = 0;

  get isLoaded() {
    return this.poemData.author !== undefined;
  }

  getBoxHeight() {
    this.$emit('assignHeight', this.height);
  }
}
</script>

<style lang="scss" scoped>
.poem {
  padding: 15px;

  &__author {
    position: relative;
    padding: 5px 0;
    text-align: right;
    font-size: 30px;
    font-weight: bold;
    opacity: 0.7;
    transform: translateX(10px);

    &::before {
      content: '';
      position: absolute;
      top: -10px;
      right: 0;
      width: 70%;
      height: 40px;
      background-color: rgb(250, 194, 39);
      z-index: -1;
    }
  }

  &__text-box {
    display: flex;
    flex-direction: column;
  }
}
</style>
