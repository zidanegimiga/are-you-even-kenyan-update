import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useFonts } from 'expo-font';

function Nickname({setNickname, nickname}) {
    const handleInputChange = (text) => {
      setNickname(text);
    };
  
    const handleInputPress = () => {
      // Perform any action when the input is pressed
    };
    const [loaded] = useFonts({
        'outfit-regular': require('../assets/fonts/Outfit-Regular.ttf'),
        'outfit-semibold': require('../assets/fonts/Outfit-SemiBold.ttf'),
        'outfit-medium': require('../assets/fonts/Outfit-Medium.ttf'),
    });

    if (!loaded) {
        return null;
    }
    return (
        <View style={styles.nicknameContainer}>
            <View style={styles.subTextContainer}>
                <Text style={[styles.subtext]}>Ehm... Roomkeeping!</Text>
                <Text style={styles.subtext}> Let's get to know you first.</Text>
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.question}> What's your </Text>
                <Text style={styles.question}> name? </Text>
                <KeyboardAvoidingView behavior="padding">
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                        <View style={{ }}>
                            <TextInput
                                style={styles.input}
                                value={nickname}
                                onChangeText={handleInputChange}
                                onPress={handleInputPress}
                                placeholder='Name (A pseudo name works too!)'
                            />
                            {/* <Text style={styles.subtextB}> We only use your name for our leaderboards </Text> */}
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </View>
        </View>
    )
}

export default Nickname;

const styles = StyleSheet.create({
    nicknameContainer: {
        padding: 16
    },
    subTextContainer: {
        backgroundColor: "rgba(168, 12, 137, 0.53)",
        width: "48%",
        paddingHorizontal: 8,
        paddingVertical: 12,
        borderRadius: 16,
        marginTop: 8,
    },
    subtext: {
        fontSize: 12,
        fontFamily: "outfit-semibold",
        color: '#3B3838'
    },
    subtextB: {
        fontSize: 12,
        fontFamily: "outfit-semibold",
        color: '#A80C89',
        marginTop: 8
    },
    formContainer: {
        marginTop: 16
    },
    question: {
        fontFamily: 'outfit-semibold',
        fontSize: 40,
        fontWeight: 'bold',
        color: '#3B3838'
    },
    input: {
        marginTop: 100,
        borderBottomColor: 'black',
        borderWidth: 1,
        borderLeftColor: '#FDEEDA',
        borderRightColor: '#FDEEDA',
        borderTopColor: '#FDEEDA',
        paddingBottom: 8,
        fontSize: 20,
        color: '#3B3838',
        fontFamily: 'outfit-regular'
    }
})