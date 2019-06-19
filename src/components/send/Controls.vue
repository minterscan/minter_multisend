<template>
  <div class="controls">
    <div class="start is-size-6">
      <data-reset-button />
      <input-mode-button />
      <span><b>{{ dataStore.validTxData.length }}</b>&nbsp;addresses</span>
      <payload-switch />
      <span>Fee:&nbsp;<b>{{ dataStore.fee | toFixed(3) }}</b> BIP</span>
    </div>
    <div class="end">
      <coin-select />
      <data-add-button />
    </div>
  </div>
</template>

<script lang="ts">
import Getters from '@/mixins/Getters'
import CoinSelect from '@/components/send/controls/CoinSelect.vue'
import PayloadSwitch from '@/components/send/controls/PayloadSwitch.vue'
import InputModeButton from '@/components/send/controls/InputModeButton.vue'
import DataAddButton from '@/components/send/controls/DataAddButton.vue'
import DataResetButton from '@/components/send/controls/DataResetButton.vue'
import { Component, Mixins } from 'vue-property-decorator'

@Component({
  name: 'Controls',
  components: { DataAddButton, DataResetButton, InputModeButton, CoinSelect, PayloadSwitch }
})
export default class SendContols extends Mixins(Getters) {}
</script>