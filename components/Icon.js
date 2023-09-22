import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useContext } from 'react'
import { SvgXml } from 'react-native-svg';
import Home from '../assets/icons/home.svg'
import Leaderboard from '../assets/icons/leaderboard.svg'
import Information from '../assets/icons/information.svg'
import OptionsWhite from '../assets/icons/optionsWhite.svg'
import Options from '../assets/icons/options.svg'
import Close from '../assets/icons/close.svg'
import Sound from '../assets/icons/sound.svg'
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';
import { GameContext } from '../global/OurRoadsContext';

const Icon = ({ name, size, color }) => {
    const [sound, setSound] = useState()
    const playBtnClickSound = async () => {
        const { sound } = await Audio.Sound.createAsync(require('../assets/game-audio/option.mp3'));
        setSound(sound);
        await sound.playAsync();
    }
    const { soundEnabled, setSoundEnabled } = useContext(GameContext);

    React.useEffect(() => {
        return sound ? () => {
            sound.unloadAsync();
        } : undefined;
    }, [sound]);

    const navigation = useNavigation();

    const goToInformationScreen = () => {
        if(soundEnabled){
            playBtnClickSound()
            navigation.navigate('Settings'); 
        } else{
            navigation.navigate('Settings'); 
        }    
    };

    const goToHomeScreen = () => {
        if(soundEnabled){
            playBtnClickSound()
            navigation.goBack();
        }  else{
            navigation.navigate('SelectGame');
        }      
    };

    // if (name === "home") {
    //     return (
    //         <Home width={size} height={size} />
    //     )
    // } else if (name === "leaderboard") {
    //     return (
    //         <Leaderboard width={size} height={size} />
    //     )
    // } else if (name === "information") {
    //     return (
    //         <Information width={size} height={size} />
    //     )
    // } else if (name === "settings") {
    //     if(color === "white"){
    //         return (
    //             <TouchableOpacity onPress={goToInformationScreen}>
    //                 <OptionsWhite width={32} height={32} fill={color}/>
    //             </TouchableOpacity>
    //         )
    //     } else{
    //         return (
    //             <TouchableOpacity onPress={goToInformationScreen}>
    //                 <Options width={32} height={32} fill={color}/>
    //             </TouchableOpacity>
    //         )
    //     }
    // } else if (name === "close") {
    //     return (
    //         <TouchableOpacity onPress={goToHomeScreen}>
    //             <Close width={size} height={size} />
    //         </TouchableOpacity>            
    //     )
    // } else if (name === "sound") {
    //     return (
    //         <Sound width={size} height={size} />
    //     )
    // }

    const iconMap = {
        home: <Home width={size} height={size} />,
        leaderboard: <Leaderboard width={size} height={size} />,
        information: <Information width={size} height={size} />,
        settings: color === "white" ? (
            <TouchableOpacity onPress={goToInformationScreen}>
                <OptionsWhite width={32} height={32} fill={color} />
            </TouchableOpacity>
        ) : (
            <TouchableOpacity onPress={goToInformationScreen}>
                <Options width={32} height={32} fill={color} />
            </TouchableOpacity>
        ),
        close: (
            <TouchableOpacity onPress={goToHomeScreen}>
                <Close width={size} height={size} />
            </TouchableOpacity>
        ),
        sound: <Sound width={size} height={size} />,
    };

    return iconMap[name] || iconMap["home"];
}

export default Icon;

const styles = StyleSheet.create({})