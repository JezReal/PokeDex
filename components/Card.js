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
  const pokemonTypeOne = "poison"

  const pokemonTypes = props.pokemon.types

  props.pokemon.types.map(type => {
    type.type.name = type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)
  })

  return (
    <TouchableOpacity style={{...styles.box, backgroundColor: backgroundColors[pokemonTypeOne], marginVertical: 10}}
    onPress={() => {
      navigation.navigate("Detail", {
        pokemonId: props.pokemon.id,
        pokemonName: pokemonName,
      })
    }}
    >
      <View>
        <ImageBackground
          style={{width: 270, height: 130, position: "absolute", right: 145}}
          source={PokeballTwo}>
        </ImageBackground>
        <View>
          <Image
            style={styles.imageStyle}
            source={{
              uri: props.pokemon.image
            }}
          />
        </View>

        <View style={styles.containerOne}>
          <View style={styles.pokemonTypesContainer}>
            <Text>{pokemonTypes[0].type.name}</Text>

            {/* Show second type if pokemon has a second type */}
            {pokemonTypes[1] &&
              <View>
                <Text>{pokemonTypes[1].type.name}</Text>
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
        <View style={{position: 'absolute', right: 25, top: 5}}>
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
  box: {
    borderRadius: 10,
  },

  imageStyle: {
    width: 130,
    height: 130,
    left: 30,
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

  nameStyle: {
    fontWeight: "bold",
    fontSize: 25,
    color: "#fff",
    top: -5,
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
    left: 85,
    top: -22,
    color: "rgba(23, 23, 27, 0.2)",
    fontSize: 35,
    fontWeight: "bold"
  },

})
