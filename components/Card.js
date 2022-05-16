import React from 'react'
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native'


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
      <View>
        <View>
          <Image
            style={styles.imageStyle}
            source={{
              uri: props.pokemon.image
            }}
          />
        </View>

        <View>
          <Text>{pokemonName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  imageStyle: {
    height: 200,
    width: 200
  },

  thing: {
    padding: 10
  }
})
