import { Client } from '@notionhq/client'
import { create } from 'zustand'

const useDatabase = create((set) => {

  return {
    data: null,
    setData: (notion: Client, config?: { filter?: any, sort?: any }) => {
      notion?.databases.query({
        database_id: process.env.NOTION_DATABASE_ID,
        ...config
      }).then((res) => set({
          data: res
        })
      )
    }
  }
})


export default useDatabase