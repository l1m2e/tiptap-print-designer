export type ApiSchema = {
  required: string[]
  type: 'object' | 'array' | 'string' | 'number' | 'integer' | 'boolean'
  properties?: Record<string, ApiSchema>
  description: string
  items?: ApiSchema
}
