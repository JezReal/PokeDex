import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, Image, FlatList} from 'react-native'

const renderStat = ({item}) => {
  return (
    <View>
      <Text>{item.stat.name}: {item.base_stat}</Text>
    </View>
  )
}

const renderType = ({item}) => {
  return (
    <View>
      <Text>{item.type.name}</Text>
    </View>
  )
}

export const PokemonDetail = ({route, navigation}) => {
  const {pokemonId, pokemonName} = route.params
  const [pokemonInfo, setPokemonInfo] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(response => response.json())
      .then(pokemonInfo => {

        return pokemonInfo
      })
      .then(pokemonInfo => {
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`)
          .then(response => response.json())
          .then(speciesInfo => {
            const newInfo = pokemonInfo
            newInfo.speciesInfo = speciesInfo
            setPokemonInfo(newInfo)
            setIsLoading(false)
          })
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
        <Image
          style={styles.imageStyle}
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`
          }}
        />

        <Text style={styles.pokedata}>Pokedex Data</Text>
        <Text>Name: {pokemonName}</Text>
        <Text>{pokemonInfo.speciesInfo.flavor_text_entries[0].flavor_text}</Text>
        <Text>Height: {pokemonInfo.height}</Text>
        <Text>Weight: {pokemonInfo.weight}</Text>

        <View style={styles.divider} />
        <Text>Stats:</Text>
        <FlatList
          data={pokemonInfo.stats}
          renderItem={renderStat}
          keyExtractor={(item) => item.stat.name}
        />

        <View style={styles.divider} />
        <Text>Types: </Text>
        <FlatList
          data={pokemonInfo.types}
          renderItem={renderType}
          keyExtractor={(item) => item.slot}
        />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  pokedata: {
    // paddingTop: 20,
    width: 334,
    height: 30,
    fontSize: 16,
    lineHeight: 19,
    color: "#62B957",
  },

  imageStyle: {
    position: "absolute",
    width: 125,
    height: 125,
    left: 40,
    top: 95,
  },

  divider: {
    height: 30
  }
})
