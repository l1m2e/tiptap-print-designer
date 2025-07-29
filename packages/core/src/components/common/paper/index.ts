export const PAPER_KEY = Symbol('PAPER_KEY') as InjectionKey<{ size: Ref<[string, string]>, paperType: Ref<string>, padding: Ref<number> }>

export { default as Paper } from './Paper.vue'
export { default as PaperContent } from './PaperContent.vue'
export { default as PaperTrigger } from './PaperTrigger.vue'
