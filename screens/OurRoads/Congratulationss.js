import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity, Platform, Linking, Share, Dimensions } from 'react-native'
import { useFonts } from 'expo-font'
import React, { useContext, useRef, useEffect, useState } from 'react'
import { GameContext } from '../../global/OurRoadsContext'
import SharableComponent from '../../components/SharableComponent'
import { Video } from 'expo-av';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import { useRouter, Link } from 'expo-router';
import * as Sharing from 'expo-sharing';
import { Audio } from 'expo-av';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withSpring, withDelay } from 'react-native-reanimated';

const windowHeight = Dimensions.get('window').height;

{/**

*/}


export default function Somea({ navigation }) {
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

  return (
    <View style={styles.pageContainer}>
      <View>
        <Animated.Text style={[styles.text]}>
          On the real though, there is nothing to celebrate about. [x] number of Kenyans lose their lives every year. So why don't you be a little courteous and take care of others on the road
        </Animated.Text>
      </View>
      <View style={styles.scoreButtonContainer}>
        <TouchableOpacity style={styles.scoreButton} onPress={handleBackHome}>
          <Text style={styles.score}>Back Home</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.nairobi}>
        <Image
          source={require('../../assets/images/blueSkyLine.png')}
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
          source={require('../../assets/images/sadPeople.png')}
          style={{
            width: "100%"
          }}
        />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingLeft: 8
  },
  pageContainer: {
    flex: 1,
    backgroundColor: '#AFDEFF',
    paddingTop: 80
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
    top: '0%',
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