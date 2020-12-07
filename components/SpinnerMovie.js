import React from "react";
import { Animated, Easing, View, StyleSheet } from "react-native";
import LottieView from "react-native-web-lottie";

export default function SpinnerMovie() {
  return (
    <View style={styles.spinner}>
      <LottieView
        source={require("../assets/spinnermovie.json")}
        autoPlay
        loop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  spinner: {
    flex: "1",
    alignItems: "center",
    justifyContent: "center",
  },
});
