import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const useWakeSleepContext = () => useContext(DataContext);

export const WakeSleepTimeContext = ({children}) => {
    const [sleepWakeTimes, setSleepWakeTimes] = useState({wakeHour: null, wakeMinute: null, sleepHour: null, sleepMinute: null});

    return (
        <DataContext.Provider value={{ sleepWakeTimes, setSleepWakeTimes }}>
          {children}
        </DataContext.Provider>
      );
}