import type { OpenAPIV3 } from 'openapi-types'

export type ApiSchema = {
  required: string[]
  type: 'object' | 'array' | 'string' | 'number' | 'integer' | 'boolean'
  properties?: Record<string, ApiSchema>
  description: string
  items?: ApiSchema
  responses?: any
  operation?: any
  path?: string
  method?: OpenAPIV3.HttpMethods
}
