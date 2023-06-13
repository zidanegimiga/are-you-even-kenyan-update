import React from 'react'
import { Text, View, StyleSheet, Platform, Dimensions, TouchableOpacity } from 'react-native'
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('screen');

const Question = ({ questions, onPressA, onPressB, next, index, showSubmit }) => {
    const [loaded] = useFonts({
        'outfit-medium': require('../assets/fonts/Outfit-Medium.ttf'),
    })
    const navigation = useNavigation();

    if (!loaded) {
        return null;
    }
    return (
        <View style={styles.questionContainer}>
            <Text style={styles.question}>{questions.q}</Text>
            <View style={styles.optionsContainer}>
                <TouchableOpacity style={styles.option}>
                    <Text style={styles.bigLetter}>A</Text>
                    <Text style={styles.optionText}>{questions.a}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option} onPress={onPressB}>
                    <Text style={styles.bigLetter}>B</Text>
                    <Text style={styles.optionText}>{questions.o}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonsContainer}>
                {showSubmit && (
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Our Roads - Congratulations")}>
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
    checkScore: {
        color: "#A80C89",
        fontFamily: "outfit-medium",
        fontSize: 16
    }
})

export default Question