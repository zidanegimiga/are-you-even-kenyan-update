import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, Image, Switch } from 'react-native';
import Icon from '../components/Icon';
import Sound from '../assets/icons/sound.svg'
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Settings({ navigation }) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [loaded] = useFonts({
    'outfit-medium': require('../assets/fonts/Outfit-Medium.ttf'),
  })
  const [ nickname, setNickname ] = useState('Settings')

  const getData = async () => {
    try {
      const nick = await AsyncStorage.getItem('@name')
      if(nickname !== null) {
        setNickname('Hi '+ nick)
      }
    } catch(e) {
      // error reading value
      setNickname('Settings')
    }
  }

  const clearAllData = async () =>{
    try{
      await AsyncStorage.clear()
      navigation.goBack()      
    } catch(e){
    }
  }

  useEffect(() => {
    getData()
  }, [])

  if (!loaded) {
    return null;
  }

  const toggleSwitch = () => setSoundEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{nickname}</Text>
        <TouchableOpacity style={styles.closeIcon} onPress={() => navigation.goBack()}>
          <Icon name="close" color={"white"} />
        </TouchableOpacity>
      </View>
      <View style={styles.setting}>
        <View style={styles.sound}>
          <Sound />
          <Text style={styles.settingText}>Sounds</Text>
        </View>
        <Switch
          trackColor={{ false: '#A80C8940', true: '#A80C89' }}
          thumbColor={soundEnabled ? '#A80C89' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={soundEnabled}
        />
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={() => clearAllData()}>
        <Text>Reset Everything</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  setting: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,

  },
  sound: {
    flexDirection: "row",
    gap: 8
  },
    container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  header: {
    width: "100%",
    flexDirection: "row",
    marginTop: 40,
    alignItems: 'center',
    paddingLeft: 108,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#B7B7B7",
  },
  headerTitle: {
    fontFamily: 'outfit-medium',
    color: "#2F203B",
    fontSize: 24,
  },
  closeIcon: {
    width: 24,
    height: 24,
    marginLeft: 120
  },
  settingText: {
    fontFamily: 'outfit-medium',
    fontSize: 20
  },
  resetButton: {
    backgroundColor: 'red',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 240,
    height: 64,
    position: "absolute",
    
  }
});
