import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, FriendsScreen } from './screens';

const Tab = createBottomTabNavigator();

const ProfileScreen = () => (
  <View>
    <Text>Profile</Text>
  </View>
);

export const AppNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen}/>
    <Tab.Screen name="Friends" component={FriendsScreen}/>
    <Tab.Screen name="Settings" component={SettingsScreen}/>
    <Tab.Screen name="Profile" component={ProfileScreen}/>
  </Tab.Navigator>
);

const App = () => (
  <NavigationContainer>
    <AppNavigator/>
  </NavigationContainer>
);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
