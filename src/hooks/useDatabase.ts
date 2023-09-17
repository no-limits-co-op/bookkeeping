import { Client } from '@notionhq/client'
import { create } from 'zustand'
import { DatabaseORM, DataItem } from 'src/orms/databaseORM'

const useDatabase = create((set): {
  data: DataItem[] | null,
  setData: (notion: Client, config?: { filter?: any, sort?: any }) => void
} => {

  return {
    data: null,
    // search
    setData: (notion, config) => {
      notion?.databases.query({
        database_id: process.env.NOTION_DATABASE_ID,
        ...config
      }).then((res) => set({
        data: new DatabaseORM(res).dataItems
        })
      )
    }
    // TODO: add / delete / modify
  }
})


export default useDatabase