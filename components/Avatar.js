import { Image,StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font';

function Avatar(){
  const [loaded] = useFonts({
    'outfit-regular': require('../assets/fonts/Outfit-Regular.ttf'),
    'outfit-semibold': require('../assets/fonts/Outfit-SemiBold.ttf'),
});

if (!loaded) {
    return null;
}
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>Pick an Avatar</Text>
      <View style={styles.avatarContainer}>
        <View style={styles.imageContainer}>
          <Image 
            source={require('../assets/images/userAvatar.png')}
            style={styles.avatar}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.selectAvatarButton}>
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
    width: 100,
    height: 100
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