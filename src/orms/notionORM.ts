import { Client } from '@notionhq/client'
import { DatabaseORM } from 'src/orms/databaseORM'

class NotionORM {
  client: Client

  constructor() {
    this.client = new Client({
      auth: process.env.NOTION_TOKEN
    })
  }

  async queryData(config?: any) {
    return await this.client.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      ...config
    }).then((res) => {
      return new DatabaseORM(res).dataItems
    })
  }
}

export default NotionORM