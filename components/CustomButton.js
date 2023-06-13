import { StyleSheet, Text, View, TouchableOpacity, Platform, Image } from 'react-native';

export default function CustomButton({ bgColor, themeColor, onPress, label, disabled }) {
    return (
        <TouchableOpacity
            disabled={disabled}
            style={[styles.button, 
              { 
                backgroundColor: bgColor, borderColor: themeColor, 
                ...Platform.select({
                ios:{
                  shadowColor: themeColor                
                }
            }) }]}
            onPress={()=> onPress()}
        >
            <Text style={[styles.buttonText, {color: themeColor}]}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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
            elevation: 10,
          },
        })
      },
    buttonText:{
      textAlign: 'center'
    },
})