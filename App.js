import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, Image } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Initial from './screens/Initial';
import OnboardingNavigator from './navigations/Onboarding';
import HomeNavigator from './navigations/Home';
import Settings from './screens/Settings';
import OurRoads from './navigations/OurRoads';
import { GameProvider } from './global/OurRoadsContext';
import Splash from './screens/Splash';

const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    'mutiara-display-shadow': require('./assets/fonts/Mutiara_Display_02_Shadow.ttf'),
    'outfit-regular': require('./assets/fonts/Outfit-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <GameProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator>
          <Stack.Screen name="splash" component={Splash} options={{ headerShown: false }} />
          <Stack.Screen name="Initial" component={Initial} options={{ headerShown: false }} />          
          <Stack.Screen name="Onboarding" component={OnboardingNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
          <Stack.Screen name="OurRoads" component={OurRoads} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </GameProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    paddingLeft: 16,
    backgroundColor: '#F8FF81',
  },

  buttonContainer: {
    width: '100%',
    marginTop: 48,
    flexDirection: "row",
  },

  button: {
    width: '80%',
    textAlign: 'center',
    borderColor: '#A80C89',
    borderWidth: 4,
    borderStyle: "solid",
    height: 48,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },

  buttonText: {
    color: "#2F203B",
    fontSize: 16,
    fontFamily: 'outfit-regular'
  },
  image: {
    position: 'absolute',
    bottom: 0,
  }
});
