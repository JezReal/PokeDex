import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, Image, FlatList, ViewComponent} from 'react-native'
import PokeballHeader from "../assets/Images/PokeballHeader.png"
import {backgroundColors, colors} from "../assets/color"
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
            
            pokemonInfo.types.map(type => {
              type.type.name = type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)
            })

          })
      })
  }, [])

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <Image source={redPokeball} style={{width: 100, height: 100}}/>
        <Text
          style={{fontWeight: "bold", fontSize: 25,
          }}>Loading</Text>
      </View>

    )
  } else {
    return (
      <View>
        <View style={{
          backgroundColor: backgroundColors[pokemonInfo.types[0].type.name],
          alignItems: "center", 
          justifyContent: "center", 
          paddingBottom: 200
          }}>
          <Image source={PokeballHeader} style={{width: 160, height: 80}} />
          <Image
            style={styles.imageStyle}
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`
            }}
          />
        </View>
        <Text style={styles.pokemonID}>
            #{('00' + pokemonId).slice(-3)}
        </Text>
        <View style={{width: "100%", position: 'absolute', alignItems: "flex-end"}}>
          <Image
            style={{width: 120, height: 52, marginTop: 30}}
            source={Dots}
            />
        </View>

        <View style={styles.containerOne}>
          <Text style={styles.pokeName}>{pokemonName}</Text>
          <View style={styles.typesContainer}>
            <View style={[styles.typesStyle, {
              backgroundColor: colors[pokemonInfo.types[0].type.name]
              }]}>
              <Text style={styles.pokeTypes}>{pokemonInfo.types[0].type.name}</Text>
            </View>
            {pokemonInfo.types[1]?.type.name !== undefined &&
            <View style={[styles.typesStyle, {
              backgroundColor: colors[pokemonInfo.types[1].type.name]
              }]}>
              <Text style={styles.pokeTypes}>{pokemonInfo.types[1]?.type.name}</Text>
            </View>
            }
          </View>
        </View>

        <View style={styles.containerTwo}>
          <Text style={styles.pokeDescription}>{pokemonDescription}</Text>
          <View style={{marginVertical: 20,}}>
            <Text style={styles.textStyleOne}>Height: 
              <Text style={styles.textStyleTwo}>{'\t'.repeat(12) + pokemonInfo.height}</Text>
            </Text>
            <Text style={styles.textStyleOne}>Weight: 
              <Text style={styles.textStyleTwo}>{'\t'.repeat(12) + pokemonInfo.weight}</Text>
            </Text>
          </View>
          <Text style={{
            fontSize: 20, 
            fontWeight: "bold", 
            marginBottom: 15, 
            color: colors[pokemonInfo.types[0].type.name]
            }}>Stats:</Text>

          <View style={{marginBottom: 20}}>
            <Text style={styles.textStyleOne}>HP: 
              <Text style={styles.textStyleTwo}>{'\t'.repeat(14) + pokemonInfo.stats[0].base_stat}</Text>
            </Text>
            <Text style={styles.textStyleOne}>Attack: 
              <Text style={styles.textStyleTwo}>{'\t'.repeat(12) + pokemonInfo.stats[1].base_stat}</Text>
            </Text>
            <Text style={styles.textStyleOne}>Defense: 
              <Text style={styles.textStyleTwo}>{'\t'.repeat(11) + pokemonInfo.stats[2].base_stat}</Text>
            </Text>
            <Text style={styles.textStyleOne}>Special-Attack: 
              <Text style={styles.textStyleTwo}>{'\t'.repeat(7) + pokemonInfo.stats[3].base_stat}</Text>
            </Text>
            <Text style={styles.textStyleOne}>Special-Defense: 
              <Text style={styles.textStyleTwo}>{'\t'.repeat(6) + pokemonInfo.stats[4].base_stat}</Text>
            </Text>
            <Text style={styles.textStyleOne}>Speed: 
              <Text style={styles.textStyleTwo}>{'\t'.repeat(12) + pokemonInfo.stats[5].base_stat}</Text>
            </Text>
          </View>
          <Image
            style={{height: 100, aspectRatio: 1, justifyContent: "flex-end"}}
            source={redPokeball}>
          </Image>
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
    right: 5
  },

  pokemonID: {
    color: "rgba(23, 23, 27, 0.2)",
    fontSize: 45,
    fontWeight: "bold",
    position: "absolute",
    paddingTop: 70,
    paddingLeft: 20,
    
  },

  typesStyle: {
    marginRight: 5, 
    paddingHorizontal: 5, 
    borderRadius: 5, 
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
    borderRadius: 5,
    padding: 3,
    textTransform: "capitalize",
  },

  containerTwo: {
    paddingHorizontal: 25,
    backgroundColor: "#fff",
    borderRadius: 50,
    top: -120,
    height: "100%",
    paddingTop: 20,
    alignItems: "center", 
  },

  textStyleOne: { 
    color: "#17171B", 
    fontWeight: "500",
    marginBottom: 10,
  },

  textStyleTwo: {
    color: "#747476",
  },

  pokeDescription: {
    color: "#747476",
    fontSize: 14,
    alignContent: "center",
    justifyContent: "center",
  }

})
