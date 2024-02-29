import React, { useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, Platform, FlatList } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function SearchBar() {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [dogBreeds, setDogBreeds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [selectedBreedId, setSelectedBreedId] = useState(null);

  useEffect(() => {
    fetch('https://api.thedogapi.com/v1/breeds')
      .then(response => response.json())
      .then(json => {
        const breedNames = json.map(breed => ({ label: breed.name, value: breed.id })); // map each breed name and id for dropdown
        setDogBreeds(breedNames); // set the breed names to the state
        // console.log('Breed names:', breedNames);
      })
      .catch(error => {
        console.error('Error fetching dog breeds:', error);
      });
  }, []);


  const navigation = useNavigation();

  const handleBreedSelect = (breedId) => { //parameter breedId is the value of the selected breed given when the user selects a breed from the dropdown
    const selectedBreed = dogBreeds.find(breed => breed.value === breedId); // takes an individual element of the dogBreeds array 
    //(referred to as breed) and checks if its value property is equal to the breedId.
    if (selectedBreed) {                                                    //  contain the first element in the dogBreeds array where the value property matches the breedId
      console.log('\nFROM searchbar.js: \nSelected breed: ', selectedBreed.label, '\nValue/ID:', selectedBreed.value, '\nBreed ID:', breedId);
      setSelectedBreed(selectedBreed.label);
      setSelectedBreedId(selectedBreed.value);

      navigation.navigate('Breed Info', { breedName: selectedBreed.label, selBreedId: selectedBreed.value }); //muuttujat johon tallennettu valittu rotu ja sen id

    } else {
      console.warn('Selected breed not found');
    }
  };

  return (
  
  
    <DropDownPicker
      maxHeight={300}
      style={styles.dropdown}
      containerStyle={{ height: 120 }}
      // disabledStyle={{opacity: 0.5, backgroundColor: 'white'}}
      placeholderStyle={{ color: '#88858C', }}
      textStyle={{ fontSize: 18, fontFamily: 'Comfortaa', }}
      // dropDownDirection="BOTTOM"
      dropDownContainerStyle={{
        backgroundColor: "#EAEAEA",
        color: '#DCDCDC',


     
        
      }}
      listMode='SCROLLVIEW'


      showArrowIcon={true}
      open={open}
      value={value}
      items={dogBreeds}

      onSelectItem={(dogBreeds) => handleBreedSelect(dogBreeds.value)}
      setOpen={setOpen}
      setValue={setValue}
      //   setItems={setBreedName}
      placeholder="Select a dog breed"

      searchable={true} // Enable search functionality


      searchPlaceholder="Type to search a breed.." // Placeholder text for search input
    
      searchError={() => <Text>No breed found</Text>} // Error message when no matching item is found
      translation={{
        NOTHING_TO_SHOW: "No breeds found"
      }}
      onClose={() => setOpen(false)} // Close the dropdown when it loses focus
      disabled={loading} // Disable the dropdown when the loading is in progress
    />
   

  );
}


const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: "#EAEAEA",








  },

});

