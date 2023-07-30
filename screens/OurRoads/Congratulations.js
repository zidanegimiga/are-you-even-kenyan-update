import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity, Platform, Linking } from 'react-native'
import { useFonts } from 'expo-font'
import React, { useContext, useRef, useEffect, useState } from 'react'
import { GameContext } from '../../global/OurRoadsContext'
import SharableComponent from '../../components/SharableComponent'
import { Video } from 'expo-av';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import { useRouter, Link } from 'expo-router'
import * as Sharing from 'expo-sharing';
import { Audio } from 'expo-av';


export default function Congratulations({navigation}) {
  const [sound, setSound] = useState();
  const [showIGStory, setShowIGStory] = useState(false)
  const { totalScore, setTotalScore, setScore } = useContext(GameContext)
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  const [loaded] = useFonts({
    'mutiara': require('../../assets/fonts/Mutiara_Display_02.ttf'),
  });

  const shareableCompRef = useRef()

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
    setTotalScore(0)
    navigation.navigate("Home")
  }

  React.useEffect(() => {
    setTimeout(()=>{
      Math.round(totalScore) > 50 ? playCheerSound() : playJeerSound();
      // playJeerSound()
    }, 2000)
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
        quality: 0.8,
      });

      const asset = await MediaLibrary.createAssetAsync(imageURI);

      if (permissionToAccessMedia) {
        await MediaLibrary.createAlbumAsync('Expo', asset, false);
      } else {
        alert('You do not have permission to Access Media')
      }

      if (permissionToShare) {
        Sharing.shareAsync(asset.uri)
      } else {
        alert('You do not have permission to share')
      }

      setShowIGStory(permissionToAccessMedia)
    } catch (error) {
      console.error('Error while sharing:', error);
    }
  };
  
  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.pageContainer}>
      <View ref={shareableCompRef}>
        <SharableComponent score={Math.round(totalScore)} />
      </View>
      <View style={styles.scoreButtonContainer}>
        {/* <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Text style={styles.shareText}>Share with your friends</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.scoreButton} onPress={handleBackHome}>
          <Text style={styles.score}>Back Home</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: '#81FFE8'
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
  }
})