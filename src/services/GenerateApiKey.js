import { v4 as uuidv4 } from 'uuid'

export async function GenerateApiKey() {
  return `ha_${uuidv4().replace(/-/g, '')}`
}

export function MaskApiKey(apiKey, length = 8) {
  if (!apiKey || apiKey.length < length) return apiKey
  return `${apiKey.substring(0, length)}${'*'.repeat(apiKey.length - length - 4)}${apiKey.substring(apiKey.length - 4)}`
}