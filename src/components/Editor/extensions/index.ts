import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import Field from './Field'
import Image from './Image'
import TextAlign from './TextAlign'

export default [StarterKit, TextAlign, Field, Image, TextStyle.configure({ mergeNestedSpanStyles: true })]
