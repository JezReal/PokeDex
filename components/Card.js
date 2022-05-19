import React from "react"
import {StyleSheet, ImageBackground, Text, View, Image, TouchableOpacity} from "react-native"
import {useNavigation} from "@react-navigation/native"
import {backgroundColors, colors} from "../assets/color"
import PokeballTwo from "../assets/Images/PokeballTwo.png"
import Dots from "../assets/Images/Dots.png"

export const Card = (props) => {
  const navigation = useNavigation()
  const pokemonName = props.pokemon.name.charAt(0).toUpperCase() + props.pokemon.name.slice(1)
  const pokemonID = props.pokemon.id
  const pokemonBackground = props.pokemon.types[0].type.name
  const pokemonTypes = props.pokemon.types

  props.pokemon.types.map(type => {
    type.type.name = type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)
  })

  return (
    <TouchableOpacity style={{
      borderRadius: 10, 
      backgroundColor: backgroundColors[pokemonBackground], 
      marginVertical: 10
      }}
    onPress={() => {
      navigation.navigate("Detail", {
        pokemonId: props.pokemon.id,
        pokemonName: pokemonName,
      })
    }}
    >
      <View>
        <ImageBackground
          style={styles.ImageOne}
          source={PokeballTwo}>
        </ImageBackground>
        <View>
          <Image
            style={styles.ImageTwo}
            source={{
              uri: props.pokemon.image
            }}
          />
        </View>

        <View style={styles.containerOne}>
          <View style={styles.pokemonTypesContainer}>
            <View style={[styles.typesStyle, {
              backgroundColor: colors[pokemonTypes[0].type.name]
              }]}>
              <Text style={styles.pokeTypes}>{pokemonTypes[0].type.name}</Text>
            </View>
            {/* Show second type if pokemon has a second type */}
            {pokemonTypes[1] &&
              <View style={[styles.typesStyle, {
              backgroundColor: colors[pokemonTypes[1].type.name]
              }]}>
                <Text style={styles.pokeTypes}>{pokemonTypes[1].type.name}</Text>
              </View>
            }
          </View>

          <Text style={styles.nameStyle}>
            {pokemonName}
          </Text>

          <Text style={styles.pokemonID}>
            #{('00' + pokemonID).slice(-3)}
          </Text>

        </View>
        <View style={styles.ImageThree}>
          <Image
            style={{width: 95, height: 40}}
            source={Dots}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

  ImageOne: {
    width: 270, 
    height: 130, 
    overflow: "hidden",
    position: "absolute",
    marginLeft: -35,
  },

  ImageTwo: {
    width: 130,
    height: 130,
    marginLeft: 40
  },

  ImageThree: {
    position: 'absolute', 
    right: 25, 
    top: 5
  },

  containerOne: {
    position: "absolute",
    left: 200,
    top: 40
  },

  pokemonTypesContainer: {
    flexDirection: "row",
    alignContent: "space-between",
    top: -5,
  },

  typesStyle: {
    marginRight: 5, 
    paddingHorizontal: 5, 
    borderRadius: 5, 
  },

  pokeTypes: {
    color: "#fff",
    borderRadius: 5,
    padding: 3,
    textTransform: "capitalize",
  },

  nameStyle: {
    fontWeight: "bold",
    fontSize: 25,
    color: "#fff",
    top: -5,
    marginBottom: -22
  },

  pokemonTypesName: {
    color: "#fff",
    marginRight: 5,
    backgroundColor: "#62B957",
    borderRadius: 5,
    padding: 3,
    textTransform: "capitalize",
  },

  pokemonID: {
    paddingLeft: 80,
    color: "rgba(23, 23, 27, 0.2)",
    fontSize: 35,
    fontWeight: "bold"
  },

})
