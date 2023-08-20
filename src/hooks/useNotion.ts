import { Client } from '@notionhq/client'
import { create } from 'zustand'

const useNotion = create((set) => {
  return {
    notion: null,
    setNotion: () => {
      if (this.notion) return
      set({
        notion: new Client({
          auth: process.env.NOTION_TOKEN
        })
      })
    }
  }
})


export default useNotion