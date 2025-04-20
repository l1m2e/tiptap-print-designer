import type { OpenAPI, OpenAPIV3 } from 'openapi-types'
import SwaggerParser from '@apidevtools/swagger-parser'
import { db } from '../database'

/** 更新接口文档 */
export async function updateDoc(URL: string): Promise<number> {
  const swaggerParser = new SwaggerParser()
  const doc = await swaggerParser.dereference(URL)
  await db.openapiDoc.clear()
  return await db.openapiDoc.add({ doc })
}

/** 获取接口文档 */
export async function getDoc(): Promise<OpenAPI.Document> {
  const openapiDoc = await db.openapiDoc.toCollection().first()
  if (!openapiDoc)
    throw new Error('文档不存在')
  return openapiDoc.doc
}

/** 获取接口列表 */
export async function getApiList() {
  const doc = await getDoc()
  if (!doc?.paths)
    return []
  return Object.entries(doc.paths).flatMap(([path, pathItem]) =>
    Object.entries(pathItem).map(([method, operation]) => ({
      path,
      method: method as OpenAPIV3.HttpMethods,
      label: (operation as OpenAPIV3.OperationObject).summary || `Unnamed ${method.toUpperCase()} ${path}`,
      value: `${method.toUpperCase()}#${path}`,
      operation,
    })),
  )
}
