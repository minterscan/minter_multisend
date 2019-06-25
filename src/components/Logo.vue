<template>
  <div class="logo">
    <img alt="Minterscan" src="img/minter.png" width="100">
    <div class="title is-5 has-text-centered">Minter Multisend</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Logo'
})
export default class Logo extends Vue {}
</script>