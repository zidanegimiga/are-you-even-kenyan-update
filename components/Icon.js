import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { SvgXml } from 'react-native-svg';
import Home from '../assets/icons/home.svg'
import Leaderboard from '../assets/icons/leaderboard.svg'
import Information from '../assets/icons/information.svg'
import OptionsWhite from '../assets/icons/optionsWhite.svg'
import Options from '../assets/icons/options.svg'
import Close from '../assets/icons/close.svg'
import Sound from '../assets/icons/sound.svg'
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
        if(color === "white"){
            return (
                <TouchableOpacity onPress={goToInformationScreen}>
                    <OptionsWhite width={32} height={32} fill={color}/>
                </TouchableOpacity>
            )
        } else{
            return (
                <TouchableOpacity onPress={goToInformationScreen}>
                    <Options width={32} height={32} fill={color}/>
                </TouchableOpacity>
            )
        }
    } else if (name === "close") {
        return (
            <Close width={size} height={size} />
        )
    } else if (name === "sound") {
        return (
            <Sound width={size} height={size} />
        )
    }
}

export default Icon;

const styles = StyleSheet.create({})