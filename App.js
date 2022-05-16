import React from 'react'
import {StyleSheet} from  'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {HomeScreen} from './screens/HomeScreen'
import {PokemonDetail} from "./screens/PokemonDetail"

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen}/>
        <Stack.Screen name='Detail' component={PokemonDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 32
  }
})

export default App
