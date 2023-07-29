import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const AvatarSelection = ({ avatars, onSelectAvatar }) => {
    console.log("Items: ", avatars)
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.avatarItem} onPress={() => onSelectAvatar(item)}>
            <Image style={styles.avatarImage} source={require("../assets/avatars/man.png")} />
            <Text style={styles.avatarName}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={{ width: "100%", justifyContent: "center", display: "flex", alignItems: "center" }}>
            <FlatList
                data={avatars}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
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
        width: 64,
        height: 64,
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