import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import Icon from '../../components/Icon'
import React from 'react'

const Question = () => {
  return (
    <ImageBackground style={[styles.card]} resizeMode="cover" source={require('../../assets/icons/ourRoadsBG.png')}>
      <Text ></Text>
    </ImageBackground>
  )
}

const Footer = () =>{
  return(
    <View></View>
  )
}

const OurRoads = () => {
  return (
    <View style={styles.pageContainer}>
      <View style={styles.header}>
        <View style={styles.closeIcon}>
          <Icon name="close" />
        </View>
        <View style={styles.closeIcon}>
          <Icon name="settings" />
        </View>
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.progress}></View>
      </View>
      <Question/>
    </View>
  )
}

export default OurRoads

const styles = StyleSheet.create({
  pageContainer: {
    paddingTop: 56,
    paddingHorizontal: 16,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  closeIcon: {
    width: 32,
    height: 32
  },
  progressContainer: {
    width: "100%",
    height: 16,
    backgroundColor: "#DCDCDC",
    marginTop: 24,
    borderRadius: 8
  },
  progress: {
    backgroundColor: "#A80C89",
    width: "50%",
    height: "100%",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  card: {
    marginTop: 16,
    height: "80%",
    width: "100%",
  }
})