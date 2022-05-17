import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {HomeScreen} from './screens/HomeScreen'
import {PokemonDetail} from "./screens/PokemonDetail"

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Pokédex' component={HomeScreen}
          options={{
            title: "Pokédex",
            headerTitleStyle:{
              fontSize: 32,
              color: "#17171B",
            }
          }}
        />
        <Stack.Screen name='Detail' component={PokemonDetail} 
          options={{
            title: "Pokédex Data",
            headerTitleStyle:{
              fontSize: 25,
              color: "#17171B",
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
