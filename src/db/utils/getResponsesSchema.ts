import type { ApiSchema } from '../types'

export function getResponsesSchema(schema: ApiSchema) {
  const { responses } = schema
  const content = responses['200'].content
  return Object.keys(content).map(contentType => content[contentType].schema)[0]
}
