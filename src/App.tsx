import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Auth from './pages/auth'
import Home from './pages/home'

const Stack = createNativeStackNavigator()

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Auth" component={ Auth }/>
        <Stack.Screen name="Home" component={ Home }/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
