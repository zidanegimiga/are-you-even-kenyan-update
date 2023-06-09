import React from 'react'
import {
    Image,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Animated,
    Easing,
    TouchableHighlight
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('screen');

const SelectGameCard = ({ game }) => {
    const translateYImage = new Animated.Value(40);
    const navigator = useNavigation();

    Animated.timing(translateYImage, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.bounce,
    }).start();

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require('../assets/images/ourRoads.png')}
                resizeMode="contain"
                style={[
                    styles.image,
                    {
                        transform: [
                            {
                                translateY: translateYImage,
                            },
                        ],
                    },
                ]}
            />
            <Text style={styles.header}>{game.name}</Text>
            <View style={styles.btnContainer}>
                <TouchableHighlight
                    underlayColor={"#FCFFCC"}
                    style={[styles.button,
                    {
                        backgroundColor: "#FFFFFF", borderColor: "#000000",
                        ...Platform.select({
                            ios: {
                                shadowColor: "#000000"
                            }
                        })
                    }]}
                    onPress={() => navigator.navigate(game?.screen)}                >
                    <Text style={[styles.buttonText, { color: "#000000" }]}>Play</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        width,
        height,
        alignItems: 'center'
    },
    image: {
        flex: 0.6,
        width: '60%'
    },
    header: {
        color: "#222",
        fontSize: 24,
        fontWeight: '400',
        textAlign: 'center',
        paddingLeft: 20,
        paddingTop: 10
    },
    btnContainer: {
        width,
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        borderStyle: 'solid',
        borderWidth: 2,
        paddingBottom: 12,
        paddingTop: 12,
        paddingHorizontal: 30,
        borderRadius: 16,
        width: 140,
        marginTop: 24,
        ...Platform.select({
            ios: {
                shadowOffset: {
                    width: 4,
                    height: 4,
                },
                shadowOpacity: 1,
                shadowRadius: 0,
            },
            android: {
                elevation: 30,
            },
        })
    },
    buttonText: {
        textAlign: 'center'
    },
})

export default SelectGameCard