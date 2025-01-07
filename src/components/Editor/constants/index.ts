export interface EditorContext {
  openapiDoc: Ref<any>
  schema: Ref<any>
  data: Ref<any>
}

export const EDITOR_CONTEXT = Symbol('EDITOR_CONTEXT') as InjectionKey<EditorContext>
