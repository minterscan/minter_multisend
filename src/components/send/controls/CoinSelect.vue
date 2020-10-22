<template>
  <!-- Master coin select -->
  <div class="select">
    <select v-model="masterCoinId" :disabled="isControlsDisabled">
      <option v-for="(coin, i) in dataStore.coins" :value="coin.id" :key="i">{{ coin.symbol }}</option>
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
  protected masterCoinId = 0

  get masterCoinSymbol(): string {
    const coin = this.dataStore.coins.find((item) => item.id === this.masterCoinId)

    return coin?.symbol || 'BIP'
  }

  // Show modal dialog on master coin change
  @Watch('masterCoinId')
  protected onMasterCoinIdChange(masterCoin: string) {
    this.$dialog.confirm({
        title: 'Set coin to all data',
        message: `Are you sure you want to set <b>${this.masterCoinSymbol}</b> as coin to all data?`,
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
