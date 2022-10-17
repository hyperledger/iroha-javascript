import type * as lib from '../lib'
import Axios from 'axios'

const axios = Axios.create()

export function setBaseURL(url: string) {
  axios.defaults.baseURL = url
}

export async function setConfiguration(configs: lib.IrohaConfiguration) {
  await axios.post('/configuration', configs)
}

export async function cleanConfiguration() {
  await axios.delete('/configuration')
}

export async function cleanSideEffects(kuraBlockStorePath: string) {
  await axios.delete('/side-effects', { params: { kura_block_store_path: kuraBlockStorePath } })
}

export async function startPeer({ genesis, toriiApiURL }: { genesis?: boolean; toriiApiURL: string }) {
  await axios.post('/peer/start', null, { params: { genesis: genesis ?? true, torii_api_url: toriiApiURL } })
}

export async function killPeer() {
  await axios.post('/peer/kill', null)
}
