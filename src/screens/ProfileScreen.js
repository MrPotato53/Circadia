import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import { useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin, GoogleSigninButton, statusCodes} from '@react-native-google-signin/google-signin';

import {IOS_CLIENT_ID, WEB_CLIENT_ID, ANDROID_CLIENT_ID} from'@env';

const ProfileScreen = () => {

    const [error, setError] = useState(undefined);
    const [userInfo, setUserInfo] = useState(undefined);

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
            setUserInfo(userInfo);
            setError();
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

    const logOut = () => {
        setUserInfo(undefined);
        GoogleSignin.revokeAccess();
        GoogleSignin.signOut();
    };

    return (
        <ScrollView>
            <GoogleSigninButton size={GoogleSigninButton.Size.Standard} color={GoogleSigninButton.Color.Light} onPress={signIn}/>
            <Button title="logout" onPress={logOut}></Button>
            <Text>{JSON.stringify(userInfo)}</Text>
        </ScrollView>
    );
};

export default ProfileScreen;