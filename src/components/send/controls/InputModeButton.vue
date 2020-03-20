<template>
  <div>
    <!-- Import mode -->
    <button 
      title="Import"
      v-if="uiStore.isInputModeManual"
      class="button is-outlined is-info" 
      @click="setInputModeImport()"
      :disabled="isControlsDisabled"
    >
      <span class="icon is-small">
        <i class="fas fa-file-import"></i>
      </span>
    </button>

    <!-- Manual mode -->
    <button
      title="Manual"
      v-if="uiStore.isInputModeImport"
      class="button is-outlined is-info" 
      @click="setInputModeManual()"
      :disabled="isControlsDisabled"
    >
      <span class="icon is-small">
        <i class="fas fa-table"></i>
      </span>
    </button>
  </div>
</template>

<script lang="ts">
import Getters from '@/mixins/Getters'
import { EInputMode } from '@/typings'
import { Component, Mixins } from 'vue-property-decorator'

@Component({
  name: 'InputModeButton',
  components: { InputModeButton }
})
export default class InputModeButton extends Mixins(Getters) {
  protected setInputModeManual() {
    this.uiStore.commitInputMode(EInputMode.Manual)
  }

  protected setInputModeImport() {
    this.uiStore.commitInputMode(EInputMode.Import)
  }
}
</script>
