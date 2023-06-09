import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';

const aboutUs = "Throughout your academic journey, you relied heavily on last-minute cramming to navigate your way through school. You even managed to secure a spot at the university, thanks to those eleventh-hour preparations. Complaining seems to be your forte, whether it's about traffic, the education system, alcoblow, or Kenyan music. Deep down, you harbor a secret hope for a lucrative tender that will catapult your life towards greatness. Instead of taking to the streets to protest, you prefer to watch the news and vent your frustrations on Twitter, citing “Hii jua ni ya Mvua” will ruin your fancy Turkey suit. The current state of the economy dominates your conversations, but here's the question: Are you even Kenyan? Like seriously, are you? 'Are You Even Kenyan???' is a mobile game designed to help you discover just how authentically Kenyan you truly are. Are you ready to embrace thecchallenge and put your Kenyan-ness to the test?"

const Information = () => {
  const [loaded] = useFonts({
    'outfit-medium': require('../../assets/fonts/Outfit-Medium.ttf'),
    'outfit-regular': require('../../assets/fonts/Outfit-Regular.ttf'),
  })

  if (!loaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/images/infoBG.png')} resizeMode="cover" style={styles.image}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Info</Text>
        </View>
        <View style={styles.aboutUs}>
          <Text style={styles.text}>{aboutUs}</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Visit our Website
          </Text>
        </TouchableOpacity>
      </ImageBackground>      
    </View>
  )
}

export default Information

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // flexDirection: "column",
    // alignItems: "center"
  },
  image: {
    flex: 1,
    paddingTop: 56,
    alignItems: "center"
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 56
  },
  headerTitle: {
    fontFamily: "outfit-medium",
    fontSize: 24
  },
  aboutUs: {
    padding: 16
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: "outfit-regular"
  },
  button: {
    backgroundColor: "#A80C89",
    width: "65%",
    borderRadius: 8,
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16 
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: "outfit-regular",
    color: "white",   
  }
})