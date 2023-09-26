import React, { useContext, useRef, useEffect, useState } from 'react'
import { Dimensions, Pressable, Button, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { GameContext } from '../../global/OurRoadsContext'
import Animated, { Easing, useSharedValue, useAnimatedStyle, withSpring, withDelay } from 'react-native-reanimated';
import { useFonts } from 'expo-font';
import * as Sharing from 'expo-sharing';
import { Audio } from 'expo-av';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import ConfettiAnimation from '../../components/ConfettiAnimation';
import blueSkyline from "../../assets/images/blueSkyLine.png"
import greenSkyline from "../../assets/images/bestIntro.png"
import sadPeople from "../../assets/images/sadPeople.png"
import bestPeople from "../../assets/images/bestPeople.png"
import { fetchScoreAndCallSetState, storeCurrentScoreOfWrongAnswers } from '../../global/utils/AsyncStorageUtils';

const SCREEN_CONTENT_MORE_KENYAN = {
    info_text: "On the real though, there is nothing to celebrate about. Averagely, 3000 Kenyans lose their lives every year. So why don't you be a little courteous and take care of others on the road",
    backgroundImageSrc: blueSkyline,
    screenColor: "#AFDEFF",
    screenImage: sadPeople
}

const SCREEN_CONTENT_LESS_KENYAN = {
    info_text: "We wish more Kenyans drove as well as you do. We would save more lives",
    backgroundImageSrc: greenSkyline,
    screenColor: "#E6FADB",
    screenImage: bestPeople,
}


const windowHeight = Dimensions.get('window').height;

const { height, width } = Dimensions.get("window");

export default function FeedbackScreen({ navigation }) {
    const translateY = useSharedValue(windowHeight);
    const { score, setScore } = useContext(GameContext);

    const lessKenyan = score <= 50
    const { info_text, backgroundImageSrc, screenColor, screenImage } = lessKenyan ? SCREEN_CONTENT_LESS_KENYAN : SCREEN_CONTENT_MORE_KENYAN

    useEffect(() => {
        translateY.value = withDelay(
            2000,
            withSpring(-100, { damping: 5, stiffness: 20 }) // Animate to the top of the screen
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
        };
    });

    const handleBackHome = () => {
        setScore(0)
        navigation.navigate("Home")
    }

    return (
        <View style={[styles.pageContainer, { backgroundColor: screenColor }]}>
            <View>
                <Animated.Text style={[styles.text]}>
                    {info_text}
                </Animated.Text>
            </View>
            <View style={styles.scoreButtonContainer}>
                <TouchableOpacity style={styles.scoreButton} onPress={handleBackHome}>
                    <Text style={styles.score}>Back Home</Text>
                </TouchableOpacity>
            </View>
            {lessKenyan && <ConfettiAnimation />}
            <View style={styles.nairobi}>
                <Image
                    source={backgroundImageSrc}
                />
            </View>
            <Animated.View
                from={{
                    opacity: 0,
                    scale: 0.5,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                }}
                transition={{
                    type: 'timing',
                }}
                style={[styles.shocked, animatedStyle]}
            >
                <Image
                    source={screenImage}
                    style={{
                        width: "100%"
                    }}
                />
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
        height,
        elevation: 50,
        zIndex: 1,
        paddingTop: 40,
        position: "absolute",
        top: 0,
        left: 0
    },
    header: {
        width: '100%',
        paddingLeft: 8
    },
    pageContainer: {
        flex: 1,
        backgroundColor: '#E6FADB',
        paddingTop: 120
    },
    text: {
        textAlign: "center",
        fontSize: 20
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 183,
        height: 173,
        marginTop: 40
    },
    scoreButtonContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: '45%',
        zIndex: 15
    },
    scoreButton: {
        backgroundColor: '#5A3C96',
        borderRadius: 8,
        width: 240,
        height: 48,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16
    },
    shareButton: {
        backgroundColor: '#5A3C9600',
        borderRadius: 8,
        borderColor: '#5A3C96',
        borderWidth: 2,
        width: 240,
        height: 48,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    score: {
        color: '#ffffff'
    },
    shareText: {
        color: '#5A3C96'
    },
    nairobi: {
        position: "absolute",
        bottom: 0,
    },
    shocked: {
        position: "absolute",
        width: "100%",
        height: "30%",
        bottom: 0,
        left: 0
    },
})