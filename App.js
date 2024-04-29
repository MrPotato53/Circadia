import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { useEffect, useState } from 'react';

import FriendsScreen from './src/screens/FriendsScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import LoginScreen from './src/screens/LoginScreen';
import {WakeSleepTimeContext} from './src/contexts/WakeSleepTimesContext';
import {UserContext} from './src/contexts/UserContext';
import { useUserContext } from './src/contexts/UserContext';

const Tab = createBottomTabNavigator();

export const AppNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen}/>
    <Tab.Screen name="Friends" component={FriendsScreen}/>
    <Tab.Screen name="Preferences" component={SettingsScreen}/>
    <Tab.Screen name="Profile" component={ProfileScreen}/>
  </Tab.Navigator>
);

export const AppContent = () => {

  const {user, setUser} = useUserContext();

  return (
    <>
      {user != null 
        ? (
          <NavigationContainer>
            <WakeSleepTimeContext>
              <AppNavigator/>
            </WakeSleepTimeContext>
          </NavigationContainer>
        ) 
        : <LoginScreen/>
        }
      </>
  )
}

const App = () => {

  return (
    <UserContext>
      <AppContent/>
    </UserContext>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
