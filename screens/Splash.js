import * as React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [nickname, setNickname] = React.useState(null)

    const getData = async () => {
        try {
            const nick = await AsyncStorage.getItem('@name')
            if (nickname !== null) {
                setNickname('Hi ' + nick);
            } else {
                setNickname('')
            }
        } catch (e) {
            // error reading value
        }
    }

    React.useEffect(()=>{
        getData();
    }, [])

    const updatePlaybackCallback = (status) => {
        if (status.didJustFinish) {
            if(nickname !== null){
                navigation.navigate('Home');
            } else{
                navigation.navigate('Initial');
            }
        }
    }

    return (
        <View style={styles.container}>
            <Video
                
                ref={video}
                style={styles.video}
                source={
                    // uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                     require('../assets/videos/splash.mp4')
                }
                useNativeControls={false}
                resizeMode={ResizeMode.STRETCH}
                // isLooping
                onPlaybackStatusUpdate={updatePlaybackCallback}
                onLoad={()=> video.current.playAsync()}
            />
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    video: {
        width: "100%",
        // height: "40%",
        flex: 1,
    }
})