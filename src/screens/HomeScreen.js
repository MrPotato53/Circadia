import { StyleSheet, Text, View, Button } from 'react-native';
import { useEffect, useState, useContext } from 'react';
import {useWakeSleepContext} from '../contexts/WakeSleepTimesContext';

const HomeScreen = () => {

    const {sleepWakeTimes, __} = useWakeSleepContext();
    const [currentTime, updateCurrentTime] = useState({hour: null, minute: null, second: null});

    const [wakeupCountdown, setWakeupCountdown] = useState({hours: null, minutes: null, seconds: null});
    const [sleepCountdown, setSleepCountdown] = useState({hours: null, minutes: null, seconds: null});

    // Update Wakeup and Sleep countdown timers
    useEffect (() => {
        const timeUpdate = setInterval( () => {
            const date = new Date();
            updateCurrentTime({hour: date.getHours(), minute: date.getMinutes(), second: date.getSeconds()});
            var difference;
            if(sleepWakeTimes.wakeHour != null) {
                difference = 3600 * sleepWakeTimes.wakeHour + 60 * sleepWakeTimes.wakeMinute - (3600*date.getHours() + 60*date.getMinutes() + date.getSeconds());
                if(difference < 0) difference += 24 * 3600;
                setWakeupCountdown({hours: Math.floor(difference / 3600), minutes: Math.floor((difference % 3600) / 60), seconds: difference % 60});
            }
            if(sleepWakeTimes.sleepHour != null) {
                difference = 3600 * sleepWakeTimes.sleepHour + 60 * sleepWakeTimes.sleepMinute - (3600*date.getHours() + 60*date.getMinutes() + date.getSeconds());
                if(difference < 0) difference += 24 * 3600;
                setSleepCountdown({hours: Math.floor(difference / 3600), minutes: Math.floor((difference % 3600) / 60), seconds: difference % 60});
            }
        }, 1000);

        return () => clearInterval(timeUpdate);
    }, [sleepWakeTimes]);

    return (
        <View>
            <Text>{sleepWakeTimes.wakeHour}:{sleepWakeTimes.wakeMinute}:{sleepWakeTimes.sleepHour}:{sleepWakeTimes.sleepMinute}</Text>
            {sleepWakeTimes.wakeHour != null 
            ? <Text>{wakeupCountdown.hours}:{wakeupCountdown.minutes}:{wakeupCountdown.seconds}</Text>
            : null
            }
            {sleepWakeTimes.sleepHour != null
            ? <Text>{sleepCountdown.hours}:{sleepCountdown.minutes}:{sleepCountdown.seconds}</Text>
            : null
            }
            
            <Text>{currentTime.hour}:{currentTime.minute}:{currentTime.second}</Text>
        </View>
    );
};

export default HomeScreen;