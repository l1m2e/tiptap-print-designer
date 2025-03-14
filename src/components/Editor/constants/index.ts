import type { Editor } from '@tiptap/vue-3'
import type { ShallowRef } from 'vue'

export interface EditorContext {
  editor: ShallowRef<Editor | undefined, Editor | undefined>
  mode: 'designer' | 'viewer'
  data: Ref<any>
}

export const EDITOR_CONTEXT = Symbol('EDITOR_CONTEXT') as InjectionKey<EditorContext>
