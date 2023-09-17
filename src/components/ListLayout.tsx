import react from 'react'
import { Text, View } from 'react-native'

const ListLayout: react.FC<{ property, children?: react.FC }> = ({ property, children = <></> }) => {
  return (
    <View>
      { children }
      <Text>Years: { property.Years }</Text>
      <Text>Account: { property.Account }</Text>
      <Text>Date: { property.Date }</Text>
      <Text>Desc: { property.Desc }</Text>
      <Text style={ { color: property.Type?.color } }>Type: { property.Type?.title }</Text>
      <Text style={ { color: property.Resource?.color } }>Resource: { property.Resource?.title }</Text>
    </View>
  )
}

export default ListLayout