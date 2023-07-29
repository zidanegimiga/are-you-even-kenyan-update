import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Platform, Dimension, Animated, SafeAreaView, FlatList, Image, Dimensions } from 'react-native'
import Icon from '../../components/Icon'
import React, { useState, useContext, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import Swiper from 'react-native-swiper'
import { GameContext } from '../../global/OurRoadsContext'
import data from '../../global/Questions/data'
import Question from '../../components/Question'
import Nairobi from '../../assets/icons/nairobi.svg'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useFonts } from 'expo-font'
import { Switch } from 'react-native'

const { width, height } = Dimensions.get('screen');

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Nairobi />
    </View>
  )
}

const OurRoads = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0)
  const [submitButton, showSubmitButton] = useState(false)

  const { score, setScore, totalScore, calculateScore } = useContext(GameContext);
  const navigation = useNavigation();
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  const handleScroll = (event) => {
    const contentWidth = event.nativeEvent.contentSize.width - windowWidth;
    const scrollOffset = event.nativeEvent.contentOffset.x;
    const progress = scrollOffset / contentWidth;

    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / event.nativeEvent.layoutMeasurement.width);
    setCurrentIndex(index);
    setScrollProgress(progress);
  };

  const handleMomentumScrollEnd = () => {
    flatListRef.current.scrollToIndex({ index: currentIndex, animated: true });
  };

  const triggerGameEnd = () => {
    calculateScore();
    navigation.navigate('/games/ourRoads/congratulations')
  }

  const bottomSheetModalRef = useRef(null)
  const snapPoints = ['70%', '90%']

  function showModal() {
    bottomSheetModalRef.current?.present()
  }

  const windowWidth = Dimensions.get('window').width;

  const [loaded] = useFonts({
    'outfit-medium': require('../../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('../../assets/fonts/Outfit-Bold.ttf'),
    'outfit-regular': require('../../assets/fonts/Outfit-Regular.ttf'),
  })

  if (!loaded) {
    return null;
  }

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.fill}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeIcon} onPress={() => { navigation.navigate("Home") }}>
            <Icon name="close" />
          </TouchableOpacity>
          <View style={styles.closeIcon}>
            <Icon name="settings" />
          </View>
        </View>
        <View style={styles.progressContainerWrapper}>
          <View style={styles.progressContainer}>
            <View style={[styles.progress, { width: `${scrollProgress * 100}%` }]}></View>
          </View>
        </View>
        <View style={styles.flatlistContainer}>
          <FlatList
            ref={flatListRef}
            snapToAlignment="center"
            horizontal
            pagingEnabled
            onEndReached={() => showSubmitButton(true)}
            showsHorizontalScrollIndicator={false}
            data={data[0].qnA}
            renderItem={({ item, index }) => <Question questions={item} showSubmit={submitButton} onPressB={() => showModal()}  index={index} />}
            onScroll={handleScroll}
            keyExtractor={(item, index) => index.toString()}
            initialScrollIndex={0}
            onMomentumScrollEnd={handleMomentumScrollEnd}
          />
        </View>
        <Footer />
      </SafeAreaView>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{
          borderRadius: 24,
          backgroundColor: "#5A3C96"
        }}
      >
        <ImageBackground source={require('../../assets/icons/modalBG.png')} resizeMode='cover' style={styles.modalBG}>
          <View style={styles.modalContentContainer}>
            <Text style={styles.didYouKnowTitle}>Did you know?</Text>
            <Text style={styles.didYouKnowText}>
              {data[0].qnA[currentIndex].t}
            </Text>
          </View>
        </ImageBackground>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  )
}

export default OurRoads

const styles = StyleSheet.create({
  modalBG: {
    flex: 1,
  },
  fill: {
    flex: 1,
    position: 'relative',
    padding: 16
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16
  },
  closeIcon: {
    width: 32,
    height: 32
  },
  progressContainerWrapper: {
    width: '100%',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  progressContainer: {
    width: "90%",
    height: 8,
    backgroundColor: "#DCDCDC",
    borderRadius: 8
  },
  progress: {
    backgroundColor: "#A80C89",
    width: "50%",
    height: "100%",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  flatlistContainer: {
    height: 'auto',
    elevation: 4
  },

  footer: {
    position: "absolute",
    bottom: 0
  },

  modalContentContainer: {
    flex: 1,
    padding: 24
  },

  didYouKnowTitle: {
    color: "white",
    fontSize: 24,
    fontFamily: "outfit-bold"
  },
  didYouKnowText: {
    color: "white",
    fontSize: 16,
    fontFamily: 'outfit-regular',
    marginTop: 16
  }
})