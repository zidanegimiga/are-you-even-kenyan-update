import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, Image } from 'react-native';
import Icon from '../components/Icon';
import { useFonts } from 'expo-font';

export default function Settings({navigation}) {
  const [loaded] = useFonts({
    'mutiara-display-shadow': require('../assets/fonts/Mutiara_Display_02_Shadow.ttf'),
    'outfit-medium': require('../assets/fonts/Outfit-Medium.ttf'),
  })

  if (!loaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.closeIcon}>
          <Icon name="close" color={"white"} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    paddingLeft: 118,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#B7B7B7",
  },
  headerTitle:{
    fontFamily: 'outfit-medium',
    color: "#2F203B",
    fontSize: 24,
  },
  closeIcon: {
    width: 24,
    height: 24,
    marginLeft: 120
  }
});
