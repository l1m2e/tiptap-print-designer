import type { ApiSchema } from '../types'
import { getResponsesSchema } from './getResponsesSchema'

export function getApiSchemaByPath(schema: ApiSchema, path: string): ApiSchema {
  const paths = path.split('.')
  let currentSchema = getResponsesSchema(schema)

  if (!path)
    return currentSchema

  for (const key of paths) {
    if (currentSchema.type === 'object') {
      currentSchema = currentSchema.properties?.[key]
    }
    if (currentSchema.type === 'array') {
      currentSchema = currentSchema.items
    }
  }

  return currentSchema
}
