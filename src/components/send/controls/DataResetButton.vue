<template>
  <button 
    @click="resetData()"
    class="button is-outlined is-danger" 
    :disabled="isControlsDisabled"
  >
    <span class="icon is-small">
      <i class="fas fa-ban"></i>
    </span>
  </button>
</template>

<script lang="ts">
import Getters from '@/mixins/Getters'
import { Component, Mixins } from 'vue-property-decorator'

@Component({
  name: 'DataResetButton'
})
export default class DataResetButton extends Mixins(Getters) {
  protected resetData() {
    this.$dialog.confirm({
        title: 'Reset data',
        message: `Are you sure you want to remove all data?`,
        confirmText: 'Reset',
        type: 'is-danger',
        hasIcon: true,
        icon: 'exclamation-triangle',
        iconPack: 'fa',
        onConfirm: () => {
          this.dataStore.commitTxDataReset()
          this.$toast.open('All data removed!')
        }
    })
  }
}
</script>
