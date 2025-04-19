import type { Table } from 'dexie'
import type { OpenAPI } from 'openapi-types'

import Dexie from 'dexie'

export class PrintDesignerDB extends Dexie {
  openapiDoc!: Table<{
    doc: OpenAPI.Document
    id?: number
  }>

  printDesigner!: Table<{
    dataSource: string
  }>

  constructor() {
    super('PrintDesignerDB')
    this.version(1).stores({
      openapiDoc: '++id',
      printDesigner: '++id',
    })
  }
}

export const db = new PrintDesignerDB()
