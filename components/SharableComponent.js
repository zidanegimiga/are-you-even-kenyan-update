import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useRef } from 'react'
import { useFonts } from 'expo-font'

export default function SharableComponent({ score }) {
    const [loaded] = useFonts({
        'mutiara': require('../assets/fonts/Mutiara_Display_02.ttf'),
    });

    if (!loaded) {
        return null;
    }
    return (
        <View>
            <View style={styles.header}>
            </View>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/images/hand.png')}
                    style={styles.image}
                />
            </View>
            <Text style={{ fontFamily: 'mutiara', fontSize: 24, marginBottom: -8, textAlign: 'center', marginTop: 72 }}>CONGRATULATIONS</Text>
            <Text style={{ fontFamily: 'mutiara', fontSize: 24, marginBottom: -8, textAlign: 'center', marginTop: 10 }}>You are</Text>
            <Text style={{ fontFamily: 'mutiara', fontSize: 24, marginBottom: -8, textAlign: 'center', color: '#F76B05', marginTop: 10 }}>{score}%</Text>
            <Text style={{ fontFamily: 'mutiara', fontSize: 24, marginBottom: -8, textAlign: 'center', marginTop: 10 }}>Kenyan</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        paddingLeft: 8
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 183,
        height: 173,
        marginTop: 40
    },
})