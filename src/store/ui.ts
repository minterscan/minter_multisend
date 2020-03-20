import { EInputMode } from '@/typings'
import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({
  namespaced: true,
  name: 'ui'
})
class UiStore extends VuexModule {
  public isPayload: boolean = false
  public isLoading: boolean = false
  public inputMode: EInputMode = EInputMode.Manual

  get isInputModeManual(): boolean {
    return this.inputMode === EInputMode.Manual
  }

  get isInputModeImport(): boolean {
    return this.inputMode === EInputMode.Import
  }

  // Toggle payload field visibility

  @Mutation
  public commitIsPayload(value: boolean) {
    this.isPayload = value
  }

  // Toggle loading indicator

  @Mutation
  public commitIsLoading(value: boolean) {
    this.isLoading = value
  }

  // Toggle input mode (manual/import)

  @Mutation
  public commitInputMode(inputMode: EInputMode) {
    this.inputMode = inputMode
  }
}

export default UiStore
