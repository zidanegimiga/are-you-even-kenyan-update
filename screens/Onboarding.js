import React, { useState, useRef } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import { useFonts } from 'expo-font';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import Nickname from '../components/Nickname';
import Avatar from '../components/Avatar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomSheetModal, BottomSheetModalProvider, useBottomSheet } from '@gorhom/bottom-sheet'
import AvatarSelection from '../components/AvatarSelection';
import {avatars} from '../global/avatarData';
import Icon from '../components/Icon';

const OnboardingScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [loaded] = useFonts({
    'outfit-regular': require('../assets/fonts/Outfit-Regular.ttf'),
    'outfit-semibold': require('../assets/fonts/Outfit-SemiBold.ttf'),
  });

  const onSelectAvatar = (avatar) => {
    setSelectedAvatar(avatar);
  };

  const avatarModalRef = useRef(null);
  
  const showAvatar = () =>{
    avatarModalRef.current?.present()
  }

  const hideAvatar = () =>{
    avatarModalRef.current?.close()
  }

  const storeName = async (name) => {
    try {
      await AsyncStorage.setItem('@name', name)
      console.log("Stored: ", name)
    } catch (e) {
      console.error(e)
    }
  }

  const storeAvatar = async () => {
    try {
      if (selectedAvatar) {
        await AsyncStorage.setItem('@avatar', JSON.stringify(selectedAvatar));
        avatarModalRef.current?.close()
        // TD: Save avatar to user profile
      }
    } catch (error) {
      console.error('Error saving avatar:', error);
    }
  };

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

  const onPrevStep = () => {
  };

  const onSubmitSteps = () => {
    navigation.navigate('Home');
  };

  const snapPoints = ['80%', '90%'];

  if (!loaded) {
    return null;
  }

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.container}>
        <ProgressSteps {...progressStepsStyle}>
          <ProgressStep
            nextBtnText="Next >>>"
            nextBtnStyle={nextButtonStyle}
            nextBtnTextStyle={nextButtonTextStyle}
            nextBtnDisabled={name.length <= 0}
            onNext={() => storeName(name)}
          >
            <Nickname setNickname={setName} name={name} />
          </ProgressStep>
          <ProgressStep
            onNext={onNextStep}
            onPrevious={onPrevStep}
            onSubmit={onSubmitSteps}
            finishBtnText="Next"
            nextBtnStyle={submitButtonStyle}
            nextBtnTextStyle={submitButtonTextStyle}
            previousBtnText="Back"
            previousBtnStyle={submitButtonStyle}
            previousBtnTextStyle={submitButtonTextStyle}
          >
            <Avatar showAvatar={showAvatar} selectedAvatar={selectedAvatar} />
          </ProgressStep>
        </ProgressSteps>
      </SafeAreaView>
      <BottomSheetModal
        ref={avatarModalRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{
          borderRadius: 24,
          backgroundColor: "#5A3C96",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%"
        }}
        handleIndicatorStyle={{
          backgroundColor: "white"
        }}
      >
        <View style={styles.modalHeader}>
          {/* <TouchableOpacity onPress={hideAvatar}  style={styles.closeIcon}>
            <Icon name="close" color={"white"} />
          </TouchableOpacity> */}
        </View>
        {selectedAvatar && (
          <View style={styles.preview}>
            <Image style={styles.previewImage} source={selectedAvatar} />
            <Text style={styles.previewName}>{selectedAvatar.name}</Text>
          </View>
        )}
        <AvatarSelection onSelectAvatar={onSelectAvatar} />
        {/* <AvatarSelection avatars={avatars} onSelectAvatar={onSelectAvatar} /> */}
        <View style={{width: "100%", justifyContent: "center", display: "flex", alignItems: "center"}}>
          <TouchableOpacity onPress={storeAvatar} disabled={!selectedAvatar} style={styles.saveAvatarBtn}>
            <Text style={{ color: "white" }}>Save & Close</Text>
          </TouchableOpacity>
        </View>       
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDEEDA",
  },
  modalHeader: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  closeIcon: {
    width: 24,
    height: 24,
    backgroundColor: "white",
    borderRadius: "50%",
    marginRight: 8
  },
  preview: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: "white",
    borderWidth: 2
  },
  previewName: {
    marginTop: 10,
    fontSize: 16,
  },
  saveAvatarBtn:{
    width: "70%",
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 8
    
  }
})

export default OnboardingScreen;