import React from "react";
import { StyleSheet, Text, View } from "react-native";
// import Slider from "@react-native-community/slider";
import { Slider } from "@miblanchard/react-native-slider";

function Duration({ duration, handleDuration }) {
  return (
    <View>
      <View>
        <Text>Max {duration} minutes</Text>
        <Slider
          style={{ width: 200, height: 40, color: "#F0A24F" }}
          minimumValue={0}
          maximumValue={400}
          value={duration}
          onValueChange={(item) => handleDuration(item)}
          step={1}
        />
      </View>
    </View>
  );
}

export default Duration;

const styles = StyleSheet.create({
  durationWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  durationText: {
    marginRight: 10,
  },
});
