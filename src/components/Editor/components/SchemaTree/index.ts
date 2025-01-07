import type { ApiSchema } from '../../types'

export type FieldType = 'object' | 'array' | 'string' | 'number' | 'integer' | 'boolean'

export type SchemaTree = {
  type: FieldType
  field: string
  path: string
  description: string
  children?: SchemaTree
  parentType: FieldType | ''
}[]

export type SchemaTreeProps = {
  schema?: ApiSchema
}

export type SchemaTreeEmits = {
  select: [val: SchemaTree]
}
