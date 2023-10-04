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
import ConfettiAnimation from '../../components/ConfettiAnimation';

const colors = ["magenta", "pink", "green", "blue", "yellow"];

const NUM_OF_CONFETTI = 200;

const { height, width } = Dimensions.get("window");
const windowHeight = Dimensions.get('window').height;

const relativeSin = (yPosition, offsetId) => {
    const rand = Math.sin((yPosition - 500) * (Math.PI / 540));
    const otherrand = Math.cos((yPosition - 500) * (Math.PI / 540));
    return offsetId % 2 === 0 ? rand : -otherrand;
};


export const Congratulations = ({ navigation }) => {
    const [sound, setSound] = useState();
    const [confettiPieces, setConfettiPieces] = useState([]);
    const [isButtonVisible, setButtonVisible] = useState(false);

    const translateY = useSharedValue(windowHeight); // Start from the bottom of the screen
    const fade = useSharedValue(0)

    const { score } = useContext(GameContext);

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

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
        };
    });

    const animatedText = useAnimatedStyle(() => {
        return {
            opacity: fade.value,
        };
    });

    const [loaded] = useFonts({
        'mutiara': require('../../assets/fonts/Mutiara_Display_02.ttf'),
    });

    const shareableCompRef = useRef();

    const playCheerSound = async () => {
        const { sound } = await Audio.Sound.createAsync(require('../../assets/game-audio/Our_Roads_more_than_50%.mp3'));
        setSound(sound);
        await sound.playAsync();
    }

    const playJeerSound = async () => {
        const { sound } = await Audio.Sound.createAsync(require('../../assets/game-audio/less_than_50.mp3'));
        setSound(sound);
        await sound.playAsync();
    }

    const handleNext = () => {
        navigation.navigate("Best People")
    }

    React.useEffect(() => {
        setTimeout(() => {
            score >= 50 ? playJeerSound() : playCheerSound();
        }, 1000)
    }, []);

    React.useEffect(() => {
        return sound ? () => {
            sound.unloadAsync();
        } : undefined;
    }, [sound]);

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

    const handleShare = async () => {
        try {
            const permission = await requestPermission()
            const permissionToAccessMedia = permission.granted
            const permissionToShare = await Sharing.isAvailableAsync()

            const imageURI = await captureRef(shareableCompRef, {
                format: 'png',
                quality: 1,
            });
            console.log("URI: ", imageURI)

            const asset = await MediaLibrary.createAssetAsync(imageURI);

            if (permissionToAccessMedia) {
                // await MediaLibrary.createAlbumAsync('Expo', asset, false);
                console.log("Permission available")
            } else {
                console.log('You do not have permission to Access Media')
            }

            if (permissionToShare) {
                Sharing.shareAsync(asset.uri)
            } else {
                console.log('You do not have permission to share')
            }

            // setShowIGStory(permissionToAccessMedia)
        } catch (error) {
            console.error('Error while sharing:', error);
        }
        // try {
        //   const result = await Share.share({
        //     message:
        //       'React Native | A framework for building native apps using React',
        //   });
        //   if (result.action === Share.sharedAction) {
        //     if (result.activityType) {
        //       // shared with activity type of result.activityType
        //     } else {
        //       // shared
        //     }
        //   } else if (result.action === Share.dismissedAction) {
        //     // dismissed
        //   }
        // } catch (error) {
        //   Alert.alert(error.message);
        // }
    };

    useEffect(() => {
        setTimeout(startAnimation, 2500)
        setTimeout(animate, 1500)
    }, [])

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setButtonVisible(true);
        }, 2000);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <View style={styles.pageContainer}>
            <View>
                <Animated.Text style={[styles.text, { fontFamily: 'mutiara-display-shadow' }, animatedText]}>Haiya!</Animated.Text>
                <Animated.Text style={[styles.text, { fontFamily: 'mutiara-display-shadow' }, animatedText]}>Tuseme</Animated.Text>
                <Animated.Text style={[styles.text, { fontFamily: 'mutiara-display-shadow' }, animatedText]}>You're</Animated.Text>
                <Animated.Text style={[styles.text, { fontFamily: 'mutiara-display-shadow' }, animatedText]}>Kenyan?</Animated.Text>
                <View>
                    <Animated.Text style={[styles.text, { fontFamily: 'mutiara-display-shadow' }, animatedText]}>{score}%</Animated.Text>
                </View>
            </View>
            <View style={styles.scoreButtonContainer}>
                {/* <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
                    <Text style={styles.shareText}>Share with your friends</Text>
                </TouchableOpacity> */}
                {
                    isButtonVisible && 
                    <TouchableOpacity style={styles.scoreButton} onPress={handleNext}>
                        <Text style={styles.score}>Next</Text>
                    </TouchableOpacity>
                }
            </View>
            {score < 50 && <ConfettiAnimation />}
            <View style={styles.nairobi}>
                <Image
                    source={require('../../assets/images/nairobi.png')}
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
                {
                    score > 50 ? (
                        <Image
                            source={require('../../assets/images/shocked.png')}
                            style={{
                                width: "100%"
                            }}
                        />
                    ) : (
                        <Image
                            source={require('../../assets/images/shockedLessThan50.png')}
                            style={{
                                width: "100%"
                            }}
                        />
                    )
                }
            </Animated.View>
        </View>
    );
};

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
    text: {
        fontSize: 36,
        textAlign: "center"
    },
    header: {
        width: '100%',
        paddingLeft: 8
    },
    pageContainer: {
        flex: 1,
        backgroundColor: '#FDEEDA',
        position: "relative",
        paddingTop: 80,
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
        marginTop: 40,
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
        marginTop: 0,
        zIndex: 10
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
    }
});