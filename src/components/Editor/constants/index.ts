import type { OpenAPI } from 'openapi-types'
import type { ApiSchema } from '../types'

export interface EditorContext {
  openapiDoc: Ref<any>
  schemaTree: Ref<any>
  data: Ref<any>
}

export const EDITOR_CONTEXT = Symbol('EDITOR_CONTEXT') as InjectionKey<EditorContext>
