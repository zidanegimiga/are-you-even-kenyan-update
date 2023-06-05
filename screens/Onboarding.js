import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import Nickname from '../components/Nickname';
import Avatar from '../components/Avatar';

const Onboarding = () => {
  const [nickname, setNickname] = useState('');

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
    // position: "absolute",
    // right: '50%'
  }
  const previousButtonStyle = {
    backgroundColor: '#A80C89',
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    // position: "absolute",
    // right: '50%'
  }

  const nextButtonTextStyle = {
    color: "white", 
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
    console.log('called next step');
  };

  const onPaymentStepComplete = () => {
    alert('Payment step completed!');
  };

  const onPrevStep = () => {
    console.log('called previous step');
  };

  const onSubmitSteps = () => {
    console.log('called on submit step.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProgressSteps {...progressStepsStyle}>
        <ProgressStep
          // onNext={onPaymentStepComplete}
          // onPrevious={onPrevStep}
          nextBtnText="Next >>>"
          nextBtnStyle={nextButtonStyle}
          nextBtnTextStyle={nextButtonTextStyle}
          nextBtnDisabled={nickname.length <= 0}
        >
          <Nickname setNickname={setNickname} nickname={nickname}/>
        </ProgressStep>
        <ProgressStep
          onNext={onNextStep}
          onPrevious={onPrevStep}
          nextBtnText="Submit >>>"
          nextBtnStyle={nextButtonStyle}
          nextBtnTextStyle={nextButtonTextStyle}
          previousBtnText="<<< Back"
          previousBtnStyle={previousButtonStyle}
          previousBtnTextStyle={nextButtonTextStyle}
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

export default Onboarding;