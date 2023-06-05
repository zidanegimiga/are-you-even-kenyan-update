import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Leaderboard from './Leaderboard';
import Information from './Information';
import SelectGame from './SelectGame';

const Tab = createBottomTabNavigator()

const tabBarStyles = {
}

const GameSelectionScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        showLabel: false,
        style: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#ffffff",
          borderRadius: 8,
          height: 90
        }
      }}
    >
      <Tab.Screen name="SelectGame" component={SelectGame} />
      <Tab.Screen name="Leaderboard" component={Leaderboard} />
      <Tab.Screen name="Information" component={Information} />
    </Tab.Navigator>
  )
}

export default GameSelectionScreen;

const styles = StyleSheet.create({})