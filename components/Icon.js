import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SvgXml } from 'react-native-svg';
import Home from '../assets/icons/home.svg'
import Leaderboard from '../assets/icons/leaderboard.svg'
import Information from '../assets/icons/information.svg'
import Options from '../assets/icons/options.svg'

const Icon = ({ name, size, color }) => {
    if (name === "home") {
        return (
            <Home width={size} height={size}/>
        )
    } else if( name === "leaderboard"){
        return (
            <Leaderboard width={size} height={size}/>
        )        
    } else if( name === "information"){
        return (
            <Information width={size} height={size}/>
        )
    } else if( name === "settings"){
        return(
            <Options width={32} height={32}/>
        )
    }
}

export default Icon;

const styles = StyleSheet.create({})