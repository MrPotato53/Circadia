import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DataContext = createContext();

export const useUserContext = () => useContext(DataContext);

export const UserContext = ({children}) => {

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect( () => {
    const getUser = async () => {
      try {
        const value = await AsyncStorage.getItem("user");
        if(value !== null) setUser(JSON.parse(value));
        setIsLoading(false);
      } catch (e) {
        console.log("Error retrieving user from async storage");
        console.log(e)
      }
    }

    getUser();
  }, []);

  return !isLoading && 
  (<DataContext.Provider value={{ user, setUser }}>
    {children}
  </DataContext.Provider>)
}