import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import React from 'react';

const image = {uri: 'https://reactjs.org/logo-og.png'};
const aboutUs = "Throughout your academic journey, you relied heavily on last-minute cramming to navigate your way through school. You even managed to secure a spot at the university, thanks to those eleventh-hour preparations. Complaining seems to be your forte, whether it&#39;s about traffic, the education system, alcoblow, or Kenyan music. Deep down, you harbor a secret hope for a lucrative tender that will catapult your life towards greatness. Instead of taking to the streets to protest, you prefer to watch the news and vent your frustrations on Twitter, citing “Hii jua ni ya Mvua” will ruin your fancy Turkey suit. The current state of the economy dominates your conversations, but here&#39;s the question: Are you even Kenyan? Like seriously, are you? &quot;Are You Even Kenyan???&quot; is a mobile game designed to help you discover just how authentically Kenyan you truly are. Are you ready to embrace thecchallenge and put your Kenyan-ness to the test?"

const Information = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View>
          <Text>Info</Text>
        </View>
        <View>
          <Text>{aboutUs}</Text>
        </View>
        <View style={styles.button}>
          <Text>
            Visit our Website
          </Text>
        </View>
      </ImageBackground>      
    </View>
  )
}

export default Information

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
    alignItems: "center"
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  button: {
    backgroundColor: "#A80C89",
    width: "65%",
    borderRadius: 8,
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
})