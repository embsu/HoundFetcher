import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeSearchScreen from './screens/HomeSearchScreen';
import InfoScreen from './screens/InfoScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import MainAppbar from './components/MainAppbar';
import SettingsScreen from './screens/SettingsScreen';

import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import { PaperProvider } from 'react-native-paper';



export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    'Pacifico': require('./assets/fonts/Pacifico-Regular.ttf'),
    'Comfortaa': require('./assets/fonts/Comfortaa-VariableFont_wght.ttf'),

  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const Stack = createNativeStackNavigator(); // creates a stack of screens

  return (
    <PaperProvider>

    <NavigationContainer>


      <Stack.Navigator
        initialRouteName='Search'
        screenOptions={{
          // // title of the app
          // headerTitleAlign: 'center',
          // headerTitleStyle: {
          //   backgroundColor: '#f5f5f5',
          //   fontFamily: 'Comfortaa',
          //   fontSize: 18,
          //   color: '#8E8A92',
          // },

          header: (props) => <MainAppbar {...props}
            backgroundColor="#f5f5f5" //toimii
            icon="menu" //välitetään Appbar.Header styleen
            color="#8E8A92" //välitetään Appbar.Header styleen
  
            fontFamily="Comfortaa" //välitetään Appbar.Content titleStyleen
            fontSize={16} // välitetään Appbar.Content titleStyleen
          />,
        }}>



        <Stack.Screen name="Search" component={HomeSearchScreen}
          options={{ title: 'Search a breed' }} />

        <Stack.Screen name="Breed Info" component={InfoScreen}
          options={{ title: 'Breed Info' }} />

        <Stack.Screen name="Favorites" component={FavoritesScreen}
          options={{ title: 'Favorites title' }} />

        <Stack.Screen name="Settings" component={SettingsScreen}
          options={{ title: 'Settings title' }} />

      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
