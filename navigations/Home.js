import React from 'react';
import { StyleSheet } from 'react-native'
import Icon from '../components/Icon';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from '../components/CustomTabBar';
import SelectGame from '../screens/GameSelection/SelectGame';
import Leaderboard from '../screens/GameSelection/Leaderboard';
import Information from '../screens/GameSelection/Information';
import { useFonts } from 'expo-font';

const Tab = createBottomTabNavigator();

function HomeNavigator() {
    const [loaded] = useFonts({
        'mutiara-display': require('../assets/fonts/Mutiara_Display_02.ttf'),
        'outfit-regular': require('../assets/fonts/Outfit-Regular.ttf'),
    })
    return (
        <Tab.Navigator
            tabBar={props => <CustomTabBar {...props} />}
            screenOptions={({ route }) => (
                {
                    headerRight: (props) => (
                        <Icon name={"settings"} />
                    ),
                    headerTransparent: true,
                    headerStyle: {
                        backgroundColor: "#8967CE"
                    },
                    headerRightContainerStyle: {
                        padding: 16
                    },
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarInactiveTintColor: "red",
                    tabBarStyle: styles.tabBarStyle,
                    tabBarIcon: ({ color, size, focused }) => {
                        let iconName;

                        if (route.name === "SelectGame") {
                            iconName = 'home';
                        } else if (route.name === "Leaderboard") {
                            iconName = 'leaderboard';
                        } else if (route.name === "Information") {
                            iconName = 'information';
                        }

                        return (
                            <Icon name={iconName} size={22} color={color} />
                        );
                    }
                }
            )}
        >
            <Tab.Screen name="SelectGame" component={SelectGame} />
            {/* <Tab.Screen name="Leaderboard" component={Leaderboard} /> */}
            <Tab.Screen name="Information" component={Information} headerStyle={{}} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBarStyle: {
        position: "absolute",
        bottom: "20%",
        height: 80,
        borderRadius: 20,
        width: "90%",
        left: "5%"
    }
})

export default HomeNavigator;