import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, Image, FlatList} from 'react-native'
import loading from "../assets/Images/loading.png"
import PokeballHeader from "../assets/Images/PokeballHeader.png"
import {backgroundColors} from "../assets/color"
import Dots from "../assets/Images/Dots.png"
import redPokeball from "../assets/Images/redPokeball.png"



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

  const [pokemonDescription, setPokemonDescription] = useState()

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
            setInterval(() => setIsLoading(false), 300)
            setPokemonDescription(pokemonInfo.speciesInfo.flavor_text_entries[0].flavor_text.replace(/(\r\n|\n|\r)/gm, " "))
          
          })
      })
  }, [])

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <Image source={loading} style={{width: 100, height: 100}}/>
        <Text 
          style={{fontWeight: "bold", fontSize: 25,
          }}>Loading</Text>
      </View>
      
    )
  } else {
    return (
      <View>
        <View style={{backgroundColor: backgroundColors["grass"], 
          alignItems: "center", justifyContent: "center", paddingBottom: 200}}>
          <Image source={PokeballHeader} style={{width: 160, height: 80}} />
          <Image
            style={styles.imageStyle}
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`
            }}
          />
        </View>

        <View style={{position: 'absolute', top: 90}}>
          <Image 
            style={{width: 134, height: 57, left: 22}}
            source={Dots} 
            />
        </View>

        <View style={styles.containerOne}>
          <Text style={styles.pokeName}>{pokemonName}</Text>
          <View style={styles.typesContainer}>
            <Text style={styles.pokeTypes}>{pokemonInfo.types[0].type.name}</Text>
            <Text style={styles.pokeTypes}>{pokemonInfo.types[1]?.type.name}</Text>
          </View>
        </View>

        <View style={styles.containerTwo}>
          <View style={{top: 25}}>
            <Text style={styles.pokeDescription}>{pokemonDescription}</Text>
            <View style={{alignItems: "center", justifyContent: "center"}}>
              <Text style={{right: 80}}>Height:</Text>
              <Text style={{top: -20, left: 70, color: "#747476"}}>{pokemonInfo.height}</Text>
              <Text style={{top: -10, right: 80}}>Weight:</Text>
              <Text style={{top: -30, left: 70, color: "#747476",}}>{pokemonInfo.weight}</Text>
              <Text style={{fontSize: 20, fontWeight: "bold", marginBottom: 15}}>Stats:</Text>
              <FlatList
                data={pokemonInfo.stats}
                renderItem={renderStat}
                keyExtractor={(item) => item.stat.name}
              />
              <Image
                style={{height: 100, aspectRatio: 1, top: 60}}
                source={redPokeball}>
              </Image>
            </View>
          </View>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  loading: {
    flex: 1, 
    backgroundColor: "#fff", 
    alignItems: "center", 
    justifyContent: "center"
  },

  imageStyle: {
    position: "absolute",
    height: 190,
    aspectRatio: 1,
    top: 50,
    right: 15
  },

  containerOne: {
    top: -160, 
    left: 20,
  },

  pokeName: {
    fontWeight: "bold", 
    fontSize: 35, 
    color: "#fff", 
  },

  typesContainer: {
    flexDirection: "row",
    alignContent: "space-between",
  },

  pokeTypes: {
    color: "#fff",
    marginRight: 5,
    backgroundColor: "#62B957",
    borderRadius: 5,
    padding: 3,
    textTransform: "capitalize",
  },

  containerTwo: {
    paddingHorizontal: 25,
    backgroundColor: "#fff",
    borderRadius: 50,
    top: -120,
    paddingBottom: 500,
  },

  pokeDescription: {
    color: "#747476",  
    paddingBottom: 20,
    fontSize: 14,
    alignContent: "center",
    justifyContent: "center",
  }

})
