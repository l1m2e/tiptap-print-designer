import type { ApiSchema, DataSchema, SchemaTree } from '../types'
import { get } from '~/utils'
import { db } from '../database'
import { apiSchemaToApiTree } from '../utils/apiSchemaToApiTree'
import { getApiSchemaByPath } from '../utils/getApiSchemaByPath'
import { schemaToMock } from '../utils/schemaToMock'

/** 更新数据源 */
export async function updateDataSource(dataSource: DataSchema[]) {
  await db.printDesigner.clear()
  const source = await db.printDesigner.add({ dataSource: JSON.stringify(dataSource), mockData: '{}', id: 1 })
  await db.printDesigner.update(source, { mockData: JSON.stringify({}) })
  return source
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

/** 生成Mock数据（未配置Mock服务时，从接口文档Schema本地生成示例数据） */
export async function generateMockData() {
  const mockData: Record<string, any> = {}
  const baseMockUrl = localStorage.getItem('TIPTAP_PRINT_DESIGNER_MOCKURL')

  const apis = await getDataSource()
  const apiRequests = apis
    .filter(item => item.api)
    .map(async ({ key, api, path }) => {
      // 无Mock服务或拉取失败时的本地回退，保证只依赖接口文档也能完整预览
      const localMock = () => {
        try {
          return schemaToMock(getApiSchemaByPath(api!.operation, path))
        }
        catch (error) {
          console.error(`Failed to generate mock from schema for ${key}:`, error)
          return null
        }
      }

      if (!baseMockUrl) {
        mockData[key] = localMock()
        return
      }

      try {
        const { path: url, method } = api!
        const mockUrl = baseMockUrl + url
        const response = await fetch(mockUrl, { method })

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`)

        const data = await response.json()
        mockData[key] = get(data, path)
      }
      catch (error) {
        console.error(`Failed to fetch mock data for ${key}:`, error)
        mockData[key] = localMock()
      }
    })

  await Promise.all(apiRequests)
  return mockData
}

/** 获取mock数据 */
export async function getMockData() {
  const res = await db.printDesigner.toCollection().first()
  if (!res)
    return {}
  return JSON.parse(res.mockData)
}

/** 更新mock数据 */
export async function updateMockData(mockData: Record<string, any>) {
  const { id } = await db.printDesigner.toCollection().first() || {}
  if (!id)
    throw new Error('No data source found to update mock data')

  await db.printDesigner.update(id, { mockData: JSON.stringify(mockData) })
  return id
}
