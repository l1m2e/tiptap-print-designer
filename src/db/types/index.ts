import type { OpenAPIV3 } from 'openapi-types'

/** 字段类型 */
export type FieldType = 'object' | 'array' | 'string' | 'number' | 'integer' | 'boolean'

/** API 架构 */
export type ApiSchema = {
  required: string[]
  type: FieldType
  properties?: Record<string, ApiSchema>
  description: string
  items?: ApiSchema
  responses?: any
  operation?: any
  path?: string
  method?: OpenAPIV3.HttpMethods
}

/** 数据源 */
export interface DataSchema {
  key: string
  api: ApiSchema | null
  path: string
  id: string
}

/** 数据架构 */
export type Schema = {
  type: FieldType
  field: string
  path: string
  description: string
  children?: SchemaTree
  parentType: FieldType | ''
  id: string
}

/** 数据架构树 */
export type SchemaTree = Schema[]
