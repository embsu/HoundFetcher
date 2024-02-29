import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, ActivityIndicator, TouchableOpacity, Modal, Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import { getLikedBreeds, saveLikedBreeds } from './FavoriteManager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'

import LikeButton from './FavButton';

export default function BreedCard({ breedName, selBreedId }) { // breedname is a prop passed from the parent component called searchbar.js(myöhemmin allbreedsapi.js)


  const [liked, setLiked] = useState(false);


  const [breedImage, setBreedImage] = useState('')
  const [breedGroup, setBreedGroup] = useState('')
  const [breedTemperament, setBreedTemperament] = useState('')
  const [breedLifeSpan, setBreedLifeSpan] = useState('')
  const [breedWeightMetric, setBreedWeight] = useState('')
  const [breedHeightMetric, setBreedHeight] = useState('')
  const [breedOrigin, setBreedOrigin] = useState('')
  const [breedBredFor, setBreedBredFor] = useState('')

  const [imageIndex, setImageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  


  const api = {
    key: process.env.EXPO_PUBLIC_API_KEY,
  }

  // fetch breed info with 10 pics, apikey needed
  useEffect(() => {
    setIsLoading(true)
    console.log('BREEDCARDISSA OLLAAAN', selBreedId, breedName)
    fetch(`https://api.thedogapi.com/v1/images/search?limit=10&breed_ids=${selBreedId}
        &api_key=${api.key}`)
      .then(response => response.json())
      .then(json => {
        const allBreedImageUrls = json.map(image => image.url);
        setBreedImage(allBreedImageUrls);
        setBreedGroup(json[0].breeds[0].breed_group);
        setBreedTemperament(json[0].breeds[0].temperament);
        setBreedLifeSpan(json[0].breeds[0].life_span);
        setBreedWeight(json[0].breeds[0].weight.metric);
        setBreedHeight(json[0].breeds[0].height.metric);
        setBreedOrigin(json[0].breeds[0].origin);
        setBreedBredFor(json[0].breeds[0].bred_for);
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Error fetching breed info:', error);
        setIsLoading(false)
      }
      );

  }, [selBreedId]); 

  const handleNextImage = () => {
    // ACTIVITY INDICATOR PUUTTUU
    setImageIndex((prevIndex) => (prevIndex + 1) % breedImage.length);
  };
  const handlePrevImage = () => {
    setImageIndex((prevIndex) => (prevIndex - 1 + breedImage.length) % breedImage.length);
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#AE8781" />;
  }

  

  return (
    <View style={styles.BCStyle}>
      <Text style={styles.font}>Breed info about</Text>

      <View style={styles.nimiFavecontainer}>

        <Text style={styles.BreedTitle}>{breedName}</Text>
        <LikeButton 
        breedLikedId = {selBreedId} 
        breedLikedName = {breedName}/>
      </View>

        <Image
          source={{ uri: breedImage[imageIndex] }}
          style={styles.breedIMG}
        /> 
    


      <View style={styles.nappulat}>

        <TouchableOpacity style={styles.nextImgBtn} onPress={handlePrevImage}>
          <Text style={styles.btnfont}>{String.fromCharCode(8592)}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextImgBtn} onPress={handleNextImage}>
          <Text style={styles.btnfont}>{String.fromCharCode(8594)}</Text>
        </TouchableOpacity>

      </View>


      <View style={styles.breedcardInfo}>
        {/* eli jos nämä on tyhjiä, niin ei näytetä */}

        {breedGroup && breedGroup.trim() !== '' && (
          <Text style={styles.font}>
            <Text style={styles.label}>Breed group:{'\n'}</Text>
            {breedGroup}
          </Text>
        )}
        {breedTemperament && breedTemperament.trim() !== '' && (
          <Text style={styles.font}>
            <Text style={styles.label}>Temperament:{'\n'}</Text> 
            {breedTemperament}
          </Text>
        )}
        {breedLifeSpan && breedLifeSpan.trim() !== '' && (
          <Text style={styles.font}>
            <Text style={styles.label}>Life span:{'\n'}</Text> 
            {breedLifeSpan}
          </Text>
        )}
        {breedWeightMetric && breedWeightMetric.trim() !== '' && (
          <Text style={styles.font}>
            <Text style={styles.label}>Weight:{'\n'}</Text> 
            {breedWeightMetric} kg
          </Text>
        )}
        {breedHeightMetric && breedHeightMetric.trim() !== '' && (
          <Text style={styles.font}>
            <Text style={styles.label}>Height:{'\n'}</Text> 
            {breedHeightMetric} cm
          </Text>
        )}
        {breedBredFor && breedBredFor.trim() !== '' && (
          <Text style={styles.font}>
            <Text style={styles.label}>Bred for:{'\n'}</Text> 
            {breedBredFor}
          </Text>
        )}
        {breedOrigin && breedOrigin.trim() !== '' && (
          <Text style={styles.font}>
            <Text style={styles.label}>Origin:{'\n'}</Text> 
            {breedOrigin}
          </Text>
        )}

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  BCStyle: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
    margin: 18,
    backgroundColor: '#d0e1dd',
    borderRadius: 18,
  },
 
  nimiFavecontainer: {
    flexDirection: 'row',
    alignItems: 'baseline', // Align items at their baseline
    justifyContent: 'center', // Center children horizontally
    gap: 16,
    maxWidth: 270,

  },

  BreedTitle: {
  
    flexWrap: 'wrap',
    fontFamily: 'Comfortaa',
    fontSize: 28,
    color: '#AE8781',
    marginBottom: 18,
  textAlign: 'center',
  },

  breedIMG: {
    width: 240,
    height: 240,
    borderRadius: 18,
    margin: 8,
  },

  nappulat: {
    flexDirection: 'row',
    gap: 60,
    margin: 8,
  },

  nextImgBtn: {
    backgroundColor: '#AE8781',
    borderRadius: 30,
    height: 42,
    width: 42,
    alignItems: 'center',

  },

  btnfont: {
    fontFamily: 'Comfortaa',
    fontSize: 20,
    color: '#EAEAEA',
  },

  breedcardInfo: {
    padding: 8,
    margin: 2,
    backgroundColor: '#E0EEEA',
    borderRadius: 18,
  },

  font: {
    fontFamily: 'Comfortaa',
    fontSize: 18,
    color: '#78767B',
    marginBottom: 8,
    padding: 8,

  },
  label: {
    fontWeight: 'bold', 
    color: '#6F6E71',
  },

});


