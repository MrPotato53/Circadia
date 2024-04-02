import {View} from 'react-native';
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DataContext = createContext();

export const useWakeSleepContext = () => useContext(DataContext);

export const WakeSleepTimeContext = ({children}) => {

  var times = {wakeHour: null, wakeMinute: null, sleepHour: null, sleepMinute: null};
  const [sleepWakeTimes, setSleepWakeTimes] = useState(times);
  const [isLoading, setIsLoading] = useState(true);

  useEffect( () => {
    const getTimes = async () => {
      try {
        const value = await AsyncStorage.getItem("setTimes");
        if(value !== null) setSleepWakeTimes(JSON.parse(value));
        setIsLoading(false);
      } catch (e) {
        console.log("Error retrieving data from async storage");
        console.log(e)
      }
    }

    getTimes();
  }, []);

  return !isLoading ? 
  (<DataContext.Provider value={{ sleepWakeTimes, setSleepWakeTimes }}>
    {children}
  </DataContext.Provider>) 
  : null;
}