import React from 'react';
import {useState} from 'react';
import {Text, View, Pressable, StyleSheet} from 'react-native';

const CustomButton = ({text, onPress}) => {

    const [pressed, setPressed] = useState(false);

    const handlePressIn = () => (setPressed(true));
    const handlePressOut = () => (setPressed(false));

    return (
        <View style={styles.container}>
            <Pressable style={[styles.pressable, pressed && styles.pressablePressed]} onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
                <Text style={styles.text}>{text}</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    pressable: {
        width: '90%',
        padding: 12,
        textAlign:'center', 
        backgroundColor: "#f77604",
        borderRadius: 7
    },
    text: {
        textAlign:'center',
        color: 'white',
        fontWeight: 'bold'
    },
    pressablePressed: {
        backgroundColor: "#f29543"
    }
});

export default CustomButton;