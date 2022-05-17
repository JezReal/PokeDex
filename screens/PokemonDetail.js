import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, Image, FlatList} from 'react-native'
import loading from "../assets/Images/loading.png"
import PokeballHeader from "../assets/Images/PokeballHeader.png"
import {backgroundColors} from "../assets/color"

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
      <View style={{flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center"}}>
        <Image source={loading} style={{width: 100, height: 100}}/>
        <Text 
          style={{fontWeight: "bold", fontSize: 25,
          }}>Loading</Text>
      </View>
      
    )
  } else {
    return (
      <View>
        <View style={{...styles.box, backgroundColor: backgroundColors["grass"], 
          alignItems: "center", justifyContent: "center", paddingBottom: 200}}>
          <Image source={PokeballHeader} style={{width: 230, height: 100}} />
          <Image
            style={styles.imageStyle}
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`
            }}
          />
          <Text style={{fontWeight: "bold", fontSize: 40, color: "#fff", top: 70,}}>{pokemonName}</Text>
        </View>

        <View style={styles.info}>
          <View style={{top: 20}}>
            <Text style={{color: "#747476", position: "relative", paddingBottom: 20,}}>{pokemonDescription}</Text>
            
            <View style={{alignItems: "center", justifyContent: "center"}}>
              <Text style={{right: 80}}>Height: </Text>
              <Text style={{top: -20, left: 70, color: "#747476"}}>{pokemonInfo.height}</Text>
              <Text style={{top: -10, right: 80}}>Weight:</Text>
              <Text style={{top: -30, left: 70, color: "#747476",}}>{pokemonInfo.weight}</Text>

              <Text style={{fontSize: 20, fontWeight: "bold", marginBottom: 10}}>Stats:</Text>
              <FlatList
                data={pokemonInfo.stats}
                renderItem={renderStat}
                keyExtractor={(item) => item.stat.name}
              />

              <View style={styles.divider} />
                <Text style={{fontSize: 20, fontWeight: "bold", marginBottom: 15}}>Types: </Text>
                <View style={styles.pokemonType}>
                  <Text style={{right: 15}}>{pokemonInfo.types[0].type.name}</Text>
                  <Text style={{left: 15}}>{pokemonInfo.types[1].type.name}</Text>
                </View>
              </View>
            </View>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  imageStyle: {
    position: "absolute",
    height: 125,
    aspectRatio: 1,
    top: 50,
  },

  info: {
    paddingHorizontal: 25,
    justifyContent: "space-evenly",
    backgroundColor: "#fff",
    borderRadius: 50,
    top: -120,
    paddingBottom: 120,
  },

  divider: {
    height: 30,
    top: 10
  },

  pokemonType: {
    flexDirection: "row",
  },
})
