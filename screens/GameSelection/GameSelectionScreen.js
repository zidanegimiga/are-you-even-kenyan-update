import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Leaderboard from './Leaderboard';
import Information from './Information';
import SelectGame from './SelectGame';
import CustomTabBar from '../../components/CustomTabBar';


const Tab = createBottomTabNavigator()

const tabBarStyles = {
}

const GameSelectionScreen = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={({ route }) => (
        {
          headerShown: false,
          tabBarShowLabel: false,
          tabBarInactiveTintColor: "black",
          tabBarStyle: styles.tabBarStyle,
          tabBarActiveTintColor: "green",
          tabBarIcon: ({color, size, focused}) =>{
            let iconName;

            if(route.name === "home"){
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === "leaderboard"){
              iconName = focused ? 'leaderboard' : 'leaderboard-outline';              
            } else if( route.name === "information"){
              iconName === focused ? 'information' : 'information-outline';
            }

            return <Icon name={iconName} size={22} color={color} />;
          }
        }
      )}
    >
      <Tab.Screen name="SelectGame" component={SelectGame} />
      <Tab.Screen name="Leaderboard" component={Leaderboard} />
      <Tab.Screen name="Information" component={Information} />
    </Tab.Navigator>
  )
}

export default GameSelectionScreen;

const styles = StyleSheet.create({})