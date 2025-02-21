import type { OpenAPI } from 'openapi-types'
import Dexie, { type Table } from 'dexie'

export class PrintDesignerDB extends Dexie {
  openapiDoc!: Table<{ doc: OpenAPI.Document, id?: number }>

  constructor() {
    super('PrintDesignerDB')
    this.version(1).stores({
      openapiDoc: '++id',
    })
  }
}

export const db = new PrintDesignerDB()
