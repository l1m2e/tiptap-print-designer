import { clone } from 'radash'
/**
 * 使用 Promise 弹窗
 * @param show 弹窗显示状态
 * @param openFn 打开弹窗时的回调函数 可以处理传递过来的参数
 * @example
 * const { open, confirm, closed } = usePromiseDialog<string>(show)
 */
export function usePromiseDialog<T, OpenParams extends any[] = []>(show: Ref<boolean>, openFn?: (...args: OpenParams) => void) {
  let resolve!: (value: T) => void
  let reject!: (reason: any) => void

  async function open(...args: OpenParams) {
    const { promise, resolve: _resolve, reject: _reject } = Promise.withResolvers<T>()
    resolve = _resolve
    reject = _reject
    show.value = true
    await nextTick()
    openFn?.(...args)
    return promise
  }

  function closed() {
    reject('closed')
  }

  function confirm(value: T) {
    show.value = false
    resolve(clone(value))
  }

  return { confirm, open, closed }
}
