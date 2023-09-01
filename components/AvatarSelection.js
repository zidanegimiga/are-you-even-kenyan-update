import React, {useState} from 'react';
import { AsyncStorage, Alert, View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

import avatar1 from '../assets/avatars/3.png';
import avatar2 from '../assets/avatars/4.png';
import avatar3 from '../assets/avatars/5.png';
import avatar4 from '../assets/avatars/6.png';
import avatar5 from '../assets/avatars/7.png';
import avatar6 from '../assets/avatars/8.png';
import avatar7 from '../assets/avatars/9.png';
import avatar8 from '../assets/avatars/10.png';
import avatar9 from '../assets/avatars/11.png';
import avatar10 from '../assets/avatars/12.png';
import avatar11 from '../assets/avatars/13.png';
import avatar12 from '../assets/avatars/14.png';

const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9, avatar10, avatar11, avatar12]

const AvatarSelection = ({ onSelectAvatar }) => {
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.avatarItem} onPress={() => onSelectAvatar(item)}>
            <Image style={styles.avatarImage} source={item} />
        </TouchableOpacity>
    );

    return (
        <View style={{ width: "100%", justifyContent: "center", display: "flex", alignItems: "center" }}>
            <FlatList
                data={avatars}
                renderItem={renderItem}
                // keyExtractor={(item) => item.id.toString()}
                numColumns={4}
            />            
        </View>
    );
};

const styles = StyleSheet.create({
    avatarItem: {
        alignItems: 'center',
        margin: 10,
    },
    avatarImage: {
        width: 72,
        height: 72,
        borderRadius: 50,
        borderColor: "white",
        borderWidth: 2
    },
    avatarName: {
        marginTop: 5,
        textAlign: 'center',
        color: "white"
    },
});

export default AvatarSelection;