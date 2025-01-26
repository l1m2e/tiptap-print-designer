import type { ApiSchema } from '../../types'

export interface DataSchema {
  key: string
  api: ApiSchema | null
  path: string
  id: string
}
