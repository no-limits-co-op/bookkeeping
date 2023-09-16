import react, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'

type SelectType = {
  title: string
  color: string
}

export interface DataItem {
  Years: string
  Account: string
  Date: string
  Type: SelectType
  Resource: SelectType
  Desc: string
}

const ListLayout: react.FC<{ property, children?: react.FC }> = ({ property, children = <></> }) => {
  const [item, setItem] = useState<DataItem>({
    Account: '',
    Date: '',
    Desc: '',
    Resource: { title: '', color: '' },
    Type: { title: '', color: '' },
    Years: ''
  })

  useEffect(() => {
    const keys = Object.keys(property)
    for (const key of keys) {
      const dataType = property[key].type
      switch (dataType) {
        case 'title':
          item[key] = property[key][dataType][0].plain_text
          break
        case 'rich_text':
          item[key] = property[key][dataType][0].plain_text
          break
        case 'date':
          item[key] = property[key][dataType].start
          break
        case 'select':
          item[key].title = property[key][dataType].name
          item[key].color = property[key][dataType].color
          break
        default:
          item[key] = property[key][dataType]
          break
      }
    }
    setItem(item)
  }, [property])
  return (
    <View>
      { children }
      <Text>Years: { item.Years }</Text>
      <Text>Account: { item.Account }</Text>
      <Text>Date: { item.Date }</Text>
      <Text>Desc: { item.Desc }</Text>
      <Text style={ { color: item.Type?.color } }>Type: { item.Type?.title }</Text>
      <Text style={ { color: item.Resource?.color } }>Resource: { item.Resource?.title }</Text>
    </View>
  )
}

export default ListLayout