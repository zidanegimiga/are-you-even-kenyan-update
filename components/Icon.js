import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { SvgXml } from 'react-native-svg';
import Home from '../assets/icons/home.svg'
import Leaderboard from '../assets/icons/leaderboard.svg'
import Information from '../assets/icons/information.svg'
import Options from '../assets/icons/options.svg'
import { useNavigation } from '@react-navigation/native';

const Icon = ({ name, size, color }) => {
    const navigation = useNavigation();
    const goToInformationScreen = () => {
        navigation.navigate('Settings');
    };
    if (name === "home") {
        return (
            <Home width={size} height={size} />
        )
    } else if (name === "leaderboard") {
        return (
            <Leaderboard width={size} height={size} />
        )
    } else if (name === "information") {
        return (
            <Information width={size} height={size} />
        )
    } else if (name === "settings") {
        return (
            <TouchableOpacity onPress={goToInformationScreen}>
                <Options width={32} height={32} />
            </TouchableOpacity>
        )
    }
}

export default Icon;

const styles = StyleSheet.create({})