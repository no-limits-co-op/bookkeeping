import react, { useEffect } from 'react'
import { ScrollView, Text } from 'react-native'
import useNotion from '../../hooks/useNotion'
import ListLayout from 'src/components/ListLayout'
import useDatabase from 'src/hooks/useDatabase'

const Home: react.FC = () => {
  const { notion } = useNotion()
  const { data, setData } = useDatabase()

  useEffect(() => {
    setData(notion)
  }, [])
  return (
    <ScrollView>
      <Text>Home Page</Text>
      { data?.map((res) => <ListLayout key={ res.id } property={ res }/>) }
    </ScrollView>
  )
}

export default Home