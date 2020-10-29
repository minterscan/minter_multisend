<template>
  <div class="submit">
    <div class="field">
      <button 
        class="button is-success" 
        @click="submit()"
        :disabled="invalid"
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
import { Minter, TX_TYPE, prepareTx, makeSignature } from 'minter-js-sdk'
import { Component, Mixins } from 'vue-property-decorator'

const minterSDK = new Minter({ apiType: 'node', baseURL: config.mainnetUrl })

@Component({
  name: 'Submit'
})
export default class SendSubmit extends Mixins(Getters) {
  get invalid(): boolean {
    return (
      !this.dataStore.wallet ||
      this.isControlsDisabled ||
      !this.dataStore.validTxData.length ||
      this.dataStore.validTxData.length > config.addressesLimit
    )
  }
  // Show modal dialog
  protected submit() {
    this.$dialog.confirm({
      title: 'Send coins',
      message: `Are you sure that data is correct?`,
      confirmText: 'Send',
      type: 'is-warning',
      hasIcon: true,
      icon: 'exclamation-triangle',
      iconPack: 'fa',
      onConfirm: () => {
        this.send()
      }
    })
  }

  // Send transaction
  protected async send() {
    try {
      this.dataStore.commitHash(null)
      this.dataStore.commitError(null)
      this.uiStore.commitIsLoading(true)

      const txParams = {
        type: TX_TYPE.MULTISEND,
        data: {
          list: this.dataStore.validTxData
        },
        message: this.dataStore.payload
      }

      minterSDK.postTx(txParams, { privateKey: `0x${this.dataStore.privateKey}` })
        .then((data: { hash: string }) => {
          this.dataStore.commitHash(data.hash)
          this.uiStore.commitIsLoading(false)
        })
        .catch((e: AxiosError) => {
          if (e.response && e.response.data.error.message) {
            return this.dataStore.commitError(new Error(e.response.data.error.message))
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