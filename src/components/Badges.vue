<template>
  <div class="badges">
    <div class="badge">
      <img src="" alt="badge1" height="50" width="50" />
      <span>badge title</span>
    </div>
    <div class="badge">
      <img src="" alt="badge2" height="50" width="50" />
      <span>badge title</span>
    </div>
    <div class="badge">
      <img src="" alt="badge3" height="50" width="50" />
      <span>badge title</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'Badges'
})
export default class Badges extends Vue {}
</script>

<style lang="scss">
.badges {
  display: flex;
  justify-content: center;
}

.badge {
  display: flex;
  flex-direction: column;
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;

  img {
    outline: 1px solid darkgray;
  }
}
</style>
