import { useState, useContext, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, Image, Switch, Dimensions } from 'react-native';
import Icon from '../components/Icon';
import Sound from '../assets/icons/sound.svg'
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameContext } from '../global/OurRoadsContext';

const deviceWidth = Dimensions.get('window').width

export default function Settings({ navigation }) {
  const {soundEnabled, setSoundEnabled} = useContext(GameContext);
  const [loaded] = useFonts({
    'outfit-medium': require('../assets/fonts/Outfit-Medium.ttf'),
  })
  const [ nickname, setNickname ] = useState(null)
  const [sound, setSound] = useState()

  const getData = async () => {
    try {
      const nick = await AsyncStorage.getItem('@name')
      if(nick !== null | undefined) {
        setNickname('Hi '+ nick);
      } else {
        setNickname('Settings')
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
    
  }, [])

  useEffect(() => {
    getData()
  }, [nickname])

  if (!loaded) {
    return null;
  }

  const toggleSwitch = () => setSoundEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{nickname}</Text>
        <View style={styles.closeIcon}>
          <Icon name="close" color={"white"} />
        </View>
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
        <Text style={styles.resetButtonText}>Reset Everything</Text>
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
    width: deviceWidth - 40,
    height: 64,
    position: "absolute",
    bottom: "5%",
    // left: "50%",
    // transform: "translate(50%)",
    transform: [{ translateX: 20 }],
    borderRadius: 8    
  },
  resetButtonText: {
    color: "white",
    // fontFamily: "Inter",
    fontSize: 20,
    fontWeight: "500"
  }
});
