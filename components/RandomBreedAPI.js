import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function RandomBreedAPI() {


  const navigation = useNavigation();

  const api = {
    key: process.env.EXPO_PUBLIC_API_KEY,
  }


  // fetch random breed info

  useEffect(() => {
    fetch(`https://api.thedogapi.com/v1/images/search?limit=1&has_breeds=1&api_key=${api.key}`)
      .then(response => response.json())
      .then(json => {
        const randomBreedName = json[0].breeds[0].name;
        console.log('Random breed name:', randomBreedName);
        const randomBreed = json[0].breeds[0].id;
        // setRandomBreed(randomBreed);
        console.log('Random breed:', randomBreed);
        navigation.navigate('Breed Info', { selBreedId: randomBreed, breedName: randomBreedName});
        
    
      })
      .catch(error => {
        console.error('Error fetching random breed:', error);
      });
  }
    , []);

  return (
    <View>
      <Text>Loading random breed</Text>
    </View>
  );
}
