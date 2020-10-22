import { IWallet, ITxData, ICoin, INetworkCoin } from '@/typings'
import {
  Module,
  VuexModule,
  Mutation,
  Action
} from 'vuex-module-decorators'

const ADDRESS_REGEX = /^Mx([A-Fa-f0-9]{40})$/gi
const EMPTY_TX_DATA = {
  to: '',
  coin: 0,
  value: 0
}

@Module({
  namespaced: true,
  name: 'data'
})
class DataStore extends VuexModule {
  public wallet: IWallet | null = null
  public mnemonic: string = ''
  public privateKey: string = ''
  public hash: string | null = null
  public error: Error | null = null
  public masterCoin: string = 'BIP'
  public coins: ICoin[] = [{
    id: 0,
    symbol: 'BIP'
  }]
  public fee: number = 0
  public payload: string = ''
  public txData: ITxData[] = [{ ...EMPTY_TX_DATA }]

  get validTxData(): ITxData[] {
    return this.txData.filter((data: ITxData) => {
      return data.to.match(ADDRESS_REGEX) && !isNaN(data.value)
    })
  }

  // PROVIDERS

  @Mutation
  public commitMnemonic(mnemonic: string) {
    this.mnemonic = mnemonic
  }

  @Mutation
  public commitPrivateKey(privateKey: string) {
    this.privateKey = privateKey
  }

  @Mutation
  public commitWallet(wallet: IWallet | null) {
    this.wallet = wallet
  }

  // Coins

  @Mutation
  public commitCoins(coins: ICoin[]) {
    this.coins = coins
  }

  // Master Coin

  @Mutation
  public commitMasterCoin(masterCoin: string) {
    this.masterCoin = masterCoin
  }

  // TX DATA

  @Mutation
  public commitTxData(txData: ITxData[]) {
    this.txData = txData
  }

  // Add empty item to multisend list

  @Mutation
  public commitTxDataPushEmpty() {
    this.txData.push({ ...EMPTY_TX_DATA })
  }

  // Change coin for ALL addresses

  @Mutation
  public commitTxDataCoinChange(data: { coin: number; index: number }) {
    this.txData[data.index].coin = data.coin
  }

  // Remove address from list

  @Mutation
  public commitTxDataRemove(index: number) {
    this.txData.splice(index, 1)
  }

  // Reset form data

  @Mutation
  public commitTxDataReset() {
    this.txData = [{ ...EMPTY_TX_DATA }]
  }

  // Fee

  @Mutation
  public commitFee(fee: number) {
    this.fee = fee
  }

  // Hash

  @Mutation
  public commitHash(hash: string | null) {
    this.hash = hash
  }

  // Payload

  @Mutation
  public commitPayload(payload: string) {
    this.payload = payload
  }

  // Error

  @Mutation
  public commitError(e: Error | null) {
    this.error = e
  }

  // Reset form

  @Action
  public dispatchReset() {
    this.txData = [{ ...EMPTY_TX_DATA }]
    this.error = null
    this.hash = ''
    this.masterCoin = 'BIP'
    this.payload = ''
  }
}

export default DataStore
