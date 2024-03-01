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
            header: (props) => <MainAppbar {...props}
              backgroundColor="#f5f5f5" //toimii
              icon="menu" //välitetään Appbar.Header Menulle
              color="#8E8A92" //välitetään Appbar.Header styleen
              fontFamily="Comfortaa" //välitetään Appbar.Content titleStyleen
              fontSize={16} // välitetään Appbar.Content titleStyleen
            />,
          }}>

          <Stack.Screen name="Search" component={HomeSearchScreen}
            options={{ title: 'Search' }} />

          <Stack.Screen name="Breed Info" component={InfoScreen}
            options={{ title: 'Info card' }} />

          <Stack.Screen name="Favorites" component={FavoritesScreen}
            options={{ title: 'Your favorites' }} />

          <Stack.Screen name="Settings" component={SettingsScreen}
            options={{ title: 'Settings' }} />

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
