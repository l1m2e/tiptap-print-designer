import type { DefineComponent } from 'vue'
import FormatDialog from '~/Designer/components/FormatDialog/FormatDialog.vue'

type DialogComponent = DefineComponent<any, { open?: (...args: any[]) => any }, any, any, any>

export function useMountDialog<T extends DialogComponent>(Dialog: T) {
  const div = document.createElement('div')
  document.body.appendChild(div)
  const app = createApp(Dialog)
  let dialogRef = app.mount(div) as InstanceType<T> | undefined

  const open = async (...args: any[]) => {
    dialogRef?.open?.(...args)
  }

  onUnmounted(() => {
    app.unmount()
    document.body.removeChild(div)
    dialogRef = undefined
  })

  return { open } as InstanceType<T>
}

export function useFormatDialog() {
  const { open } = useMountDialog(FormatDialog)
  return {
    open,
  }
}
