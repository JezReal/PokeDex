import React from 'react'
import {Image} from "react-native"
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {HomeScreen} from './screens/HomeScreen'
import {PokemonDetail} from "./screens/PokemonDetail"
import pokedex from "./assets/Images/pokedex.png"

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "pokedex" component={HomeScreen}
          options={{
            headerTitle: (props) => (
              <Image source={require("./assets/Images/pokedex.png")}
              resizeMode = "contain" 
              style={{height: 40, alignItems: "center", justifyContent: "center"}}
              />
            ),
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
