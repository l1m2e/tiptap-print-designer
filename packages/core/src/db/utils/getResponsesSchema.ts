import type { ApiSchema } from '../types'

/** 获取响应 Schema；文档缺 200/无 content 时返回空对象 Schema，避免上层崩溃 */
export function getResponsesSchema(schema: ApiSchema): ApiSchema {
  const { responses } = schema
  const okResponse: any = responses?.['200'] ?? Object.values(responses ?? {})[0]
  const content = okResponse?.content
  const emptySchema: ApiSchema = { type: 'object', description: '', required: [], properties: {} }

  if (!content)
    return emptySchema
  return Object.keys(content).map(contentType => content[contentType]?.schema)[0] ?? emptySchema
}
