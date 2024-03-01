import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { IconButton } from 'react-native-paper';
import { clearLikedBreeds } from '../components/FavoriteManager';



export default function SettingsScreen() {
  
  return (
    <View style={styles.settingsCont}>
      <Text style={styles.settingsTXT}>Remove all breeds from favorites</Text>

      <IconButton
        style={styles.iconButton}
        icon="delete-empty"
        iconColor="#EAEAEA"
        size={38}
        onPress={() => clearLikedBreeds()}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  settingsCont: {
    flex: 1,
    alignItems: 'center',
    margin: 18,
    backgroundColor: '#d0e1dd',
    borderRadius: 18,
    borderColor: '#78767B',
    borderWidth: 1,
  },

  settingsTXT: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#78767B',
    fontFamily: 'Comfortaa'
  },

  iconButton: {
    backgroundColor: '#AE8781',
    color: 'white',
    borderRadius: 20,
    borderColor: '#785651',
    borderWidth: 1, 
  },
});
