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


export default function Congratulatio({ navigation }) {
  const [sound, setSound] = useState();
  const [showIGStory, setShowIGStory] = useState(false)
  const { totalScore, setTotalScore, setScore, score } = useContext(GameContext)
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  const translateY = useSharedValue(windowHeight); // Start from the bottom of the screen

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

  const handleBackHome = () => {
    setScore(0)
    // setTotalScore(0)
    navigation.navigate("Home")
    console.log("Back home")
  }

  React.useEffect(() => {
    setTimeout(() => {
      score >= 50 ? playCheerSound() : playJeerSound();
      // playJeerSound()
    }, 1000)
  }, []);

  React.useEffect(() => {
    return sound ? () => {
      sound.unloadAsync();
    } : undefined;
  }, [sound]);

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

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.pageContainer}>
      {/* <View ref={shareableCompRef}>
        <SharableComponent score={Math.round(score)} />
      </View>
      <View style={styles.scoreButtonContainer}>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Text style={styles.shareText}>Share with your friends</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.scoreButton} onPress={handleBackHome}>
          <Text style={styles.score}>Back Home</Text>
        </TouchableOpacity>
      </View> */}
      <View>
        <Text style={{ fontFamily: 'mutiara-display-shadow', fontSize: 32, textAlign: "center" }}>Haiya!</Text>
        <Text style={{ fontFamily: 'mutiara-display-shadow', fontSize: 32, textAlign: "center" }}>Tuseme</Text>
        <Text style={{ fontFamily: 'mutiara-display-shadow', fontSize: 32, textAlign: "center" }}>you're</Text>
        <Text style={{ fontFamily: 'mutiara-display-shadow', fontSize: 32, textAlign: "center" }}>Kenyan?</Text>
      </View>
      <View>
        <Text style={{ fontFamily: 'mutiara-display-shadow', fontSize: 48, textAlign: "center" }}>{score}%</Text>
      </View>
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
        <Image
          source={require('../../assets/images/shocked.png')}
          style={{
            width: "100%"
          }}
        />
      </Animated.View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingLeft: 8
  },
  pageContainer: {
    flex: 1,
    backgroundColor: '#FDEEDA',
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
    top: '90%'
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
    bottom: 0
  },
  shocked: {
    position: "absolute",
    width: "100%",
    height: "30%",
    bottom: 0,
    left: 0
  }
})
