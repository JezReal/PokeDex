import React from "react"
import {StyleSheet, ImageBackground, Text, View, Image, TouchableOpacity} from "react-native"
import {useNavigation} from "@react-navigation/native"
import {backgroundColors, colors} from "../assets/color"
import Pokeball from "../assets/Images/Pokeball.png"
import Dots from "../assets/Images/Dots.png"
import { useEffect, useState } from "react/cjs/react.production.min"

export const Card = (props) => {
  const navigation = useNavigation()
  const pokemonName = props.pokemon.name.charAt(0).toUpperCase() + props.pokemon.name.slice(1)
  const pokemonID = props.pokemon.id
  const pokemonTypeOne = "poison"
  // const pokemonTypeOne = props.pokemon.types[0].type.name
  // const pokemonTypeTwo = props.pokemon.types[1]?.type.name
  
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
          style={{width: 190, height: 130, position: "absolute"}}
          source={Pokeball}>
        </ImageBackground>
        <View>
          <Image
            style={styles.imageStyle}
            source={{
              uri: props.pokemon.image
            }}
          />
        </View>

        <View style={styles.nameContainer}>
          <View style={styles.pokemonTypesContainer}>
            <Text style={styles.pokemonTypesName}>
              grass
            </Text>
            <Text style={styles.pokemonTypesName}>
              poison
            </Text>
          </View>

          <Text style={styles.nameStyle}>
            {pokemonName}
          </Text>

          <Text style={styles.pokemonID}>
            #{('00' + pokemonID).slice(-3)}
          </Text>

        </View>
        <View style={{position: 'absolute', right: 25, top: 5}}>
          <Image source={Dots} style={{width: 95, height: 40}}/>
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

  nameContainer: {
    position: "absolute",
    left: 200,
    top: 40
  },

  pokemonTypesContainer: {
    borderRadius: 5,
    flexDirection: "row",
    top: -10,
    alignContent: "space-between",
  },

  nameStyle: {
    top: -10,
    fontWeight: "bold",
    fontSize: 25,
    color: "#fff"
  },

  pokemonTypesName: {
    color: "#fff",
    marginRight: 5,
    padding: 5
  },

  pokemonID: {
    left: 90,
    top: -15,
    color: "rgba(23, 23, 27, 0.2)",
    fontSize: 30,
    fontWeight: "bold"
  },

})
