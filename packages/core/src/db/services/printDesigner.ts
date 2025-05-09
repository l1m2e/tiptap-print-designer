import type { ApiSchema, DataSchema, SchemaTree } from '../types'
import { db } from '../database'
import { apiSchemaToApiTree } from '../utils/apiSchemaToApiTree'
import { getApiSchemaByPath } from '../utils/getApiSchemaByPath'

/** 更新数据源 */
export async function updateDataSource(dataSource: DataSchema[]) {
  await db.printDesigner.clear()
  return await db.printDesigner.add({ dataSource: JSON.stringify(dataSource) })
}

/** 获取数据源 */
export async function getDataSource(): Promise<DataSchema[]> {
  const res = await db.printDesigner.toCollection().first()
  if (!res)
    return []
  return JSON.parse(res.dataSource)
}

/** 获取API树 */
export async function getApiTree(): Promise<SchemaTree> {
  const data = await getDataSource()

  const filterData = data.filter(item => item.api !== null).flatMap(item => ({
    key: item.key,
    path: item.path,
    schema: getApiSchemaByPath(item.api!.operation, item.path),
  }))

  const schemaData = filterData.map(({ key, schema }) => ({
    type: 'object',
    description: schema.description,
    required: schema.required,
    properties: {
      [key]: schema,
    },
  } as ApiSchema))

  const tree = schemaData.flatMap(item => apiSchemaToApiTree(item))
  return tree
}

/** 生成Mock数据 */
export async function generateMockData() {
  const mockData: Record<string, any> = {}
  const baseMockUrl = localStorage.getItem('mockUrl')
  if (!baseMockUrl)
    throw new Error('Mock URL not found in localStorage')

  const apis = await getDataSource()
  const apiRequests = apis
    .filter(item => item.api)
    .map(async ({ key, api, path }) => {
      try {
        const { path: url, method } = api!
        const mockUrl = baseMockUrl + url
        const response = await fetch(mockUrl, { method })

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`)

        const data = await response.json()
        mockData[key] = data[path]
      }
      catch (error) {
        console.error(`Failed to fetch mock data for ${key}:`, error)
        mockData[key] = null
      }
    })

  await Promise.all(apiRequests)
  return mockData
}
