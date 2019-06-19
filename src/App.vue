<template>
  <div id="app">
    <logo />
    <login-providers />
    <wallet />
    <send />
  </div>
</template>

<script lang="ts">
import Logo from '@/components/Logo.vue'
import Send from '@/components/Send.vue'
import Wallet from '@/components/Wallet.vue'
import LoginProviders from '@/components/LoginProviders.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    Logo,
    Send,
    Wallet,
    LoginProviders
  }
})
export default class App extends Vue {}
</script>
