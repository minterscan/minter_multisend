<template>
  <div class="input-manual" v-if="uiStore.isInputModeManual">
    <div 
      :key="i"
      class="field is-grouped"
      v-for="(txData, i) in dataStore.txData"
    >
      <div class="field is-expanded has-addons">
        <p class="control is-expanded">
          <input 
            class="input" 
            type="text" 
            placeholder="Address" 
            v-model.trim="txData.to"
            :class="{
              'is-info': isInvalidAddress(txData.to)
            }"
          >
        </p>
        <p class="control">
          <input 
            class="input" 
            type="number" 
            placeholder="Amount" 
            v-model.number="txData.value"
            :class="{
              'is-info': isInvalidValue(txData.value)
            }"
          >
        </p>
        <div class="control">
          <div 
            class="select" 
            :class="{
              'is-info': dataStore.coins.indexOf(txData.coin) === -1
            }"
          >
            <select v-model="txData.coin">
              <option v-for="(coin, i) in dataStore.coins" :key="i">{{ coin }}</option>
            </select>
          </div>
        </div>
      </div>
      <p class="control">
        <button class="button is-outlined is-danger" @click="remove(i)">
          <span class="icon is-small">
            <i class="fas fa-times"></i>
          </span>
        </button>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Getters from '@/mixins/Getters'
import { Component, Mixins } from 'vue-property-decorator'

@Component({
  name: 'ImportManual'
})
export default class SendTxData extends Mixins(Getters) {
  protected remove(index: number) {
    this.dataStore.commitTxDataRemove(index)
  }
}
</script>