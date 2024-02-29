import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native'
import { clearLikedBreeds } from '../components/FavoriteManager';


export default function Settings() {
  return (
    <View>
      <Text>Settings</Text>
      <Button onPress={() => clearLikedBreeds()} title="Clear liked breeds from local storage" color="#AE8781" />

    </View>
  )
}