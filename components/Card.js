import React from "react"
import {StyleSheet, ImageBackground, Text, View, Image, TouchableOpacity} from "react-native"
import {useNavigation} from "@react-navigation/native"
import {backgroundColors} from "../assets/color"
import Pokeball from "../assets/Images/Pokeball.png"
import Dots from "../assets/Images/Dots.png"

export const Card = (props) => {
  const navigation = useNavigation()
  const pokemonName = props.pokemon.name.charAt(0).toUpperCase() + props.pokemon.name.slice(1)
  const pokemonType = "poison"
 
  return (
    <TouchableOpacity style={{...styles.box, backgroundColor: backgroundColors[pokemonType], marginVertical: 10}}
      onPress={() => {
        navigation.navigate("Detail", {
          pokemonId: props.pokemon.id,
          pokemonName: pokemonName
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
          <Text>
            #{props.pokemon.id}
          </Text>
          <Text style={styles.nameStyle}>
            {pokemonName}
          </Text>
        </View>
        <View style={{position: 'absolute', right: 25, top: 5}}>
          <Image source={Dots} style={{width: 100, height: 41}}/>
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

  nameStyle: {
    fontWeight: "bold",
    fontSize: 25,
    color: "#fff"
  },

})
