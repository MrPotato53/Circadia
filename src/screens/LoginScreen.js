import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import { useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin, GoogleSigninButton, statusCodes} from '@react-native-google-signin/google-signin';
import { useUserContext } from '../contexts/UserContext';

import {IOS_CLIENT_ID, WEB_CLIENT_ID, ANDROID_CLIENT_ID} from '@env';

const LoginScreen = () => {

    const [error, setError] = useState(undefined);
    const {user, setUser} = useUserContext();

    const configureGoogleSignIn = () => {
        GoogleSignin.configure({
          webClientId: WEB_CLIENT_ID,
          androidClientId: ANDROID_CLIENT_ID,
          iosClientId: IOS_CLIENT_ID, 
        });
    };

    useEffect(() => {
        configureGoogleSignIn();
    }, []);
    
    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            setUser(userInfo);
            setError();
            await AsyncStorage.setItem("user", JSON.stringify(userInfo));
        } catch(e) {
            console.log(e);
            switch(e.code) {
                case statusCodes.IN_PROGRESS:
                    console.log("in progress");
                    break;
                case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                    console.log("play services not available");
                    break;
                case statusCodes.SIGN_IN_CANCELLED:
                    console.log("cancelled");
                    break;
                default:
                    console.log("unknown error");
                    setError(e);
            }
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text>Sign in with Google</Text>
            <GoogleSigninButton style={styles.google_button} size={GoogleSigninButton.Size.Standard} color={GoogleSigninButton.Color.Light} onPress={signIn}/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    },
    google_button: {
    }
})

export default LoginScreen;