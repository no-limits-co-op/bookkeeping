import { PageObjectResponse, QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'

type SelectType = {
  title: string
  color: string
}

export interface DataItem {
  id: string
  Years: string
  Account: number
  Date: string
  Type: SelectType
  Resource: SelectType
  Desc: string
}

export class DatabaseORM {
  sourceData: QueryDatabaseResponse
  dataItems: DataItem[]

  constructor(originData: QueryDatabaseResponse) {
    this.sourceData = originData
    this.dataItems = originData?.results.map((item: PageObjectResponse) => ({
      id: item.id,
      ...this.serializeDataRaw(item.properties)
    }))
  }

  serializeDataRaw(raw: PageObjectResponse['properties']): Omit<DataItem, 'id'> {
    const keys = Object.keys(raw)
    const item = {
      Years: '',
      Account: '',
      Date: '',
      Type: { title: '', color: '' },
      Resource: { title: '', color: '' },
      Desc: ''
    }
    for (const key of keys) {
      const dataType = raw[key].type
      switch (dataType) {
        case 'title':
          item[key] = raw[key][dataType][0].plain_text
          break
        case 'rich_text':
          item[key] = raw[key][dataType][0].plain_text
          break
        case 'date':
          item[key] = raw[key][dataType].start
          break
        case 'select':
          item[key].title = raw[key][dataType].name
          item[key].color = raw[key][dataType].color
          break
        default:
          item[key] = raw[key][dataType]
          break
      }
    }
    return item
  }

  deserializeDataRaw(dataItems: DataItem[]): PageObjectResponse {
  }
}