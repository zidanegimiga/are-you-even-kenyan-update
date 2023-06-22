import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/Onboarding';
import HomeNavigator from './Home';

const Stack = createNativeStackNavigator();

function OnboardingNavigator() {
    return (
      <Stack.Navigator screenOptions={{}} >
        <Stack.Screen
          name={"Onboarding - Home"}
          options={{headerShown: false}}
          component={OnboardingScreen}
        />
      </Stack.Navigator>
    );
  }
  
  export default OnboardingNavigator;