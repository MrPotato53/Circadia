import { Alert, StyleSheet, View, TextInput, SafeAreaView, Text, Button, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useState, useRef, useContext } from 'react';

import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import CustomSwitch from '../components/CustomSwitch';
import {useWakeSleepContext} from '../contexts/WakeSleepTimesContext';

const SettingsScreen = () => {

    // Forms for authentication of hour and minute submissions
    const {control: controlWake, handleSubmit: handleSubmitWake, reset: resetWake, formState: {wakeErrors}} = useForm();
    const {control: controlSleep, handleSubmit: handleSubmitSleep, reset: resetSleep, formState: {sleepErrors}} = useForm();

    const [wakeupIsPM, setWakeupAMPM] = useState(false);
    const [sleepIsPM, setSleepAMPM] = useState(false);
    const [displayWakePM, setDisplayWakePM] = useState(false);
    const [displaySleepPM, setDisplaySleepPM] = useState(false);

    // Context for sleep and wake times so it's accessible accross screens
    const {sleepWakeTimes, setSleepWakeTimes} = useWakeSleepContext();

    // Saving wake time to context
    const saveWake = (data) => {
        const hour = parseInt(data['Wake Hour'].toString(), 10);
        const minute = parseInt(data['Wake Minute'].toString(), 10);
        setSleepWakeTimes({
            wakeHour: hour + (wakeupIsPM ? 12 : 0) - (hour == 12 ? 12 : 0), 
            wakeMinute: minute, 
            sleepHour: sleepWakeTimes.sleepHour, 
            sleepMinute: sleepWakeTimes.sleepMinute});
        setDisplayWakePM(wakeupIsPM);
    }; 

    // Saving sleep time to context
    const saveSleep = (data) => {
        const hour = parseInt(data['Sleep Hour'].toString(), 10);
        const minute = parseInt(data['Sleep Minute'].toString(), 10)
        setSleepWakeTimes({
            wakeHour: sleepWakeTimes.wakeHour, 
            wakeMinute: sleepWakeTimes.wakeMinute, 
            sleepHour: hour + (sleepIsPM ? 12 : 0) - (hour == 12 ? 12 : 0), 
            sleepMinute: minute});
        setDisplaySleepPM(sleepIsPM);
    };

    const toggleWakeAMPM = () => setWakeupAMPM(previousState => !previousState);
    const toggleSleepAMPM = () => setSleepAMPM(previousState => !previousState);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{height: "50%", alignItems: "center", justifyContent: "space-evenly"}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "100%"}}>
                        {sleepWakeTimes.wakeHour == null
                        ? <Text style={styles.titleText}>Wakeup Time Not Set Yet</Text>
                        : <Text style={styles.titleText}>
                            Wake Up Time Set To {sleepWakeTimes.wakeHour - (displayWakePM ? 12 : 0) + (sleepWakeTimes.wakeHour % 12 == 0 ? 12 : 0)}:{sleepWakeTimes.wakeMinute < 10 ? 0 : null}{sleepWakeTimes.wakeMinute} {displayWakePM ? 'PM' : 'AM'}
                        </Text>
                        }
                        <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15}}>
                            {!wakeupIsPM
                            ? <Text style={styles.AMPMText}>AM</Text>
                            : <Text style={styles.AMPMText}>PM</Text>
                            }
                            <CustomSwitch 
                                onValueChange={toggleWakeAMPM}
                                value={wakeupIsPM}
                            />
                        </View>
                    </View>
                    <View style={{flexDirection: "row", width: "100%", justifyContent: "space-evenly"}}>
                        <CustomInput
                            control={controlWake}
                            name="Wake Hour" 
                            placeholder="Input Hour (1-12)"
                            rules={{required: 'Hour Required', min: {value: 1, message: 'Hour must be > 0'}, max: {value: 12, message: 'Hour must be < 13'}}}
                            keyboardType="numeric"
                        />
                        <CustomInput
                            control={controlWake}
                            name="Wake Minute"
                            placeholder="Input Minute (00-59)"
                            rules={{required: 'Minute Required', min: {value: 0, message: 'Minute must be > -1'}, max: {value: 59, message: 'Hour must be < 60'}}}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>
                        <CustomButton text="Set Wakeup Time" onPress={handleSubmitWake(saveWake)}/>
                        <CustomButton text="Clear Wakeup Time" onPress={() => {
                            setSleepWakeTimes({wakeHour: null, wakeMinute: null, sleepHour: sleepWakeTimes.sleepHour, sleepMinute:sleepWakeTimes.sleepMinute});
                            }}/>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "100%"}}>
                        {sleepWakeTimes.sleepHour == null
                        ? <Text style={styles.titleText}>Sleep Time Not Set Yet</Text>
                        : <Text style={styles.titleText}>
                            Sleep Time Set To {sleepWakeTimes.sleepHour - (displaySleepPM ? 12 : 0) + (sleepWakeTimes.sleepHour % 12 == 0 ? 12 : 0)}:{sleepWakeTimes.sleepMinute < 10 ? 0 : null}{sleepWakeTimes.sleepMinute} {displaySleepPM ? 'PM' : 'AM'}
                        </Text>
                        }
                        <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15}}>
                            {!sleepIsPM
                            ? <Text style={styles.AMPMText}>AM</Text>
                            : <Text style={styles.AMPMText}>PM</Text>
                            }
                            <CustomSwitch 
                                onValueChange={toggleSleepAMPM}
                                value={sleepIsPM}
                            />
                        </View>
                    </View>
                    <View style={{flexDirection: "row", width: "100%", justifyContent: "space-evenly"}}>
                        <CustomInput
                            control={controlSleep}
                            name="Sleep Hour" 
                            placeholder="Input Hour (1-12)"
                            rules={{required: 'Hour Required', min: {value: 1, message: 'Hour must be > 0'}, max: {value: 12, message: 'Hour must be < 13'}}}
                            keyboardType="numeric"
                        />
                        <CustomInput
                            control={controlSleep}
                            name="Sleep Minute"
                            placeholder="Input Minute (00-59)"
                            rules={{required: 'Minute Required', min: {value: 0, message: 'Minute must be > -1'}, max: {value: 59, message: 'Hour must be < 60'}}}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>
                        <CustomButton text="Set Sleeping Time" onPress={handleSubmitSleep(saveSleep)}/>
                        <CustomButton text="Clear Sleeping Time" onPress={() => {
                            setSleepWakeTimes({wakeHour: sleepWakeTimes.wakeHour, wakeMinute: sleepWakeTimes.wakeMinute, sleepHour: null, sleepMinute:null});
                            }}/>
                    </View>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
                
)};

const styles = StyleSheet.create( {
    titleText: {
        alignSelf: 'center', 
        paddingHorizontal: 15
    },
    AMPMText: {
        paddingHorizontal: 5,
        fontWeight: 'bold'
    }
});

export default SettingsScreen;