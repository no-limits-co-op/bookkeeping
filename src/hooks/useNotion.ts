import { create } from 'zustand'
import NotionORM from 'src/orms/notionORM'

const useNotion = create((set): {
  notion: NotionORM | null,
  setNotion: () => boolean
} => {
  return {
    notion: null,
    setNotion: () => {
      if (this.notion) return true
      set({
        notion: new NotionORM()
      })
      return true
    }
  }
})


export default useNotion