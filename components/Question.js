import React, { useState, useContext } from 'react'
import { Text, View, StyleSheet, Platform, Dimensions, TouchableOpacity } from 'react-native'
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { GameContext } from '../global/OurRoadsContext';
import {Audio} from 'expo-av';

const { width, height } = Dimensions.get('screen');

const Question = ({ questions, onPressA, onPressB, next, index, showSubmit }) => {
    const [sound, setSound] = useState();
    const [ soundPath, setsoundPath ] = useState(''); 
    const [selectedId, setSelectedId] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const { setScore, score, calculateScore, soundEnabled, setSoundEnabled } = useContext(GameContext);
    const [backgroundColorA, setBackgroundColorA] = useState('white');
    const [backgroundColorB, setBackgroundColorB] = useState('white');
    
    const playWrongSound =  async () => {
        const { sound } = await Audio.Sound.createAsync(require('../assets/game-audio/Our_Roads_Correct_Answer.mp3'));
        setSound(sound);
        await sound.playAsync();
    }

    const playCorrectSound =  async () => {
        const { sound } = await Audio.Sound.createAsync(require('../assets/game-audio/Our_Roads_Wrong_Answer.mp3'));
        setSound(sound);
        await sound.playAsync();
    }
    
    React.useEffect(()=> {
        return sound ? () => {
            sound.unloadAsync();
        } : undefined;
    }, [sound]);
    
    const [loaded] = useFonts({
      'outfit-medium': require('../assets/fonts/Outfit-Medium.ttf'),
    })

    const navigation = useNavigation();

    function handleSelectionA (index, questions){
        if(soundEnabled){
            playWrongSound()
            setSelectedOption('A') 
        } else{
            setSelectedOption('A') 
        }  
    }

    function handleSelectionB (index, questions){
        setSelectedOption('B')
        setScore(score + 1)
        onPressB()       
        if(soundEnabled){
            playCorrectSound()
        }
    }

    function handleGameEnd (){
        calculateScore() 
        navigation.navigate("Our Roads - Congratulations")
    }

    if (!loaded) {
        return null;
    }

    return (
        <View style={styles.questionContainer}>
            <Text style={styles.question}>{questions.question}</Text>
            <View style={styles.optionsContainer}>
                {
                    questions.options.map((o, i) =>{
                        return(
                            <TouchableOpacity style={[styles.option, 
                            // selectedOption === 'B' ? styles.selectedButton : null
                            ]} onPress={() => { onPressB(o) }} key={i}>
                                <Text style={styles.bigLetter}>{}</Text>
                                <Text style={styles.optionText}>{o}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
            <View style={styles.buttonsContainer}>
                {showSubmit && (
                    <TouchableOpacity style={styles.button} onPress={handleGameEnd}>
                        <Text style={styles.checkScore}> Check score {">>>"} </Text>
                    </TouchableOpacity>
                 )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    questionContainer: {
        marginTop: 64,
        paddingHorizontal: 28,
        width,
        height
    },
    question: {
        fontSize: 20,
        fontFamily: "outfit-medium"
    },
    optionsContainer: {
        marginTop: 18
    },
    option: {
        flexDirection: "row",
        alignItems: 'center',
        marginVertical: 10,
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderColor: "#C5C5C5",
        borderWidth: 1,
        borderRadius: 24,
        height: "auto",
        width: "auto"
    },
    bigLetter: {
        fontSize: 24,
        color: "#A80C89",
        fontFamily: "outfit-medium"
    },
    optionText: {
        marginLeft: 8
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: "center"
    },
    button: {
        borderWidth: 2,
        borderColor: "#A80C89",
        paddingVertical: 8,
        width: 200,
        height: 56,
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    selectedButton: {
        backgroundColor: "#D46FC0",
    },
    checkScore: {
        color: "#A80C89",
        fontFamily: "outfit-medium",
        fontSize: 16
    }
})

export default Question