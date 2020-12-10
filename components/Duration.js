import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Slider from "@react-native-community/slider";

function Duration({ duration, handleDuration }) {
  return (
    <View>
      <View style={styles.durationWrapper}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={400}
          value={duration}
          onValueChange={(item) => handleDuration(item)}
          step={1}
        />
        <Text style={styles.durationText}>{duration} minutes</Text>
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
    marginTop: 10,
    marginBottom: -10,
    // touchAction: "none",
    // overflow: "hidden",
    // overscrollBehavior: "none",
  },
  durationText: {
    alignSelf: "center",
    marginBottom: 10,
    fontSize: 18,
  },
});
