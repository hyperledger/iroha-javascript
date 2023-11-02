import Axios from 'axios'

const axios = Axios.create()

export function setBaseURL(url: string) {
  axios.defaults.baseURL = url
}

export async function prepareConfiguration() {
  await axios.post('/prepare-configuration')
}

export async function clearAll() {
  await axios.post('/clear/all')
}

export async function clearPeerStorage() {
  await axios.post('/clear/peer-storage')
}

export async function startPeer({ genesis }: { genesis?: boolean } = {}) {
  await axios.post('/peer/start', null, { params: { genesis: genesis ?? true } })
}

export async function killPeer() {
  await axios.post('/peer/kill')
}
