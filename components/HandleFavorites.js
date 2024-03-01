import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import BreedCard from './BreedCard';
import { useFocusEffect } from '@react-navigation/native'; //takaisinpäin tullessa renderöidään uudelleen

export default function HandleFavorites() {
  const [likedBreeds, setLikedBreeds] = useState([]);
  const [selectedBreedId, setSelectedBreedId] = useState(null); // Track the selected breed ID
  const [showBreedCard, setShowBreedCard] = useState(false); // Track the visibility of BreedCard

    const fetchDataFromLS = async () => {
      try {
        const storedBreeds = await AsyncStorage.getItem('likedBreeds');
        const parsedBreeds = storedBreeds ? JSON.parse(storedBreeds) : [];

 // Check if the stored breeds are different from the current state

        setLikedBreeds(parsedBreeds);
        console.log('HANDLE FAVORITES, LIKED BREEDS:', parsedBreeds);
      
      
      } catch (error) {
        console.log('Error getting liked breeds:', error);
      }
    };

    


// Use useEffect to fetch liked breeds when the component mounts
useEffect(() => {
  fetchDataFromLS();

}, [likedBreeds ]);

// Use useFocusEffect to refresh data when the screen gains focus
useFocusEffect(
  React.useCallback(() => {
    fetchDataFromLS(); // Fetch liked breeds whenever the screen gains focus
  }, []) // Empty dependency array to only run once when the component mounts
);



  const toggleBreedCard = (breedId) => {
    if (selectedBreedId === breedId) {
      setSelectedBreedId(null); // Hide the BreedCard if already selected
    } else {
      setSelectedBreedId(breedId); // Show the BreedCard for the selected breed
    }
  };


  return (
    <View>
      {likedBreeds.map((breed, index) => (
        <View key={index}>
          <TouchableOpacity key={breed.id} onPress={() => toggleBreedCard(breed.id)}>


            <View style={styles.faves}>
              <Text style={styles.briidii}>{breed.name}</Text>
              <Text style={{ fontSize: 30, color: '#78767B' }}>{selectedBreedId === breed.id ? '▲' : '▼'}</Text>

            </View>

          </TouchableOpacity>

          {selectedBreedId === breed.id && <BreedCard selBreedId={breed.id} breedName={breed.name}/>}
        </View>
      ))}
    </View>

  );
}

const styles = StyleSheet.create({
  briidii: {
    fontSize: 22,
    color: '#AE8781',
    textAlign: 'center',
    fontFamily: 'Comfortaa',
  },

  faves: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F3E0DC',
    margin: 10,
    borderRadius: 10,
  },
});
