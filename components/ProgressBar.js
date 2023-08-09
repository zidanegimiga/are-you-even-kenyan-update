import React from 'react';
import { View, StyleSheet } from 'react-native';

const ProgressBar = ({ progress }) => {
    return (
        <View style={styles.progressBar}>
            <View style={[styles.progress, { width: `${progress}%` }]}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    progressBar: {
        width: '90%',
        height: 10,
        backgroundColor: '#ccc',
        borderRadius: 5,
        overflow: 'hidden',
    },
    progress: {
        height: '100%',
        backgroundColor: 'green',
    },
});

export default ProgressBar