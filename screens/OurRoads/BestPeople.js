import React, { useContext, useRef, useEffect, useState } from 'react'
import { Dimensions, Pressable, Button, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { GameContext } from '../../global/OurRoadsContext'
import {
    Canvas,
    Group,
    RoundedRect,
    runTiming,
    Skia,
    useComputedValue,
    useValue,
    vec,
} from "@shopify/react-native-skia";
import { processTransform3d, toMatrix3 } from "react-native-redash";
import Animated, { Easing, useSharedValue, useAnimatedStyle, withSpring, withDelay } from 'react-native-reanimated';
import { useFonts } from 'expo-font';
import * as Sharing from 'expo-sharing';
import { Audio } from 'expo-av';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';

const windowHeight = Dimensions.get('window').height;
const colors = ["magenta", "pink", "green", "blue", "yellow"];

const NUM_OF_CONFETTI = 500;

const { height, width } = Dimensions.get("window");

const relativeSin = (yPosition, offsetId) => {
    const rand = Math.sin((yPosition - 500) * (Math.PI / 540));
    const otherrand = Math.cos((yPosition - 500) * (Math.PI / 540));
    return offsetId % 2 === 0 ? rand : -otherrand;
};

const ConfettiPiece = ({
    startingXOffset,
    startingYOffset,
    offsetId,
    colorCode,
}) => {
    const WIDTH = 10;
    const HEIGHT = 30;
    const seed = Math.random() * 4;

    const centerY = useValue(0);
    const yPosition = useValue(startingYOffset);

    const origin = useComputedValue(() => {
        centerY.current = yPosition.current + HEIGHT / 2;
        const centerX = startingXOffset + WIDTH / 2;
        return vec(centerX, centerY.current);
    }, [yPosition]);

    runTiming(yPosition, height * 3, {
        duration: 5500,
    });

    const matrix = useComputedValue(() => {
        const rotateZ =
            relativeSin(yPosition.current, Math.round(Number(offsetId))) * seed * 2.5;
        const rotateY =
            relativeSin(yPosition.current, Math.round(Number(offsetId))) * seed * 1.5;
        const rotateX =
            relativeSin(yPosition.current, Math.round(Number(offsetId))) * seed * 1.5;
        const mat3 = toMatrix3(
            processTransform3d([
                { rotateY: rotateY },
                { rotateX: rotateX },
                { rotateZ: rotateZ },
            ])
        );

        return Skia.Matrix(mat3);
    }, [yPosition]);

    return (
        <Group matrix={matrix} origin={origin}>
            <RoundedRect
                r={8}
                x={startingXOffset}
                y={yPosition}
                height={WIDTH}
                width={HEIGHT}
                color={colors[colorCode]}
            />
        </Group>
    );
};


export default function BestPeople({ navigation }) {
    const [confettiPieces, setConfettiPieces] = useState([]);
    const translateY = useSharedValue(windowHeight);
    const buttonFade = useSharedValue(0);
    const fade = useSharedValue(0);

    const animate = () => {
        fade.value = withDelay(
            1,
            withSpring(1, { damping: 15, stiffness: 20 }) // Animate to the top of the screen
        );
    };

    useEffect(() => {
        translateY.value = withDelay(
            2000,
            withSpring(-100, { damping: 5, stiffness: 20 }) // Animate to the top of the screen
        );
    }, []);

    useEffect(() => {
        setTimeout(startAnimation, 2500)
        setTimeout(animate, 1500)
    }, [])

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
        };
    });

    const handleBackHome = () => {
        // setScore(0)
        // setTotalScore(0)
        navigation.navigate("Home")
        console.log("Back home")
    }

    const startAnimation = () => {
        const pieces = [];

        for (let i = 0; i < NUM_OF_CONFETTI; i++) {
            const startingXOffset = Math.random() * width;
            const startingYOffset = -Math.random() * (height * 3);
            const id = i + Math.random() + "";
            pieces.push({
                offsetId: id,
                startingXOffset,
                startingYOffset,
                colorCode: i % colors.length,
            });
        }

        setConfettiPieces(pieces);
    };

    return (
        <View style={styles.pageContainer}>
            <View>
                <Animated.Text style={[styles.text]}>
                    We wish more Kenyans drove as well as you do. We would save more lives
                </Animated.Text>
            </View>
            <View style={styles.scoreButtonContainer}>
                <TouchableOpacity style={styles.scoreButton} onPress={handleBackHome}>
                    <Text style={styles.score}>Back Home</Text>
                </TouchableOpacity>
            </View>
            <Canvas style={styles.container}>
                {confettiPieces.map((offset) => (
                    <ConfettiPiece key={offset.offsetId} {...offset} />
                ))}
            </Canvas>
            <View style={styles.nairobi}>
                <Image
                    source={require('../../assets/images/bestIntro.png')}
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
                    source={require('../../assets/images/bestPeople.png')}
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
        // backgroundColor: "white",
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
        top: '100%',
        zIndex: 10
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
        // height: "50%"
    },
    shocked: {
        position: "absolute",
        width: "100%",
        height: "30%",
        bottom: 0,
        left: 0
    },
})


// blue AFDEFF
// green E6FADB