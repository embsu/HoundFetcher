import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import BreedCard from './BreedCard';
import { getLikedBreeds, saveLikedBreeds } from './FavoriteManager';



export default function HandleFavorites() {
  const [likedBreeds, setLikedBreeds] = useState([]);

  const [selectedBreedId, setSelectedBreedId] = useState(null); // Track the selected breed ID
  const [showBreedCard, setShowBreedCard] = useState(false); // Track the visibility of BreedCard

  useEffect(() => {
    const fetchDataFromLS = async () => {
      try {
        const storedBreeds = await AsyncStorage.getItem('likedBreeds');
        const parsedBreeds = storedBreeds ? JSON.parse(storedBreeds) : [];


        // Check if the stored breeds are different from the current state
      if (JSON.stringify(parsedBreeds) !== JSON.stringify(likedBreeds)) {
        setLikedBreeds(parsedBreeds);
        console.log('HANDLE FAVORITES, LIKED BREEDS:', parsedBreeds);

      }
      } catch (error) {
        console.log('Error getting liked breeds:', error);
      }
    };

    fetchDataFromLS();
  }, [likedBreeds]);

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



// export const saveLikedBreeds = async (likedBreeds) => {
//   try {
//     // Filter out breeds with null or undefined names
//     const filteredBreeds = likedBreeds.filter((breed) => breed.name);
//     if (filteredBreeds.length !== likedBreeds.length) {
//       console.log('nope from handlefavorites');
//     }

//     await AsyncStorage.setItem('likedBreeds', JSON.stringify(filteredBreeds));

//   } catch (error) {
//     console.log('Error saving liked breeds:', error);
//   }
// }

// export const getLikedBreeds = async () => {
//   try {
//     const likedBreeds = await AsyncStorage.getItem('likedBreeds');
//     return likedBreeds ? JSON.parse(likedBreeds) : [];
//   } catch (error) {
//     console.log('Error getting liked breeds:', error);
//     return [];
//   }
// }

// export const clearLikedBreeds = async () => {
//   Alert.alert(
//     'Confirm Clear',
//     'Are you sure you want to clear liked breeds from local storage?',
//     [
//       {
//         text: 'Cancel',
//         style: 'cancel',
//       },
//       {
//         text: 'OK',
//         onPress: async () => {
//           try {
//             await AsyncStorage.removeItem('likedBreeds');
//             Alert.alert('Success', 'Liked breeds cleared from local storage');
//             console.log('Liked breeds cleared from local storage');
//           } catch (error) {
//             Alert.alert('Error', 'Failed to clear liked breeds from local storage');
//             console.log('Error clearing liked breeds from local storage:', error);
//           }
//         },
//       },
//     ]
//   );
// };

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
