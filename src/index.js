// import _ from 'lodash'
import './style.less'
import txt from './file.txt'
import mkd from './about.md'
import { search_test } from './search'
import './search_test.ts'
import { createApp } from 'vue'
import App from '@/start.vue'
createApp(App).mount('#app')
console.log('1', txt)
function component() {
  const element = document.createElement('div')
  element.innerHTML = _.join(['Hello', 'webpack1', mkd], '')
  element.classList.add('hello')
  // consnole.log('finish')
  return element
}
document.body.appendChild(component())

function test() {
  console.log('tree shaking.....')
}
