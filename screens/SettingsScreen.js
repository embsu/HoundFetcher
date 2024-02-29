import { View, Text } from 'react-native'
import React from 'react'
import { clearLikedBreeds } from '../components/HandleFavorites';
import { Button } from 'react-native-paper';
import Settings from '../components/Settings';



export default function SettingsScreen() {
  

  return (
    <View>
      <Text>SettingsScreen</Text>
      <Settings/>
    </View>
  )
}
