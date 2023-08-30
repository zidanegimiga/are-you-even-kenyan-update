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
  const [userAnswers, setUserAnswers] = useState(Array(data[0].qnA.length).fill(null));
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0)
  const [submitButton, showSubmitButton] = useState(false)
  const [sound, setSound] = useState();

  const { score, setScore, totalScore, calculateScore, setSoundEnabled, soundEnabled } = useContext(GameContext);
  const navigation = useNavigation();

  const playCorrectSound = async () => {
    const { sound } = await Audio.Sound.createAsync(require('../../assets/game-audio/Our_Roads_Correct_Answer.mp3'));
    setSound(sound);
    await sound.playAsync();
  }

  const playWrongSound = async () => {
    const { sound } = await Audio.Sound.createAsync(require('../../assets/game-audio/Our_Roads_Wrong_Answer.mp3'));
    setSound(sound);
    await sound.playAsync();
  }

  const bottomSheetModalRef = useRef(null)
  const snapPoints = ['70%', '90%']

  function showModal() {
    bottomSheetModalRef.current?.present()
  }

  function handleBottomSheetDismissal(){
    setCurrentQuestionIndex(currentQuestionIndex + 1)
    
  }

  const windowWidth = Dimensions.get('window').width;

  const [loaded] = useFonts({
    'outfit-medium': require('../../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('../../assets/fonts/Outfit-Bold.ttf'),
    'outfit-regular': require('../../assets/fonts/Outfit-Regular.ttf'),
  })

  const handleAnswerSelect = (selectedOption) => {
    const isCorrect = selectedOption === data[0].qnA[currentQuestionIndex].answer;
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = selectedOption;
    setUserAnswers(updatedAnswers);

    if (!isCorrect) {
      if(soundEnabled){playWrongSound()}
      
      if (currentQuestionIndex === data[0].qnA.length - 1) {
        const s = generateScore();
        setScore(s);
        navigation.navigate('Our Roads - Congratulations');
      } else {
        showModal();
      }
    } else {
      if (soundEnabled) { playCorrectSound(); }
      if (currentQuestionIndex === data[0].qnA.length - 1) {
        const s = generateScore();
        setScore(s);
        navigation.navigate('Our Roads - Congratulations');
      } else{
        moveToNextQuestion();
      }
    }
  };

  const moveToNextQuestion = () => {
    console.log("Current Index: ", currentQuestionIndex)
    if (currentQuestionIndex < data[0].qnA.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // All questions answered, calculate score and navigate to CongratulationsScreen
      const s = generateScore();
      // navigation.navigate('Our Roads - Congratulations', { s });
    }
  };

  const generateScore = () => {
    let s = 0;
    data[0].qnA.forEach((question, index) => {
      if (userAnswers[index] === question.answer) {
        s++;
      }
    });
    // total stands for the right answers percentage
    const total = ((s + 1) / data[0].qnA.length) * 100;
    return Math.round(100 - total);
  };

  const progress = (currentQuestionIndex / data[0].qnA.length) * 100;

  const currentQuestion = data[0].qnA[currentQuestionIndex];

  const handleGameExit = () =>{
    setUserAnswers(Array(data[0].qnA.length).fill(null));
    navigation.navigate("Home");
  }

  useEffect(() => {
    return sound ? () => {
      sound.unloadAsync();
    } : undefined;
  }, [sound]);

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
          <ProgressBar progress={progress}/>
        </View>
        <View style={styles.flatlistContainer}>
          <Question questions={currentQuestion} showSubmit={submitButton} onPressB={handleAnswerSelect} />
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
        onDismiss={handleBottomSheetDismissal}
        enablePanDownToClose={true}
        handleIndicatorStyle={{
          backgroundColor: "white",
        }}
      >
        <ImageBackground source={require('../../assets/icons/modalBG.png')} resizeMode='cover' style={styles.modalBG}>
          <TouchableOpacity onPress={() => bottomSheetModalRef.current?.dismiss()} style={styles.modalContentContainer}>
            <View>
              <Text style={styles.didYouKnowTitle}>Did you know?</Text>
              <Text style={styles.didYouKnowText}>
                {currentQuestion.tip}
              </Text>
            </View>
          </TouchableOpacity>
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