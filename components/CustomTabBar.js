import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import {BottomTabBar} from '@react-navigation/bottom-tabs';

const screenWidth = Dimensions.get('window').width

const CustomTabBar = props => {
  return (
    <View style={styles.tabBar}>
      {/* <View  /> */}
      <BottomTabBar {...props} />
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  tabBar: {
    height: 80,
    // width: screenWidth - 40,

    // shadowColor: COLORS.black,
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 2,
    // elevation: 3,
  },
});