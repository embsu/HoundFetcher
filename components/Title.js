import React from 'react';
import { Text, StyleSheet, View, Image } 
from 'react-native';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';

export default function Title() {
    
    const [fontsLoaded, fontError] = useFonts({
        'Pacifico': require('../assets/fonts/Pacifico-Regular.ttf'),
        
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
    <View style={styles.titlecont}>
    <Text style={styles.title}>HoundFetcher</Text>
    <Image source={require('../assets/icons/dog.png')} style={{ width: 50, height: 50 }} />
    </View>
   
  );
};

const styles = StyleSheet.create({
    titlecont: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
  title: {
    fontFamily: 'Pacifico',
    fontSize: 32,
    color: '#AE8781',
  },
});

