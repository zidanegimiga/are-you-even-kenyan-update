import { Image,StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Avatar({selectedAvatar, showAvatar}){
  const [avatar, setAvatar] = useState(null)
  const [loaded] = useFonts({
    'outfit-regular': require('../assets/fonts/Outfit-Regular.ttf'),
    'outfit-semibold': require('../assets/fonts/Outfit-SemiBold.ttf'),
});

  const retrieveAvatar = async () => {
    try {
      const value = await AsyncStorage.getItem('@avatar');
      if (value !== null) {
        // We have data!!
        console.log(value);
        setAvatar(value)
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  React.useEffect(()=> {
    retrieveAvatar()    
  }, [])

if (!loaded) {
    return null;
}
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>Pick an Avatar</Text>
      <View style={styles.avatarContainer}>
        <View style={styles.imageContainer}>
          <Image 
            source={
              selectedAvatar === null ? require('../assets/images/userAvatar.png') : selectedAvatar
            }
            style={styles.avatar}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.selectAvatarButton} onPress={()=> showAvatar()}>
          <Text style={styles.selectAvatarButtonText}>Select Avatar</Text>
        </TouchableOpacity>
      </View>      
    </View>
  )
}

export default Avatar

const styles = StyleSheet.create({
  screenContainer: {
    padding: 16
  },
  title:{
    fontFamily: "outfit-semibold",
    fontSize: 40,
    color: '#3B3838',
    textAlign: "center"
  },
  avatarContainer: {
    width: '100%',
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40    
  },
  imageContainer: {
    width: 160,
    height: 160,
    backgroundColor: 'rgba(59, 56, 56, 0.57)',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",    
  },
  avatar: {
    width: 144,
    height: 144
  },
  buttonContainer: {
    width: '100%',
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40
  },
  selectAvatarButton: {
    backgroundColor: '#A80C89',
    width: '60%',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    color: "white"
  },
  selectAvatarButtonText:{
    color: "white",
    fontFamily: "outfit-semibold",
    fontSize: 16
  }
})