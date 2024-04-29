import { StyleSheet, Text, View, Button } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';

const FriendsScreen = () => {

    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get('http://localhost:5001/Users')
        .then(response => setUser(response.data))
        .catch(error => console.log(error));
    }, [])

    return (
        <View style={{alignItems: "center", justifyContent: "center", flex: 1}}>
            <Text style={{fontSize: 40}}>Coming Soon</Text>
            <Text>{JSON.stringify(user)}</Text>
        </View>
    );
};

export default FriendsScreen;