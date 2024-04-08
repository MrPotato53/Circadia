import { StyleSheet, Text, View, Button } from 'react-native';
import {GoogleSignin, GoogleSigninButton, statusCodes} from '@react-native-google-signin/google-signin';


const FriendsScreen = () => {

    const logOut = () => {
        setUserInfo(undefined);
        GoogleSignin.revokeAccess();
        GoogleSignin.signOut();
    };

    return (
        <View style={{alignItems: "center", justifyContent: "center", flex: 1}}>
            <Text style={{fontSize: 40}}>Coming Soon</Text>
            <Button title="logout" onPress={logOut}></Button>
        </View>
    );
};

export default FriendsScreen;