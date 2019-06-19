export interface IWallet {
  getAddress(): ArrayBuffer | Uint8Array
  getAddressString(): string
  getMnemonic(): string
  getPrivateKey(): string
  getPrivateKeyString(): string
  getPublicKey(): ArrayBuffer | Uint8Array
  getPublicKeyString(): string
}

export interface ILoginProvider {
  name: string
  title: string
  icon: string
}

export interface ITxData {
  to: string
  value: number
  coin?: string
}

export interface ICoin {
  crr: number
  volume: number
  reserve_balance: string
  name: string
  symbol: string
}

export enum EInputMode {
  Manual = 'manual',
  Import = 'import'
}
