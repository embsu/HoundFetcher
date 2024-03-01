// for saving, getting, and clearing liked breeds from local storage

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const saveLikedBreeds = async (likedBreeds) => {
    try {
      // Filter out breeds with null or undefined names
      const filteredBreeds = likedBreeds.filter((breed) => breed.name);
      if (filteredBreeds.length !== likedBreeds.length) {
        console.log('nope from handlefavorites');
      }
  
      await AsyncStorage.setItem('likedBreeds', JSON.stringify(filteredBreeds));
  
    } catch (error) {
      console.log('Error saving liked breeds:', error);
    }
  }
  
  export const getLikedBreeds = async () => {
    try {
      const likedBreeds = await AsyncStorage.getItem('likedBreeds');
      console.log('GET LIKED BREEDS:', likedBreeds);
      return likedBreeds ? JSON.parse(likedBreeds) : [];
    } catch (error) {
      console.log('Error getting liked breeds:', error);
      return [];
    }
  }
  
  export const clearLikedBreeds = async () => {
    Alert.alert(
      'Confirm Clear',
      'Are you sure you want to clear liked breeds from local storage?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('likedBreeds');
              Alert.alert('Success', 'Liked breeds cleared from local storage');
              console.log('Liked breeds cleared from local storage');
            } catch (error) {
              Alert.alert('Error', 'Failed to clear liked breeds from local storage');
              console.log('Error clearing liked breeds from local storage:', error);
            }
          },
        },
      ]
    );
  };