import React from 'react';
import {useRef} from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';

const CustomInput = ({control, name, rules={}, placeholder, secureTextEntry, keyboardType="", ref=useRef(null)}) => {
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={ ({field: {value, onChange, onBlur}, fieldState: {error}}) => (
                <View style={[sytles.container]}>
                    <TextInput 
                    style={[sytles.input, error && {borderColor: 'red', borderWidth: 2}]}
                    ref={ref}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}/> 
                    {error && <Text style={{color: 'red'}}>{error.message || 'Error'}</Text>}
                </View>
            )}>
        </Controller> 
    );
};

const sytles = StyleSheet.create( {
    container: {
        width: "50%",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    input: {
        borderColor: "gray",
        width: "90%",
        borderWidth: 1,
        borderRadius: 10,
        padding: 12,
    }
});

export default CustomInput;