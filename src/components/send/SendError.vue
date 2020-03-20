<template>
  <div class="notification" v-if="dataStore.error">
    <!-- Error message -->
    <p v-if="dataStore.error" class="has-text-danger">
      {{ dataStore.error.message }}
    </p>
  </div>
</template>

<script lang="ts">
import Getters from '@/mixins/Getters'
import { Component, Mixins } from 'vue-property-decorator'

@Component
export default class SendError extends Mixins(Getters) {}
</script>