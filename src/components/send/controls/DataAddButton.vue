<template>
  <button
    @click="addDataRow()"
    class="button is-outlined is-success"
    :disabled="isControlsDisabled"
  >
    <span class="icon is-small">
      <i class="fas fa-plus"></i>
    </span>
  </button>
</template>

<script lang="ts">
import Getters from '@/mixins/Getters'
import { Component, Mixins } from 'vue-property-decorator'

@Component({
  name: 'DataAddButton'
})
export default class DataAddButton extends Mixins(Getters) {
  protected addDataRow() {
    this.dataStore.commitTxDataPushEmpty()
  }
}
</script>
