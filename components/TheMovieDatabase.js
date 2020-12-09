import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import TMDImage from "../assets/tmd.svg";

function TheMovieDatabase() {
  return (
    <View style={styles.logo}>
      <Image style={styles.logoImage} source={TMDImage} />
    </View>
  );
}

export default TheMovieDatabase;

const styles = StyleSheet.create({
  logoImage: {
    width: 420,
    height: 30,
  },
  logo: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
