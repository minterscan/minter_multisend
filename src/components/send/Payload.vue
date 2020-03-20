<template>
  <div class="payload" v-if="uiStore.isPayload">
    <!-- Payload field -->
    <textarea 
      rows="3"
      class="textarea" 
      placeholder="Message" 
      v-model="payload" />
  </div>
</template>

<script lang="ts">
import Getters from '@/mixins/Getters'
import { Component, Mixins, Watch } from 'vue-property-decorator'

@Component
export default class SendPayload extends Mixins(Getters) {
  protected payload: string = ''

  // Set payload to store on field change
  @Watch('payload')
  protected onPayloadChange(payload: string) {
    this.dataStore.commitPayload(payload)
  }

  // Reset payload on payload switcher toggle
  @Watch('uiStore.isPayload')
  protected onIsPayloadChange(value: boolean) {
    if (!value) { this.payload = '' }
  }
}
</script>