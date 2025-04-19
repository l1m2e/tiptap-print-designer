import type { ApiSchema, FieldType, SchemaTree } from '../types'

import { v4 as uuidv4 } from 'uuid'

export function apiSchemaToApiTree(schema: ApiSchema, path: string = '', parentType: FieldType | '' = ''): SchemaTree {
  const nodes: SchemaTree = []

  const transformApiSchema = (schema: ApiSchema) => {
    const { properties = {}, type } = schema
    if (type === 'object' && properties) {
      for (const [key, value] of Object.entries(properties)) {
        const newPath = path ? `${path}.${key}` : key
        const node: SchemaTree[number] = {
          type: value.type,
          field: key,
          path: newPath,
          description: value.description,
          parentType,
          id: uuidv4(),
        }
        if (value.properties || value.items) {
          const children = apiSchemaToApiTree(value, newPath, type)
          children.length > 0 && (node.children = children)
        }
        nodes.push(node)
      }
    }
  }

  if (schema.type === 'object') {
    transformApiSchema(schema)
  }
  else if (schema.type === 'array') {
    schema.items && transformApiSchema(schema.items)
  }

  return nodes
}
