import react, { useState } from 'react'
import { Text, View } from 'react-native'
import useNotion from '../../hooks/useNotion'

const Home: react.FC = () => {
  const { notion } = useNotion()
  const myPage = async () => await notion?.databases.query({
    database_id: process.env.NOTION_DATABASE_ID
    //   filter: {
    //       property: "Landmark",
    //       rich_text: {
    //           contains: "Bridge",
    //       },
    //   },
  })
  const [data, useData] = useState<any>(null)
  myPage().then((res) => {
    useData(res)
  })
  return (
    <View>
      <Text>Home Page</Text>
      { data?.results.map((res) => (<View key={ res.id }>
        <Text>{ res.id }</Text>
        <Text>{ JSON.stringify(res.properties) }</Text>
      </View>)) }
    </View>
  )
}

export default Home