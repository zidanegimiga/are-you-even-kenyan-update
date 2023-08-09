import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Swiper from 'react-native-swiper'
import SelectGameCard from '../../components/selectGameCard'
import games from '../../global/games'
import { useHeaderHeight } from '@react-navigation/elements';
import Icon from '../../components/Icon'
import { useFonts } from 'expo-font';
import { Audio } from 'expo-av';

const SelectGame = () => {
  
  const headerHeight = useHeaderHeight();
  const [loaded] = useFonts({
    'outfit-regular': require('../../assets/fonts/Outfit-Regular.ttf'),
    'outfit-semibold': require('../../assets/fonts/Outfit-SemiBold.ttf'),
    'outfit-medium': require('../../assets/fonts/Outfit-Medium.ttf'),
});
  
if (!loaded) {
    return null;
}

  return (
    <View style={[styles.wrapper, { marginTop: headerHeight }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Select Game</Text>
        <TouchableOpacity style={styles.closeIcon}>
          <Icon name="settings" />
        </TouchableOpacity>
      </View>
      <Swiper
        containerStyle={{
          backgroundColor: "white"
        }}
        // autoplay={true} 
        showsButtons={true}
        // bounces={true}
        index={0}
        loop={false}
        // horizontal={false}
        // loadMinimal={true}
        nextButton={
          <View style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: "#745AA8",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: -150,
            right: 0
          }}>
            <Text
              style={{
                color: "white",
                fontSize: 16,
                textAlign: "center"
              }}
            >&gt;</Text>
          </View>
        }
        prevButton={
          <View style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: "#745AA8",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: -150
          }}>
            <Text
              style={{
                color: "white",
                fontSize: 16,
                textAlign: "center"
              }}
            >&lt;</Text>
          </View>
        }
        dot={
          <View
            style={{
              backgroundColor: '#ffffff',
              borderColor: '#2F203B',
              borderWidth: 3,
              width: 16,
              height: 16,
              borderRadius: 8,
              marginLeft: 3,
              marginRight: 3,
              marginTop: 3,
              marginBottom: 3
            }}
          />
        }
        activeDot={
          <View
            style={{
              backgroundColor: '#A80C89',
              width: 40,
              height: 16,
              borderRadius: 8,
              marginLeft: 3,
              marginRight: 3,
              marginTop: 3,
              marginBottom: 3
            }}
          />
        }
      >
        {
          games.map((game, index) => (
            <SelectGameCard game={game} key={index} />
          ))
        }
      </Swiper>
    </View>
  )
}

export default SelectGame

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "white"
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  header: {
    width: "100%",
    flexDirection: "row",
    marginTop: 44,
    alignItems: 'center',
    paddingLeft: 110,
    paddingBottom: 16,
  },
  headerTitle: {
    fontFamily: 'outfit-medium',
    color: "#2F203B",
    fontSize: 24,
    textAlign: "center"
  },
  closeIcon: {
    width: 24,
    height: 24,
    marginLeft: 80
  },
  settingText: {
    fontFamily: 'outfit-medium',
    fontSize: 20
  }
})