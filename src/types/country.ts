export type Country = {
  name: {
    common: string
    official: string
  }
  capital?: string[]
  region?: string
  languages?: Record<string, string>
  currencies?: Record<string, {
    name: string
    symbol?: string
  }>
  flags: {
    png: string
    alt?: string
  }
  capitalInfo?: {
    latlng?: [number, number]
  }
  area?: number
}
