import { get as radashGet } from 'radash'

/**
 * 从对象中根据路径获取值。路径中的 `.ARRAY_ITEMS` 会被替换为 `[0]`，用于访问数组的第一个元素。
 * 如果未提供路径，则返回整个对象。
 * @param obj - 目标对象
 * @param path - 属性路径字符串，支持使用 `.ARRAY_ITEMS` 表示数组第一个元素
 * @returns 根据路径获取到的值，如果路径为空则返回整个对象
 */
export function get(obj: any, path: string): any {
  const buildPath = path ? path.replace(/\.ARRAY_ITEMS/g, '[0]') : ''
  return buildPath ? radashGet(obj, buildPath) : obj
}
