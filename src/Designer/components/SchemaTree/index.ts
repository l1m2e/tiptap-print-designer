import type { Schema, SchemaTree } from '~/db/types'

export type SchemaTreeProps = {
  tree?: SchemaTree
}

export type SchemaTreeEmits = {
  select: [val: Schema]
}
