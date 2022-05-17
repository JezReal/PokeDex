import React, {useEffect, useState} from 'react'
import {FlatList, StyleSheet, Text, View} from 'react-native'
import {Card} from "../components/Card";



const renderItem = ({item}) => {
  return (
    <Card pokemon={item}/>
  )
}

export const HomeScreen = () => {
  const [pokemon, setPokemon] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=50&offset=0')
      .then(response => response.json())
      .then(data => {
        return data.results
      })
      .then(pokemon => {
        const newPokemon = pokemon

        newPokemon.map(poke => {
          let id = poke.url.split('/')[6]
          poke.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
          poke.id = id
        })
        setPokemon(newPokemon)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  if (isLoading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    )
  } else {
    return (
      <View style={styles.header}>
        <FlatList
          data={pokemon}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  header: {
    borderRadius: 10,
  }
})
