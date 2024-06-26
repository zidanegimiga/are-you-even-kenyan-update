import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OurRoads from '../screens/OurRoads/OurRoads';
import Congratulations from '../screens/OurRoads/Congratulations';

const Stack = createNativeStackNavigator();

function OurRoadsNavigator() {
    return (
      <Stack.Navigator screenOptions={{}} >
        <Stack.Screen
          name={"Our Roads - Home"}
          options={{headerShown: false}}
          component={OurRoads}
        />
        <Stack.Screen
          name={"Our Roads - Congratulations"}
          options={{headerShown: false}}
          component={Congratulations}
        />
      </Stack.Navigator>
    );
  }
  
  export default OurRoadsNavigator;