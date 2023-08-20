import React, { useEffect, useState } from 'react'
import {
  Text, View
} from 'react-native'
import useNotion from '../../hooks/useNotion'

const Auth = () => {
  const { notion, setNotion } = useNotion()
  useEffect(() => {
    setNotion()
  }, [])
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
    console.log(JSON.stringify(res))
    useData(res)
  })
  return (
    <View>
      <Text>{ JSON.stringify(data) }</Text>
    </View>
  )
}

export default Auth
