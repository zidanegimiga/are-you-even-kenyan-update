import React, { useState, useRef } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import Nickname from '../components/Nickname';
import Avatar from '../components/Avatar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OnboardingScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [loaded] = useFonts({
    'outfit-regular': require('../assets/fonts/Outfit-Regular.ttf'),
    'outfit-semibold': require('../assets/fonts/Outfit-SemiBold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  const storeName = async (name) => {
    try {
      await AsyncStorage.setItem('@name', name)
      console.log("Stored: ", name)
    } catch (e) {
      console.error(e)
    }
  }

  const progressStepsStyle = {
    activeStepIconBorderColor: '#A80C89',
    progressBarColor: '#A80C89',
    completedCheckColor: 'white',
    topOffset: 8,
    marginBottom: 0,
    completedProgressBarColor: '#A80C89',
    completedStepIconColor: '#A80C89',
    disabledStepIconColor: 'rgba(59, 56, 56, 0.57)'
  };

  const nextButtonStyle = {
    backgroundColor: '#A80C89',
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
  }

  const submitButtonStyle = {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderColor: "#000000",
    borderStyle: "solid",
    borderWidth: 1

  }
  const previousButtonStyle = {
    backgroundColor: '#A80C89',
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
  }

  const nextButtonTextStyle = {
    color: "white",
    fontFamily: 'outfit-semibold',
    textAlign: "center"
  }

  const submitButtonTextStyle = {
    color: "black",
    fontFamily: 'outfit-semibold',
    textAlign: "center"
  }

  const defaultScrollViewProps = {
    keyboardShouldPersistTaps: 'handled',
    contentContainerStyle: {
      flex: 1,
      justifyContent: 'center'
    }
  };

  const onNextStep = () => {
  };

  const onPaymentStepComplete = () => {
    alert('Payment step completed!');
  };

  const onPrevStep = () => {
  };

  const onSubmitSteps = () => {
    navigation.navigate('Home')
  };

  return (
      <SafeAreaView style={styles.container}>
        <ProgressSteps {...progressStepsStyle}>
          <ProgressStep
            nextBtnText="Next >>>"
            nextBtnStyle={nextButtonStyle}
            nextBtnTextStyle={nextButtonTextStyle}
            // nextBtnDisabled={name.length <= 0}
            onNext={() => storeName(name)}
          >
            <Nickname setNickname={setName} name={name} />
          </ProgressStep>
          <ProgressStep
            onNext={onNextStep}
            onPrevious={onPrevStep}
            onSubmit={onSubmitSteps}
            finishBtnText="Skip"
            nextBtnStyle={submitButtonStyle}
            nextBtnTextStyle={submitButtonTextStyle}
            previousBtnText="Back"
            previousBtnStyle={submitButtonStyle}
            previousBtnTextStyle={submitButtonTextStyle}
          >
            <Avatar/>
          </ProgressStep>
        </ProgressSteps>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FF81",
  },
})

export default OnboardingScreen;