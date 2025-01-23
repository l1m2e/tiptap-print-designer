import type { ApiSchema } from '../../types'
import type { Schema } from '../SchemaTree'

export interface DataSchema {
  key: string
  api: ApiSchema | null
  schemaTree: Schema | null
  id: string
}
