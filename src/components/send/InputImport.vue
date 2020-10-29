<template>
  <div class="input-import" v-if="uiStore.isInputModeImport">
    <p class="notification">
      CSV format: 
      <b>address</b>, <b>amount</b>, <b>coin ID</b>. 
      Data should be comma-separated, each item on new line
    </p>
    <!-- CSV field -->
    <p>
      <textarea 
        rows="5"
        class="textarea" 
        placeholder="Mx...001,1,0
Mx...002,2,0
Mx...003,3,0
        " 
        v-model="csv" />
    </p>
  </div>
</template>

<script lang="ts">
import { ITxData } from '@/typings'
import Getters from '@/mixins/Getters'
import { Component, Mixins, Watch } from 'vue-property-decorator'

@Component({
  name: 'InputImport'
})
export default class InputImport extends Mixins(Getters) {
  protected csv: string = ''

  // Parse data on field change
  @Watch('csv')
  protected onCsvChange() {
    this.parseCsv()
  }

  // Parse loop
  protected parseCsv() {
    const rows = this.csv.split('\n')
    const txData = rows.map(this.parseCsvRow)

    this.dataStore.commitTxData(txData)
  }

  // Parse CSV row
  protected parseCsvRow(row: string): ITxData {
    const rawData = row.split(',')
    const to = rawData[0] && rawData[0]?.trim() || ''
    const value = +rawData[1] || 0
    const coin = +rawData[2]?.trim() || 0

    return {
      to,
      value,
      coin
    }
  }
}
</script>