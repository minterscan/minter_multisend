<template>
  <div class="notification" v-if="dataStore.hash">
    <button class="delete" @click="close"></button>
    Tx: <a
      target="_blank"
      class="has-text-info"
      :href="`${config.explorerBaseUrl}/tx/${dataStore.hash}`" 
    >
      {{ dataStore.hash }}
    </a>
  </div>
</template>

<script lang="ts">
import Getters from '@/mixins/Getters'
import { Component, Vue, Mixins, Watch } from 'vue-property-decorator'

@Component
export default class SendSuccess extends Mixins(Getters) {
  protected close() {
    this.dataStore.commitHash(null)
  }
}
</script>