import React, { useState, useContext } from 'react'
import { Text, View, StyleSheet, Platform, Dimensions, TouchableOpacity } from 'react-native'
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { GameContext } from '../global/OurRoadsContext';

const { width, height } = Dimensions.get('screen');

const Question = ({ questions, onPressA, onPressB, next, index, showSubmit }) => {
    const [selectedId, setSelectedId] = useState('');
    const {setScore, score, calculateScore } = useContext(GameContext)
    const [backgroundColorA, setBackgroundColorA] = useState('white') 
    const [backgroundColorB, setBackgroundColorB] = useState('white') 
    
    
    const [loaded] = useFonts({
        'outfit-medium': require('../assets/fonts/Outfit-Medium.ttf'),
    })
    const navigation = useNavigation();

    if (!loaded) {
        return null;
    }

    function handleSelectionA (index, questions){
        setSelectedId(questions?.a)
        if(selectedId === questions.a){
            setBackgroundColorA("#f9c2ff")
        }
        setBackgroundColorB("white")      
    }

    function handleSelectionB (index, questions){
        setSelectedId(questions?.b)
        if(selectedId === questions.b){
            setBackgroundColorB("#f9c2ff")
        }
        setBackgroundColorA("white")
        setScore(score + 0.5)
        onPressB()       
    }

    function handleGameEnd (){
        calculateScore(); 
        navigation.navigate("Our Roads - Congratulations")
    }

    return (
        <View style={styles.questionContainer}>
            <Text style={styles.question}>{questions.q}</Text>
            <View style={styles.optionsContainer}>

                {/* TD: Create a reusable function for onPress */}
                <TouchableOpacity style={[styles.option, {backgroundColor: backgroundColorA}]} onPress={()=> handleSelectionA(index, questions)} disabled={false}>
                    <Text style={styles.bigLetter}>A</Text>
                    <Text style={styles.optionText}>{questions.a}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.option, {backgroundColor: backgroundColorB}]} onPress={(questions)=>{handleSelectionB(index, questions)}}>
                    <Text style={styles.bigLetter}>B</Text>
                    <Text style={styles.optionText}>{questions.o}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonsContainer}>
                {/* {showSubmit && ( */}
                    <TouchableOpacity style={styles.button} onPress={handleGameEnd}>
                        <Text style={styles.checkScore}> Check score {">>>"} </Text>
                    </TouchableOpacity>
                {/* )} */}
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
    checkScore: {
        color: "#A80C89",
        fontFamily: "outfit-medium",
        fontSize: 16
    }
})

export default Question