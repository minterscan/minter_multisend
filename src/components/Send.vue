<template>
  <section class="section send">
    <div class="container">
      <!-- Control buttons -->
      <controls />

      <!-- If no transaction hash —> show form -->
      <template v-if="dataStore.hash === null">
        <!-- Manual input form -->
        <input-manual />

        <!-- Import CSV form -->
        <input-import />

        <!-- Payload field -->
        <payload />

        <!-- Loading indicator -->
        <b-loading :is-full-page="false" :active.sync="uiStore.isLoading" :can-cancel="false"></b-loading>
      </template>

      <!-- Success transaction message -->
      <send-success />

      <!-- Error transaction message -->
      <send-error />

      <!-- Submit button -->
      <submit />
    </div>
  </section>
</template>

<script lang="ts">
import { ITxData, ICoin } from '@/typings'
import { AxiosResponse } from 'axios'
import Getters from '@/mixins/Getters'
import explorer from '@/services/explorer'
import Submit from '@/components/send/Submit.vue'
import Payload from '@/components/send/Payload.vue'
import SendError from '@/components/send/SendError.vue'
import SendSuccess from '@/components/send/SendSuccess.vue'
import Controls from '@/components/send/Controls.vue'
import InputManual from '@/components/send/InputManual.vue'
import InputImport from '@/components/send/InputImport.vue'
import { Component, Mixins, Watch } from 'vue-property-decorator'

const FEE_UNIT = 0.001

@Component({
  name: 'Send',
  components: {
    Submit,
    SendError,
    SendSuccess,
    Payload,
    Controls,
    InputManual,
    InputImport
  }
})
export default class Send extends Mixins(Getters) {
  // Change coin for each item in multisend list on master coin change
  @Watch('dataStore.masterCoin')
  protected onMasterCoinChange(coin: string) {
    this.dataStore.txData.map((txData: ITxData, index: number) => {
      if (this.dataStore.txData[index]) {
        this.dataStore.commitTxDataCoinChange({ coin, index })
      }
    })
  }

  // Recalculate fee on list / payload change
  @Watch('dataStore.payload')
  @Watch('dataStore.txData', { deep: true })
  protected onTxDataChange() {
    if (this.dataStore.validTxData.length === 0) { return }

    const multisendFee = 10 + (this.dataStore.validTxData.length - 1) * 5
    const payloadBytesLength = (new TextEncoder().encode(this.dataStore.payload)).length
    const payloadFee = payloadBytesLength ? payloadBytesLength * 2 : 0
    const fee = (multisendFee + payloadFee) * FEE_UNIT

    this.dataStore.commitFee(fee)
  }

  // Load coins from API before mount
  protected beforeMount() {
    explorer.get('/coins')
      .then((response: AxiosResponse) => {
        const coins = response.data && response.data.data
        const coinsSymbols = coins
          .map((coin: ICoin) => {
            return coin.symbol
          })
          .sort()

        this.dataStore.commitCoins(coinsSymbols)
      })
      .catch((e: Error) => {
        this.dataStore.commitError(e)
      })
  }

  // Reset form
  protected reset() {
    this.dataStore.dispatchReset()
  }
}
</script>
