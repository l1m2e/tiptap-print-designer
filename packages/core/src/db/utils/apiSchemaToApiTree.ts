import type { ApiSchema, FieldType, SchemaTree } from '../types'

import { v4 as uuidv4 } from 'uuid'

/**
 * 将 API Schema 转换为树形结构
 * 使用生成器模式，更简洁高效
 */
export function apiSchemaToApiTree(schema: ApiSchema, path: string = '', parentType: FieldType | '' = ''): SchemaTree {
  return [...generateSchemaNodes(schema, path, parentType)]
}

/**
 * 生成器函数：逐个生成 schema 节点
 */
function* generateSchemaNodes(schema: ApiSchema, path: string, parentType: FieldType | ''): Generator<SchemaTree[number]> {
  const properties = getProperties(schema)
  if (!properties) return

  for (const [key, value] of Object.entries(properties)) {
    const newPath = buildPath(path, key)
    const node = createSchemaNode(key, value, newPath, parentType)

    node.children = generateChildren(value, newPath)
    yield node
  }
}

/**
 * 获取 schema 的 properties
 */
function getProperties(schema: ApiSchema): Record<string, ApiSchema> | null {
  if (schema.type === 'object' && schema.properties) {
    return schema.properties
  }
  if (schema.type === 'array' && schema.items?.properties) {
    return schema.items.properties
  }
  return null
}

/**
 * 生成子节点
 */
function generateChildren(value: ApiSchema, parentPath: string): SchemaTree | undefined {
  if (value.properties) {
    return [...generateSchemaNodes(value, parentPath, value.type)]
  }

  if (value.type === 'array' && value.items) {
    const itemsPath = buildPath(parentPath, 'ARRAY_ITEMS')
    const itemsNode = createSchemaNode('ARRAY_ITEMS', value.items, itemsPath, value.type)

    if (value.items.properties) {
      itemsNode.children = [...generateSchemaNodes(value.items, itemsPath, 'array')]
    }

    return [itemsNode]
  }

  return undefined
}

/**
 * 构建路径
 */
function buildPath(currentPath: string, key: string): string {
  return currentPath ? `${currentPath}.${key}` : key
}

/**
 * 创建 schema 节点
 */
function createSchemaNode(
  key: string,
  value: ApiSchema,
  path: string,
  parentType: FieldType | '',
): SchemaTree[number] {
  return {
    type: value.type,
    field: key,
    path,
    description: value.description,
    parentType,
    id: uuidv4(),
  }
}
