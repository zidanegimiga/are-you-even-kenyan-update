import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity, Platform, Linking } from 'react-native'
import { useFonts } from 'expo-font'
import React, { useContext, useRef, useEffect, useState } from 'react'
import { GameContext } from '../../global/OurRoadsContext'
import SharableComponent from '../../components/SharableComponent'
// import { Video } from 'expo-av';
// import { captureRef } from 'react-native-view-shot';
// import * as MediaLibrary from 'expo-media-library';
// import { useRouter, Link } from 'expo-router'
// import * as Sharing from 'expo-sharing';


export default function Congratulations({navigation}) {
  // const [showIGStory, setShowIGStory] = useState(false)
  const { totalScore, setTotalScore, lol, setScore } = useContext(GameContext)
  // const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  const [loaded] = useFonts({
    'mutiara': require('../../assets/fonts/Mutiara_Display_02.ttf'),
  });

  const shareableCompRef = useRef()
  if (!loaded) {
    return null;
  }

  const handleBackHome = () => {
    console.log("Total: ", lol)
    setScore(0)
    setTotalScore(0)        
    navigation.navigate("Home")
    
  }

  // const handleShare = async () => {
  //     try {
  //         // Check for permissions
  //         const permission  = await requestPermission()
  //         const permissionToAccessMedia = permission.granted
  //         const permissionToShare = await Sharing.isAvailableAsync()

  //         const imageURI = await captureRef(shareableCompRef, {
  //             format: 'png',
  //             quality: 0.8,
  //         });

  //         const asset = await MediaLibrary.createAssetAsync(imageURI);

  //         if(permissionToAccessMedia){
  //             await MediaLibrary.createAlbumAsync('Expo', asset, false);                                
  //         }else{
  //             alert('You do not have permission to Access Media')
  //         }

  //         if(permissionToShare){
  //             Sharing.shareAsync(asset.uri)
  //         } else{
  //             alert('You do not have permission to share')
  //         }

  //         setShowIGStory(permissionToAccessMedia)
  //     } catch (error) {
  //         console.error('Error while sharing:', error);
  //     }
  // };

  return (
    <SafeAreaView style={styles.pageContainer}>
      <View ref={shareableCompRef}>
        <SharableComponent score={Math.round(totalScore)} />
      </View>
      <View style={styles.scoreButtonContainer}>
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
    top: '95%'
  },
  scoreButton: {
    backgroundColor: '#5A3C96',
    borderRadius: 8,
    width: 240,
    height: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  score: {
    color: '#ffffff'
  }
})