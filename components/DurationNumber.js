import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
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
      <TextInput
        style={styles.durationText}
        onChangeText={(item) => handleDuration(item)}
        value={duration}
      ></TextInput>
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
