import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Platform } from 'react-native'
import Icon from '../../components/Icon'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

const Question = () => {
  return (
    <View style={[styles.card]}>
      {/* <ImageBackground style={[styles.innerCard]} resizeMode="cover" source={require('../../assets/icons/ourRoadsBG.png')}> */}
        <Text ></Text>
      {/* </ImageBackground> */}
    </View>
  )
}

const Footer = () => {
  return (
    <View></View>
  )
}

const OurRoads = () => {
  const [progress, setProgress] = useState('0%')
  const [currentIndex, setCurrentIndex] = useState(0)
  const navigation = useNavigation()
  return (
    <View style={styles.pageContainer}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeIcon} onPress={() => { navigation.goBack() }}>
          <Icon name="close" />
        </TouchableOpacity>
        <View style={styles.closeIcon}>
          <Icon name="settings" />
        </View>
      </View>
      <View style={styles.progressContainer}>
        <View style={[styles.progress, { width: '50%' }]}></View>
      </View>
      <Question />
    </View>
  )
}

export default OurRoads

const styles = StyleSheet.create({
  pageContainer: {
    paddingTop: 56,
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: "#fff"
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
    borderRadius: 8,
    elevation: Platform.OS === 'android' ? 4 : undefined,
    shadowColor: 'rgba(0, 0, 0, 0.17)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    backgroundColor: '#fff'
  },
  innerCard: {
    width: "100%",
    height: "100%",
  }
})