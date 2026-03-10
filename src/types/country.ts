export type Country = {
  name: {
    common: string
  }
  capital?: string[]
  region?: string
  languages?: Record<string, string>
  flags: {
    png: string
    alt?: string
  }
  capitalInfo?: {
    latlng?: [number, number]
  }
  area?: number
}
