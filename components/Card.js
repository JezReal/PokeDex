import React from 'react'
import {StyleSheet, ImageBackground, Text, View, Image, TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {backgroundColors} from '../assets/color'
import Pokeball from "../assets/Pokeball.png"

export const Card = (props) => {
  const navigation = useNavigation()
  const pokemonName = props.pokemon.name.charAt(0).toUpperCase() + props.pokemon.name.slice(1)

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Detail', {
          pokemonId: props.pokemon.id,
          pokemonName: pokemonName
        })
      }}
    >
      <View style={{...styles.box, backgroundColor: backgroundColors["fire"]}}>
        <ImageBackground
          style={{width: 210, height: 105, position: "absolute"}}
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

        <View style={styles.pokeName}>
          <Text>{pokemonName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  box: {
    marginVertical: 10,
    borderRadius: 10,
  },

  imageStyle: {
    width: 130,
    height: 130,
    left: 35,
  },

  pokeName: {
    position: "absolute",
    textColor: "#FFF",
    left: 200,
    top: 40
  },

  thing: {
    padding: 10
  }
})
