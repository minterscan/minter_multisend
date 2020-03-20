<template>
  <section class="section wallet">
    <div class="container">
      <div class="notification">
        <!-- Initial state -->
        <p v-if="!dataStore.error && !dataStore.wallet">
          Enter mnemonic phrase or private key
        </p>

        <!-- Wallet -->
        <p v-if="dataStore.wallet">
          Wallet: <a :href="addressUrl" target="_blank" class="has-text-info">{{ address }}</a>
        </p>

        <!-- Loading -->
        <b-loading :is-full-page="false" :active.sync="uiStore.isLoading" :can-cancel="false"></b-loading>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import config from '@/config'
import { IWallet } from '@/typings'
import Getters from '@/mixins/Getters'
import { Component, Mixins, Watch } from 'vue-property-decorator'

@Component
export default class Wallet extends Mixins(Getters) {
  get addressUrl(): string {
    return `${config.explorerBaseUrl}/address/${this.address}`
  }

  // Enable loading indicator on Seed / PK change

  @Watch('dataStore.mnemonic')
  @Watch('dataStore.privateKey')
  protected onProviderChange(value: string) {
    if (value) { this.uiStore.commitIsLoading(true) }
  }

  // Disable loading indicator if Seed / PK is correct

  @Watch('dataStore.wallet')
  protected onWalletChange(value: IWallet | null) {
    if (value) { this.uiStore.commitIsLoading(false) }
  }

  // Disable loading indicator on Seed / PK error

  @Watch('dataStore.error')
  protected onErrorChange(value: Error | null) {
    if (value) { this.uiStore.commitIsLoading(false) }
  }
}
</script>