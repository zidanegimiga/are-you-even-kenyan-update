import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font';

const Leaderboard = () => {
  const [loaded] = useFonts({
    'mutiara-display': require('../../assets/fonts/Mutiara_Display_02.ttf'),
    'outfit-regular': require('../../assets/fonts/Outfit-Regular.ttf'),
  })
  return (
    <View style={styles.container}>
      <View style={styles.top3}>
        <View style={styles.leader}>
          <Image/>
        </View>
      </View>
    </View>
  )
}

export default Leaderboard

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#8967CE",
    flex: 1
  }
})