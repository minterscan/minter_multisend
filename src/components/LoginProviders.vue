<template>
  <section class="section providers">
    <div class="container">
      <div class="buttons has-addons is-centered">
        <button 
          class="button"
          v-for="(provider, i) in providers"
          :class="{
            'is-info': activeProvider === provider.name
          }"
          :key="i"
          :disabled="dataStore.wallet"
          @click="setActiveProvider(provider.name)"
        >
          <span class="icon is-small">
            <i :class="provider.icon"></i>
          </span>
          <span>{{ provider.title }}</span>
        </button>
      </div>
      <div class="field has-addons">
        <!-- Menemonic Field -->
        <p class="control is-expanded">
          <input 
            class="input"
            type="password"
            v-model="mnemonic"
            placeholder="Mnemonic Phrase"
            v-if="activeProvider === 'mnemonic'"
          >
          <!-- Private Key Field -->
          <input 
            class="input"
            type="password"
            v-model="privateKey"
            placeholder="Private Key"
            v-if="activeProvider === 'privateKey'"
          >
        </p>
        <p class="control">
          <!-- Set Mnemonic Button -->
          <button 
            class="button is-outlined is-info" 
            v-if="!dataStore.wallet && this.activeProvider === 'mnemonic'"
            @click="setMnemonic()"
          >
            Set
          </button>

          <!-- Set Private Key Button -->
          <button 
            class="button is-outlined is-info" 
            v-if="!dataStore.wallet && this.activeProvider === 'privateKey'"
            @click="setPrivateKey()"
          >
            Set
          </button>

          <!-- Clear Button -->
          <button 
            class="button is-outlined is-danger" 
            v-if="dataStore.wallet"
            @click="clear()"
          >
            Clear
          </button>
        </p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Buffer } from 'safe-buffer'
import Getters from '@/mixins/Getters'
import { ILoginProvider } from '@/typings'
import { Component, Vue, Watch, Mixins } from 'vue-property-decorator'
import { walletFromMnemonic, walletFromPrivateKey, Wallet } from 'minterjs-wallet'

@Component({
  name: 'LoginProviders'
})
export default class LoginProviders extends Mixins(Getters) {
  protected mnemonic: string = ''
  protected privateKey: string = ''
  protected activeProvider: string = 'mnemonic'
  protected providers: ILoginProvider[] = [
    {
      name: 'mnemonic',
      title: 'Mnemonic Phrase',
      icon: 'fas fa-sign-in-alt'
    },
    {
      name: 'privateKey',
      title: 'Private Key',
      icon: 'fas fa-key'
    }
  ]

  get isProvider(): boolean {
    return (
      (this.activeProvider === 'mnemonic' && this.mnemonic !== '') ||
      (this.activeProvider === 'privateKey' && this.privateKey !== '')
    )
  }

  @Watch('activeProvider')
  protected onActiveProviderChange() {
    this.mnemonic = ''
    this.privateKey = ''
  }

  protected setActiveProvider(name: string) {
    this.activeProvider = name
  }

  protected setMnemonic() {
    this.dataStore.commitError(null)
    this.dataStore.commitMnemonic(this.mnemonic)
    setTimeout(() => {
      try {
        const wallet = walletFromMnemonic(this.mnemonic)
        const privateKey = wallet.getPrivateKeyString()
        this.dataStore.commitWallet(wallet)
        this.dataStore.commitPrivateKey(privateKey)
      } catch (e) {
        this.dataStore.commitError(e)
      }
    }, 100)
  }

  protected setPrivateKey() {
    this.dataStore.commitError(null)
    this.dataStore.commitPrivateKey(this.privateKey)
    // Decode wallet from PK with delay to display loading properly
    setTimeout(() => {
      try {
        const privateKeyBuffer = Buffer.from(this.privateKey, 'hex')
        const wallet = walletFromPrivateKey(privateKeyBuffer)
        this.dataStore.commitWallet(wallet)
      } catch (e) {
        this.dataStore.commitError(e)
      }
    }, 100 )
  }

  protected clear() {
    this.mnemonic = ''
    this.privateKey = ''
    this.dataStore.commitWallet(null)
  }
}
</script>