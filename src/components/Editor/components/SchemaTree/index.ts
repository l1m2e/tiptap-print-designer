import type { ApiSchema } from '../../types'

export type FieldType = 'object' | 'array' | 'string' | 'number' | 'integer' | 'boolean'

export type Schema = {
  type: FieldType
  field: string
  path: string
  description: string
  children?: SchemaTree
  parentType: FieldType | ''
}

export type SchemaTree = Schema[]

export type SchemaTreeProps = {
  schema?: ApiSchema
  tree?: SchemaTree
}

export type SchemaTreeEmits = {
  select: [val: SchemaTree]
}
