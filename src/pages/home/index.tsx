import react, { useEffect, useState } from 'react'
import { ScrollView, Text } from 'react-native'
import useNotion from '../../hooks/useNotion'
import ListLayout from 'src/components/ListLayout'
import { DataItem } from 'src/orms/databaseORM'

const Home: react.FC = () => {
  const { notion } = useNotion()
  const [data, setData] = useState<DataItem[]>()

  useEffect(() => {
    notion?.queryData().then(res => setData(res))
  }, [])
  return (
    <ScrollView>
      <Text>Home Page</Text>
      { data?.map((res) => <ListLayout key={ res.id } property={ res }/>) }
    </ScrollView>
  )
}

export default Home