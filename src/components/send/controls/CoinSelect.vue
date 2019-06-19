<template>
  <div class="select">
    <select v-model="masterCoin" :disabled="isControlsDisabled">
      <option v-for="(coin, i) in dataStore.coins" :key="i">{{ coin }}</option>
    </select>
  </div>
</template>

<script lang="ts">
import Getters from '@/mixins/Getters'
import { Component, Mixins, Watch } from 'vue-property-decorator'

@Component({
  name: 'CoinSelect'
})
export default class CoinSelect extends Mixins(Getters) {
  protected masterCoin: string = 'BIP'

  @Watch('masterCoin')
  protected onMasterCoinChange(masterCoin: string) {
    this.$dialog.confirm({
        title: 'Set coin to all data',
        message: `Are you sure you want to set <b>${masterCoin}</b> as coin to all data?`,
        confirmText: 'Set',
        type: 'is-warning',
        hasIcon: true,
        icon: 'exclamation-triangle',
        iconPack: 'fa',
        onConfirm: () => {
          this.dataStore.commitMasterCoin(masterCoin)
          this.$toast.open('Coin changed!')
        }
    })
  }
}
</script>
