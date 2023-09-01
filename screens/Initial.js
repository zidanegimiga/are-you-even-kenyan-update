import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, Image } from 'react-native';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';

export default function Initial({navigation}) {
  const [loaded] = useFonts({
    'mutiara-display-shadow': require('../assets/fonts/Mutiara_Display_02_Shadow.ttf'),
    'outfit-regular': require('../assets/fonts/Outfit-Regular.ttf'),
  })

  const [status, setStatus] = React.useState({});
  const [nickname, setNickname] = React.useState(null)

  const [ nextRoute, setNextRoute] = useState('')

  const getData = async () => {
    try {
      const nickname = await AsyncStorage.getItem('@name')
      if(nickname !== null) {
        setNextRoute('Home')
      } else {
        setNextRoute('Onboarding')
      }
    } catch(e) {
      // error reading value
    }
  }

  useEffect(() => {
    getData()
  }, [])
  if (!loaded) {
    return null;
  }

  const handleNavigation = () =>{
    navigation.navigate(nextRoute)
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View>
        <Text style={{ fontFamily: 'mutiara-display-shadow', fontSize: 56, marginBottom: -8 }}>
          ARE
        </Text>
        <Text style={{ fontFamily: 'mutiara-display-shadow', fontSize: 56, marginBottom: -8 }}>
          YOU
        </Text>
        <Text style={{ fontFamily: 'mutiara-display-shadow', fontSize: 56, marginBottom: -8 }}>
          EVEN
        </Text>
        <Text style={{ fontFamily: 'mutiara-display-shadow', fontSize: 56, marginBottom: -8 }}>
          KENYAN
        </Text>
        {/* <Text style={{ fontFamily: 'mutiara-display-shadow', fontSize: 56, marginBottom: -8 }}>
          ?????
        </Text> */}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleNavigation}>
          <Text style={styles.buttonText}>Let's See</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require('../assets/images/kiccHomepage.png')}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    paddingLeft: 16,
    backgroundColor: '#FDEEDA',
  },

  buttonContainer: {
    width: '100%',
    marginTop: 16,
    flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center"
  },

  button: {
    width: '80%',
    textAlign: 'center',
    borderColor: '#A80C89',
    borderWidth: 4,
    borderStyle: "solid",
    height: 48,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    zIndex: 3
  },

  buttonText: {
    color: "#2F203B",
    fontSize: 16,
    fontFamily: 'outfit-regular'
  },
  image:{
    position: 'absolute',
    bottom: -50,
  }
});
