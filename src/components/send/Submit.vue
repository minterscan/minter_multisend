<template>
  <div class="submit">
    <div class="field">
      <button 
        class="button is-success" 
        @click="submit()"
        :disabled="!dataStore.wallet || isControlsDisabled"
      >
        Send
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import config from '@/config'
import Getters from '@/mixins/Getters'
import mainnet from '@/services/mainnet'
import { AxiosError, AxiosResponse } from 'axios'
import { Minter, MultisendTxParams } from 'minter-js-sdk'
import { Component, Mixins } from 'vue-property-decorator'

const minterSDK = new Minter({ apiType: 'node', baseURL: config.mainnetUrl })

@Component({
  name: 'Submit'
})
export default class SendSubmit extends Mixins(Getters) {
  protected submit() {
    this.$dialog.confirm({
        title: 'Send coins',
        message: `Are you sure that data is correct?`,
        confirmText: 'Set',
        type: 'is-warning',
        hasIcon: true,
        icon: 'exclamation-triangle',
        iconPack: 'fa',
        onConfirm: () => {
          this.send()
        }
    })
  }

  protected async send() {
    try {
      this.dataStore.commitHash(null)
      this.dataStore.commitError(null)
      this.uiStore.commitIsLoading(true)
      const txParams = new MultisendTxParams({
          chainId: 1,
          privateKey: this.dataStore.privateKey,
          list: this.dataStore.validTxData,
          feeCoinSymbol: 'BIP',
          message: this.dataStore.payload,
          signatureType: 1,
          type: '0x0D'
      })

      minterSDK.postTx(txParams)
        .then((hash: string) => {
          this.dataStore.commitHash(hash)
          this.uiStore.commitIsLoading(false)
        })
        .catch((e: AxiosError) => {
          if (e.response && e.response.data.error.data) {
            return this.dataStore.commitError(new Error(e.response.data.error.data))
          }
          if (e.response && e.response.data.error.tx_result) {
            return this.dataStore.commitError(new Error(e.response.data.error.tx_result.message))
          }

          const error = e.response ? e.response.data : e
          this.dataStore.commitError(error)
          this.uiStore.commitIsLoading(false)
        })
    } catch (e) {
      this.dataStore.commitError(e)
      this.uiStore.commitIsLoading(false)
    }
  }
}
</script>