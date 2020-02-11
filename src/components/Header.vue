<template>
  <h1 class="header">{{ title }}</h1>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'Header'
})
export default class Header extends Vue {
  @Prop(String) title!: string;
}
</script>

<style lang="scss" scoped>
.header {
  position: absolute;
  right: 15px;
  font-size: 60px;
  text-align: right;
  line-height: 0.6;
  opacity: 0.1;
}
</style>
