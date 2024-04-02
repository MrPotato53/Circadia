import {View, SafeAreaView, Text, StyleSheet} from 'react-native';

const CountdownTimer = ({time, timerType}) => {

    return (
        <View style={styles.container}>
            <View style={styles.view}>
                <Text style={styles.text}>Time until {timerType == "wake" ? "wake-up time!" : "bedtime!"}</Text>
                <Text style={styles.timer}>
                    {time.hours}:{time.minutes < 10 ? 0 : null}{time.minutes}:{time.seconds < 10 ? 0 : null}{time.seconds}
                </Text>
            </View>
        </View>
    );
};

export default CountdownTimer;

const styles = StyleSheet.create( {
    container: {
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        alignItems: "center"
    },
    view: {
        justifyContent: "center",
        alignItems: "center",
        height: "70%",
    },
    timer: {
        fontSize:70,
        fontFamily: "Futura",
        color: "black",
    },
    text: {
        fontSize: 20,
        fontFamily: "Futura",
        alignSelf: "center",
        color: "black",
        textAlign: "center"
    }
});