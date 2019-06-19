<template>
  <b-switch v-model="isPayload" type="is-info" :disabled="isControlsDisabled">
    message
  </b-switch>
</template>

<script lang="ts">
import Getters from '@/mixins/Getters'
import { Component, Mixins, Watch } from 'vue-property-decorator'

@Component({
  name: 'PayloadSwitch'
})
export default class PayloadSwitch extends Mixins(Getters) {
  protected isPayload: boolean = false

  @Watch('isPayload')
  protected onIsPayloadChange(value: boolean) {
    this.uiStore.commitIsPayload(value)
  }
}
</script>
