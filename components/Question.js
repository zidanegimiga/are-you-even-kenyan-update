import React, { useState, useContext } from 'react'
import { Text, View, StyleSheet, Platform, Dimensions, TouchableOpacity } from 'react-native'
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { GameContext } from '../global/OurRoadsContext';
import {Audio} from 'expo-av';

const { width, height } = Dimensions.get('screen');

const Question = ({ questions, onPress, }) => {
    const [sound, setSound] = useState();
    
    React.useEffect(()=> {
        return sound ? () => {
            sound.unloadAsync();
        } : undefined;
    }, [sound]);
    
    const [loaded] = useFonts({
      'outfit-medium': require('../assets/fonts/Outfit-Medium.ttf'),
    })

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
                            <TouchableOpacity 
                                style={[styles.option, 
                                ]}
                                onPress={() => { onPress(o) }} 
                                key={i}
                            >
                                <Text style={styles.bigLetter}>{""}</Text>
                                <Text style={styles.optionText}>{o}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
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