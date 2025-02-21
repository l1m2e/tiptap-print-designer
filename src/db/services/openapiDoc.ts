import type { OpenAPI } from 'openapi-types'
import SwaggerParser from '@apidevtools/swagger-parser'
import { db } from '../database'

export const openapiDoc = {
  /** 更新接口文档 */
  async update(URL: string): Promise<number> {
    const swaggerParser = new SwaggerParser()
    const doc = await swaggerParser.dereference(URL)
    await db.openapiDoc.clear()
    return await db.openapiDoc.add({ doc })
  },

  /** 获取接口文档 */
  async get(): Promise<OpenAPI.Document> {
    const openapiDoc = await db.openapiDoc.toCollection().first()
    if (!openapiDoc)
      throw new Error('文档不存在')
    return openapiDoc.doc
  },
}
