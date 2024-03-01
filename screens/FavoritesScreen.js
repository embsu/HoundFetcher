import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import HandleFavorites from '../components/HandleFavorites';


export default function FavoritesScreen({ likedBreeds }) {



  return (
    <ScrollView>
      <View>
        <Text style={styles.faves}>Your favorite breeds</Text>
        <HandleFavorites likedBreeds={likedBreeds}/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  faves: {
    fontSize: 22,
    textAlign: 'center',
    margin: 10,
    color: '#78767B',
    fontFamily: 'Comfortaa'
  },
});






