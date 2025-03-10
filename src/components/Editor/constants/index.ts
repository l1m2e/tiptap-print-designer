export interface EditorContext {
  mode: 'designer' | 'viewer'
  data: Ref<any>
}

export const EDITOR_CONTEXT = Symbol('EDITOR_CONTEXT') as InjectionKey<EditorContext>
