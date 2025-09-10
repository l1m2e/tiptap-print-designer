export interface PagerSetting {
  paperType: string
  style: {
    width: string
    height: string
    padding: string
    lineHeight: string
    letterSpacing: string
  }
}
export const PAPER_KEY = Symbol('PAPER_KEY') as InjectionKey<Ref<PagerSetting>>

export { default as Paper } from './Paper.vue'
export { default as PaperContent } from './PaperContent.vue'
export { default as PaperTrigger } from './PaperTrigger.vue'
