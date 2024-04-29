import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import { useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin, GoogleSigninButton, statusCodes} from '@react-native-google-signin/google-signin';
import { useUserContext } from '../contexts/UserContext';

const ProfileScreen = () => {

    const {user, setUser} = useUserContext();
    
    const logOut = () => {
        setUser(null)
        GoogleSignin.revokeAccess();
        GoogleSignin.signOut();
        clearUserState();
    };

    const clearUserState = async () => {
        try {
            await AsyncStorage.removeItem("user");
            await AsyncStorage.removeItem("sleepPM");
            await AsyncStorage.removeItem("wakePM");
            await AsyncStorage.removeItem("setTimes");
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <ScrollView>
            <Button title="logout" onPress={logOut}></Button>
            <Text>{JSON.stringify(user.tokens)}</Text>
        </ScrollView>
    );
};

export default ProfileScreen;