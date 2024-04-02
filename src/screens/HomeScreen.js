import { StyleSheet, Text, View, Button } from 'react-native';
import { useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useWakeSleepContext} from '../contexts/WakeSleepTimesContext';

import CountdownTimer from '../components/CountdownTimer';

const HomeScreen = () => {

    const {sleepWakeTimes, __} = useWakeSleepContext();

    const [currentTime, updateCurrentTime] = useState({hour: null, minute: null, second: null});
    const [wakeupCountdown, setWakeupCountdown] = useState({hours: null, minutes: null, seconds: null});
    const [sleepCountdown, setSleepCountdown] = useState({hours: null, minutes: null, seconds: null});

    const [timerShown, setTimerShown] = useState(null);

    // Update Wakeup and Sleep countdown timers and set correct display timer
    useEffect (() => {
        const timeUpdate = setInterval( () => {
            const date = new Date();
            updateCurrentTime({hour: date.getHours(), minute: date.getMinutes(), second: date.getSeconds()});
            var wakeSet = false;
            var sleepSet = false;
            if(sleepWakeTimes.wakeHour != null) {
                var wakeDifference = 3600 * sleepWakeTimes.wakeHour + 60 * sleepWakeTimes.wakeMinute - (3600*date.getHours() + 60*date.getMinutes() + date.getSeconds());
                if(wakeDifference < 0) wakeDifference += 24 * 3600;
                setWakeupCountdown({hours: Math.floor(wakeDifference / 3600), minutes: Math.floor((wakeDifference % 3600) / 60), seconds: wakeDifference % 60});
                wakeSet = true;
            }
            if(sleepWakeTimes.sleepHour != null) {
                var sleepDifference = 3600 * sleepWakeTimes.sleepHour + 60 * sleepWakeTimes.sleepMinute - (3600*date.getHours() + 60*date.getMinutes() + date.getSeconds());
                if(sleepDifference < 0) sleepDifference += 24 * 3600;
                setSleepCountdown({hours: Math.floor(sleepDifference / 3600), minutes: Math.floor((sleepDifference % 3600) / 60), seconds: sleepDifference % 60});
                sleepSet = true;
            }

            if(wakeSet && sleepSet) {
                setTimerShown(wakeDifference < sleepDifference ? "wake" : "sleep");
            } else if (wakeSet) {
                setTimerShown("wake");
            } else if (sleepSet) {
                setTimerShown("sleep");
            } else {
                setTimerShown(null);
            }
        }, 1000);

        return () => clearInterval(timeUpdate);
    }, [sleepWakeTimes]);

    return (
        <View style={styles.container}>
            {timerShown != null 
            ? <CountdownTimer time={timerShown == "wake" ? wakeupCountdown : sleepCountdown} timerType={timerShown}/> 
            : <Text style={styles.text}>There is no Wake-up or Bedtime set</Text>
            }
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create( {
    container: {
        alignItems: "center",
        justifyContent: "center",
        height:"100%"
    },
    text: {
        fontSize: 20,
        fontFamily: "Futura",
        alignSelf: "center",
        color: "black",
        textAlign: "center"
    }
});