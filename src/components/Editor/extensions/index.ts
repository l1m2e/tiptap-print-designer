import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import Commands from './Commands'
import Field from './Field'
import FontSize from './FontSize/FontSize'
import Image from './Image'
import suggestion from './SlashCommands'
import TextAlign from './TextAlign'

export default [
  StarterKit,
  TextAlign,
  Field,
  Image,
  FontSize,
  TextStyle.configure({ mergeNestedSpanStyles: true }),
  Commands.configure({ suggestion }),
]
