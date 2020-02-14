<template>
  <div class="authorization">
    <t-header title="keep your stuff" />

    <div class="authorization__sign-in sign-in">
      <p class="sign-in__title">
        <v-icon>double_arrow</v-icon>
        i already have an account
      </p>
      <form class="sign-in__form" @submit.prevent="submitForm">
        <v-text-field type="email" label="email" v-model="signInData.email" />
        <v-text-field
          type="password"
          label="password"
          v-model="signInData.password"
        />
        <v-btn class="sign-in__submit" type="submit">submit</v-btn>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import THeader from '../components/Header.vue';

@Component({
  name: 'Authorization',
  components: {
    THeader
  }
})
export default class Authorization extends Vue {
  signInData = {
    email: '',
    password: ''
  };

  submitForm() {
    this.$store.dispatch('admin/signIn', this.signInData);
  }
}
</script>

<style lang="scss" scoped>
.authorization {
  display: flex;
  flex-direction: column;

  &__sign-in {
    margin-top: 60px;
  }
}

.sign-in {
  &__title {
    font-size: 21px;
    font-weight: bold;
    opacity: 0.9;
  }

  &__submit {
    float: right;
  }
}
</style>
