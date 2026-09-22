export * from './get'

/** 屏幕像素与文档像素的比例，包含祖先元素的视图缩放。 */
export function getElementScale(element: HTMLElement) {
  return element.offsetWidth ? element.getBoundingClientRect().width / element.offsetWidth : 1
}
