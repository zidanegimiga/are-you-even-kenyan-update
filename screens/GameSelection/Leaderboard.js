import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font';
import Icon from '../../components/Icon';

const Participant = () => {
  return (
    <View style={styles.participantListContainer}>
      <Text style={styles.participantPosition}>1</Text>
      <View style={styles.participantData}>
        {/* <Image source={require('../../assets/avatars/man.png')} style={styles.participantImage}/> */}
        <View style={styles.participantDataText}>
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
    'outfit-semibold': require('../../assets/fonts/Outfit-SemiBold.ttf'),
  })
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Leaderboard</Text>
        <View style={styles.settingsIcon}>
          <Icon name="settings" color={"white"} />
        </View>
      </View>
      <View>
        <View style={styles.top3}> 
          <View style={styles.leaderContainer}>
            <View style={styles.leader}>
              {/* <Image source={require('../../assets/avatars/man.png')} style={styles.top3Image}/> */}
              <Text style={styles.leaderPosition}>1</Text>
            </View>
            <Text style={styles.leaderName}>Koffie</Text>   
          </View>
          <View style={styles.leaderContainer}>
            <View style={styles.leader}>
              {/* <Image source={require('../../assets/avatars/man.png')} style={styles.top3Image}/> */}
              <Text style={styles.leaderPosition}>2</Text>
            </View>
            <Text style={styles.leaderName}>Koffie</Text>  
          </View>
          <View style={styles.leaderContainer}>
            <View style={styles.leader}>
              {/* <Image source={require('../../assets/avatars/man.png')} style={styles.top3Image}/> */}
              <Text style={styles.leaderPosition}>3</Text>
            </View>
            <Text style={styles.leaderName}>Koffie</Text>   
          </View>
        </View>
        <ScrollView style={styles.leaderBoardContainer}>
          <Participant />
          <Participant />
          <Participant />
          <Participant />
          <Participant />
          <Participant />
          <Participant />
          <Participant />
          <Participant />
          <Participant />
          <Participant />
          <Participant />
          <Participant />
          <Participant />
          <Participant />
          <Participant />
          <Participant />
          <Participant />
          <Participant />
          <Participant />
          <Participant />
          <Participant />
          <Participant />
          <Participant />
          <Participant />
          <Participant />
          <Participant />
          <Participant />
          <Participant />
          <Participant />
          <Participant />
          <Participant />
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
    flex: 1,
    padding: 16
  },
  image: {
    borderRadius: 50
  },
  header: {
    width: "100%",
    flexDirection: "row",
    marginTop: 40,
    alignItems: 'center',
    paddingLeft: 54
  },
  headerTitle:{
    fontFamily: 'mutiara-display',
    color: "white",
    fontSize: 24,
  },
  settingsIcon: {
    marginLeft: 40
  },
  top3: {
    flexDirection: "row",
    justifyContent: 'space-around',
    marginTop: 40,
    marginBottom: 40,
  },
  top3Image: {
    width: 64,
    height: 64,
    borderColor: "#A80C89",
    borderWidth: 2,
    borderRadius: 32
  },
  leaderContainer:{
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 4
  },
  leader:{
    position: "relative"
  },
  leaderName: {
    fontFamily: "outfit-semibold",
    color: "white",
    fontSize: 16
  },
  leaderPosition:{
    position: "absolute",
    fontFamily: 'mutiara-display',
    color: "white",
    bottom: -5,
    right: 0,
    fontSize: 32
  },
  leaderBoardContainer:{

  },
  participantListContainer:{
    flexDirection: "row",
    backgroundColor: "#A686E4",
    justifyContent: "flex-start",
    marginBottom: 3,
    paddingVertical: 16,    
    paddingLeft: 16,
    alignItems: "center",
    gap: 48,
    borderRadius: 8    
  },
  participantPosition: {
    fontFamily: "mutiara-display",
    color: "white",
    fontSize: 24 
  },
  participantData:{
    flexDirection: "row",
    gap: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  participantImage:{
    width: 48,
    height: 48,
    borderColor: "#A80C89",
    borderWidth: 2,
    borderRadius: 24,
  },
  name: {
    fontFamily: "outfit-semibold",
    color: "#FFFFFF",
    fontSize: 18
  },
  score:{
    fontFamily: "outfit-semibold",
    color: "#F8FF81",
    fontSize: 16
  }
})