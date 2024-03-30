import React from 'react';
import {Text, View, Switch, StyleSheet} from 'react-native';

const CustomSwitch = ({onValueChange, value}) => {
    return (
        <View style={styles.container}>
            <Switch 
                style={styles.switch}
                onValueChange={onValueChange}
                value={value}
                trackColor={{true: '#3e3e3e', false: '#767577'}}
                thumbColor={!value ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#81b0ff"
            />
        </View>
    );
};

const styles = StyleSheet.create( {
    container: {

    },
    switch: {
        
    }
});

export default CustomSwitch;