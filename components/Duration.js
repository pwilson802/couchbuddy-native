import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Slider from "@react-native-community/slider";
import {
  Heebo_500Medium,
  Heebo_700Bold,
  Heebo_800ExtraBold,
  Heebo_900Black,
} from "@expo-google-fonts/heebo";

function Duration({ duration, handleDuration }) {
  return (
    <View>
      <Text style={styles.durationText}>{duration} minutes</Text>
      <View style={styles.durationWrapper}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={400}
          value={duration}
          onValueChange={(item) => handleDuration(item)}
          step={1}
          minimumTrackTintColor={"#F1888F"}
          maximumTrackTintColor={"rgba(241,136,143,.5)"}
          thumbTintColor={"#E12C86"}
        />
      </View>
    </View>
  );
}

export default Duration;

const styles = StyleSheet.create({
  durationWrapper: {
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
    // touchAction: "none",
    // overflow: "hidden",
    // overscrollBehavior: "none",
  },
  durationText: {
    marginRight: 10,
  },
  slider: {
    width: 300,
    opacity: 1,
    height: 50,
    marginTop: -10,
    // touchAction: "none",
    // overflow: "hidden",
    // overscrollBehavior: "none",
  },
  durationText: {
    alignSelf: "center",
    marginTop: 10,
    fontSize: 16,
    color: "#FEF4E1",
    fontFamily: Heebo_700Bold,
  },
});
