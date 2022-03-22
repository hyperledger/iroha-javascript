import { createApp } from 'vue'
import App from './App.vue'
import { Logger } from '@iroha2/data-model'
import { crypto } from './crypto'
import { setCrypto } from '@iroha2/client'

setCrypto(crypto)
new Logger().mount()
localStorage.debug = '*'

createApp(App).mount('#app')
