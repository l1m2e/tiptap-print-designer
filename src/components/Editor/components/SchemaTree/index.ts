export type FieldType = 'object' | 'array' | 'string' | 'number' | 'integer' | 'boolean'

export type Schema = {
  type: FieldType
  field: string
  path: string
  description: string
  children?: SchemaTree
  parentType: FieldType | ''
  id: string
}

export type SchemaTree = Schema[]

export type SchemaTreeProps = {
  tree?: SchemaTree
}

export type SchemaTreeEmits = {
  select: [val: Schema]
}
