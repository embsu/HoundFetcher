import React from 'react';
import { View, Text,ScrollView } from 'react-native';
import BreedCard from '../components/BreedCard';
export default function InfoScreen({route}) { // saa parametrina route-objektin, joka sisältää tiedot, jotka on lähetetty navigointiin liittyen

  // these from searchbar.js
    const { breedName } = route.params
    console.log('INFOSCREENISTÄ Breed name:', breedName);

    const { selBreedId } = route.params
    console.log('INFOSCREENISTÄ Breed ID:', selBreedId);
    //______________


  return (
    <View>
      <ScrollView>
      <BreedCard breedName={breedName} selBreedId={selBreedId} />
      </ScrollView>
    </View>
  );
};


