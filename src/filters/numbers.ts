import Vue from 'vue'

Vue.filter('toFixed', (num: number, precision: number = 2) => {
  return num.toFixed(precision)
})
