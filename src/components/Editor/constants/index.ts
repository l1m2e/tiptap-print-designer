import type { SchemaTree } from '../components/SchemaTree'

export interface EditorContext {
  openapiDoc: Ref<any>
  schemaTree: Ref<SchemaTree>
  data: Ref<any>
}

export const EDITOR_CONTEXT = Symbol('EDITOR_CONTEXT') as InjectionKey<EditorContext>
