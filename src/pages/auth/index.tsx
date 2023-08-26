import React, { useEffect } from 'react'
import {
  Text, View
} from 'react-native'
import useNotion from 'src/hooks/useNotion'

const Auth = ({ navigation }) => {
  const { notion, setNotion } = useNotion()
  useEffect(() => {
    if (setNotion())
      navigation.replace('Home')
  }, [])
  return (
    <View>
      <Text>Welcome</Text>
    </View>
  )
}

export default Auth
