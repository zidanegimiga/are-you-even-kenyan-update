import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'
import SelectGameCard from '../../components/selectGameCard'
import games from '../../global/games'
import { useHeaderHeight } from '@react-navigation/elements';

const SelectGame = () => {
  const headerHeight = useHeaderHeight();
  return (
    <View style={[styles.wrapper, {marginTop: headerHeight}]}>
      <View style={styles.navigator}></View>
      <Swiper
        containerStyle={{
        }} 
        showsButtons={true}
        nextButton={
          <View style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: "#745AA8",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: -150,
            right: 0
          }}>
            <Text
              style={{
                color: "white",
                fontSize: 16,
                textAlign: "center"
              }}
            >&gt;</Text>
          </View>
        }
        prevButton={
          <View style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: "#745AA8",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: -150
          }}>
            <Text
              style={{
                color: "white",
                fontSize: 16,
                textAlign: "center"
              }}
            >&lt;</Text>
          </View>
        }
        dot={
          <View
            style={{
              backgroundColor: '#ffffff',
              borderColor: '#2F203B',
              borderWidth: 3,
              width: 16,
              height: 16,
              borderRadius: 8,
              marginLeft: 3,
              marginRight: 3,
              marginTop: 3,
              marginBottom: 3
            }}
          />
        }
        activeDot={
          <View
            style={{
              backgroundColor: '#A80C89',
              width: 40,
              height: 16,
              borderRadius: 8,
              marginLeft: 3,
              marginRight: 3,
              marginTop: 3,
              marginBottom: 3
            }}
          />
        }
      >
        {
          games.map((game, index) => (
            <SelectGameCard game={game} key={index}/>
          ))
        }              
      </Swiper>
    </View>
  )
}

export default SelectGame

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "white"
  },
  navigator: {
    height: 60
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})