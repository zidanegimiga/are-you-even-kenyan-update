import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font';
import Icon from '../../components/Icon';

const Participant = () => {
  return (
    <View style={styles.participantListContainer}>
      <Text>1</Text>
      <View style={styles.participantData}>
        <Image />
        <View>
          <Text style={styles.name}>Koffie</Text>
          <Text style={styles.score}>97%</Text>
        </View>
      </View>
    </View>
  )
}

const Leaderboard = () => {
  const [loaded] = useFonts({
    'mutiara-display': require('../../assets/fonts/Mutiara_Display_02.ttf'),
    'outfit-regular': require('../../assets/fonts/Outfit-Regular.ttf'),
  })
  return (
    <View>
      <View style={styles.header}>
        <View style={styles.backButton}>
          <Text>&lt;</Text>
        </View>
        <Text>Leaderboard</Text>
        <View>
          <Icon name="settings" />
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.top3}>
          <View style={styles.leader}>
            <Image />
            <Text>1</Text>
          </View>
          <View style={styles.leader}>
            <Image />
            <Text>2</Text>
          </View>
          <View style={styles.leader}>
            <Image />
            <Text>3</Text>
          </View>
        </View>
        <ScrollView style={styles.leaderBoardContainer}>
          <Participant />
          <Participant />
          <Participant />
          <Participant />
        </ScrollView>
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