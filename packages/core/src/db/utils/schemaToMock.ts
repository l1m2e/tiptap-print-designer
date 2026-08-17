import type { ApiSchema } from '../types'

/**
 * 从接口文档 Schema 本地生成中性的示例数据（后端文档通常没有 example，按类型/中文描述生成占位值）
 * 数据形状与 Mock 服务返回一致；个性化数据可在设置的「Mock数据」面板中编辑
 */
export function schemaToMock(schema: ApiSchema | undefined, key = '', visited: Set<ApiSchema> = new Set()): any {
  // visited 防止自引用 Schema 无限递归，重复节点返回 null
  if (!schema || visited.has(schema))
    return null
  visited.add(schema)

  try {
    if (schema.example !== undefined)
      return schema.example
    if (schema.default !== undefined)
      return schema.default
    if (schema.enum?.length)
      return schema.enum[0]

    switch (schema.type) {
      case 'object': {
        const result: Record<string, any> = {}
        for (const [k, v] of Object.entries(schema.properties ?? {}))
          result[k] = schemaToMock(v, k, visited)
        return result
      }
      case 'array':
        return [schemaToMock(schema.items, key, visited), schemaToMock(schema.items, key, visited)]
      case 'string':
        if (schema.format === 'date')
          return '2026-01-01'
        if (schema.format === 'date-time')
          return '2026-01-01 12:00:00'
        return schema.description || key || '示例文本'
      case 'number':
      case 'integer':
        return 100
      case 'boolean':
        return true
      default:
        return null
    }
  }
  finally {
    visited.delete(schema)
  }
}
