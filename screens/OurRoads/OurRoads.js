import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Platform, Dimension, Animated, SafeAreaView, FlatList, Image, Dimensions } from 'react-native'
import Icon from '../../components/Icon'
import React, { useState, useContext, useRef, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import Swiper from 'react-native-swiper'
import { GameContext } from '../../global/OurRoadsContext'
import data from '../../global/Questions/data'
import Question from '../../components/Question'
import Nairobi from '../../assets/icons/nairobi.svg'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useFonts } from 'expo-font'
import { Switch } from 'react-native'
import ProgressBar from '../../components/ProgressBar'
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { QUESTION_PROGRESS_STORAGE_KEY, SCORE_OF_WRONG_ANSWERS_KEY } from '../../global/constants/AsyncStorageKeys'
import { fetchNumberOfCorrectAnswers, storeCurrentQuestionIndex, storeCurrentScoreOfWrongAnswers, storeNumberOfCorrectAnswers } from "../../global/utils/AsyncStorageUtils"

const { width, height } = Dimensions.get('screen');

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Nairobi />
    </View>
  )
}

const OurRoads = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [randomIndex, setRandomIndex] = useState(0);
  const [submitButton, showSubmitButton] = useState(false)
  const [sound, setSound] = useState();
  const { setSoundEnabled, soundEnabled, setScore } = useContext(GameContext);
  const navigation = useNavigation();


  const playCorrectOrIncorretSound = async (isCorrect) => {
    if (soundEnabled) {
      try {
        let audio;
        if (isCorrect) {
          audio = await Audio.Sound.createAsync(require('../../assets/game-audio/Our_Roads_Correct_Answer.mp3'));
        } else {
          audio = await Audio.Sound.createAsync(require('../../assets/game-audio/Our_Roads_Wrong_Answer.mp3'));
        }

        if (audio && audio.sound) {
          setSound(audio.sound);
          await audio.sound.playAsync();
        } else {
          console.warn('Sound is not loaded properly.');
        }
      } catch (error) {
        console.error('Error while loading or playing the sound:', error);
      }
    }
  }

  const bottomSheetModalRef = useRef(null)
  const snapPoints = ['70%', '90%']

  function showModal() {
    bottomSheetModalRef.current?.present()
  }

  function handleBottomSheetDismissal() {
    moveToNextQuestion();
  }

  const windowWidth = Dimensions.get('window').width;

  const [loaded] = useFonts({
    'outfit-medium': require('../../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('../../assets/fonts/Outfit-Bold.ttf'),
    'outfit-regular': require('../../assets/fonts/Outfit-Regular.ttf'),
  })

  const handleAnswerSelect = async (selectedOption) => {
    showRandomImage()
    const isCorrect = selectedOption === data[0].qnA[currentQuestionIndex].answer;

    playCorrectOrIncorretSound(isCorrect)

    if (isCorrect) {
      const oldNumberOfCorrectAnswers = await fetchNumberOfCorrectAnswers()
      await storeNumberOfCorrectAnswers(oldNumberOfCorrectAnswers + 1)
      moveToNextQuestion();
    } else {
      showModal();
    }
  };

  const moveToNextQuestion = async () => {
    if (currentQuestionIndex < data[0].qnA.length - 1) {
      const newCurrentQuestionIndex = currentQuestionIndex + 1
      setCurrentQuestionIndex(newCurrentQuestionIndex);
      storeCurrentQuestionIndex(newCurrentQuestionIndex)
    } else {
      // All questions answered, calculate score and navigate to Congratulations screen
      const score = await generateScore()
      setScore(score)

      storeCurrentQuestionIndex(0)
      storeNumberOfCorrectAnswers(0)
      navigation.navigate('Our Roads - Congratulations');
    }
  };

  const generateScore = async (updatedUserAnswers) => {
    const correctAnswers = await fetchNumberOfCorrectAnswers()

    // total stands for the right answers percentage
    const total = (correctAnswers / data[0].qnA.length) * 100;
    return Math.round(100 - total);
  };

  const progress = (currentQuestionIndex / data[0].qnA.length) * 100;

  const currentQuestion = data[0].qnA[currentQuestionIndex];

  const handleGameExit = () => {
    setUserAnswers(Array(data[0].qnA.length).fill(null));
    navigation.navigate("Home");
  }

  function showRandomImage(){
    const randomNumber = Math.floor(Math.random() * 2)
    setRandomIndex(randomNumber);
  }

  useEffect(() => {
    return sound ? () => {
      sound.unloadAsync();
    } : undefined;
  }, [sound]);

  useEffect(() => {
    const fetchQuestionProgress = async () => {
      const result = await AsyncStorage.getItem(QUESTION_PROGRESS_STORAGE_KEY)
      const resultNumber = Number(result)
      if (!isNaN(resultNumber)) {
        setCurrentQuestionIndex(resultNumber)
      }
    }
    fetchQuestionProgress().catch((e) => console.log(e))
  })

  if (!loaded) {
    return null;
  }

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.fill}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeIcon} onPress={handleGameExit}>
            <Icon name="close" />
          </TouchableOpacity>
          <View style={styles.closeIcon}>
            <Icon name="settings" />
          </View>
        </View>
        <View style={styles.progressContainerWrapper}>
          <ProgressBar progress={progress} />
        </View>
        <View style={styles.flatlistContainer}>
          <Question questions={currentQuestion} showSubmit={submitButton} onPress={handleAnswerSelect} />
        </View>
        <Footer />
      </SafeAreaView>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{
          borderRadius: 24,
          // backgroundColor: "white"
          backgroundColor: "#5A3C96"
        }}
        onDismiss={handleBottomSheetDismissal}
        enablePanDownToClose={true}
        handleIndicatorStyle={{
          backgroundColor: "black",
        }}
      >
          <TouchableOpacity onPress={() => { bottomSheetModalRef.current?.dismiss() }} style={styles.modalContentContainer}>
            <View>
              <Text style={styles.didYouKnowTitle}>Did you know?</Text>
              <Text style={styles.didYouKnowText}>
                {currentQuestion.tip}
              </Text>
            </View>
          {
            randomIndex === 0 ? (
              <Image source={require('../../assets/images/serious.png')} style={styles.modalImage} />
            ) : (
                <Image source={require('../../assets/images/sideEye.png')} style={styles.modalImage} />
            )
          }
          </TouchableOpacity>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  )
}

export default OurRoads;

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
    padding: 24,
    position: "relative"
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
  },
  modalImage: {
    position: "absolute",
    bottom: "22%",
    right: 0,
    width: "70%",
    height: "45%"
  }
})