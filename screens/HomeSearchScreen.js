import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';
import SearchBar from '../components/SearchBar';
import RandomBreedAPI from '../components/RandomBreedAPI';
import Title from '../components/Title';


import { useFonts, SplashScreen } from 'expo-font';
import { useCallback } from 'react';

export default function HomeSearchScreen({ navigation }) { // gets the navigation prop from App.js
  // could also be written completely from a start like this: (needs to be imported though)
  //  const navigation = useNavigation();


  const [showRandomBreed, setShowRandomBreed] = useState(false);

  const handleGetRandomBreed = () => {
    // Set showRandomBreed to true to render the RandomBreedAPI component
    setShowRandomBreed(true);
  };

  //reset the showRandomBreed state to false when the component re-renders
  useLayoutEffect(() => {
    setShowRandomBreed(false);
  }, [handleGetRandomBreed]); //suorittaa aina kun handleGetRandomBreed muuttuu



  const [fontsLoaded, fontError] = useFonts({
    'Pacifico': require('../assets/fonts/Pacifico-Regular.ttf'),
    'Comfortaa': require('../assets/fonts/Comfortaa-VariableFont_wght.ttf'),

  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
      console.log('Fonts loaded:', fontsLoaded);
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (

    <ScrollView
      // onLayout={onLayoutRootView}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps='handled'
    
    >
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Title />


        <View style={styles.contHome}>

          <Text style={styles.teksti}>Here you can find information about different dog breeds</Text>
          <SearchBar />
          <Text style={styles.teksti}>Or get a random breed by pressing the button below!</Text>
          <TouchableOpacity style={styles.btn} onPress={handleGetRandomBreed}>
            <Text style={styles.btnTxt}>Get random breed</Text>
          </TouchableOpacity>

          {showRandomBreed && <RandomBreedAPI />}

        </View>

       

      </View>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  contHome: {
    flex: 1,
    margin: 18,
    padding: 10,
    alignItems: 'center',
    // justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: '#d0e1dd',
  },
  favBtn: {
    width: 200,
    backgroundColor: '#d4bab6',
    borderRadius: 10,
    color: '#f5f5f5',
    marginBottom: 10,
  },
  welcomeText: {
    fontFamily: 'Comfortaa',
    fontSize: 16,
    color: '#78767B',
    textAlign: 'center',

  },

  teksti: {
    fontFamily: 'Comfortaa',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 40,
    color: '#78767B',

  },
  btn: {
    width: 230,
    padding: 20,
    backgroundColor: '#AE8781',
    borderRadius: 20,

    alignItems: 'center',
  },
  btnTxt: {
    fontSize: 18,
    color: '#EAEAEA',
    fontFamily: 'Comfortaa',


  },
});



