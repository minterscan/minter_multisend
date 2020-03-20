<template>
  <div class="controls">
    <div class="start is-size-6">
      <!-- Reset multisend list data -->
      <data-reset-button />

      <!-- Toggle input mode button -->
      <input-mode-button />

      <!-- Addresses count -->
      <span :class="{
        'has-text-danger': dataStore.validTxData.length > config.addressesLimit
      }">
        <b>{{ dataStore.validTxData.length }} / {{ config.addressesLimit }}</b>&nbsp;addresses
      </span>

      <!-- Payload switcher -->
      <payload-switch />

      <!-- Fee -->
      <span>Fee:&nbsp;<b>{{ dataStore.fee | toFixed(3) }}</b> BIP</span>
    </div>
    <div class="end">
      <!-- Master coin select -->
      <coin-select />

      <!-- Add new row -->
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