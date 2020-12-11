import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import logoImage from "../assets/tv-ex-small.png";
import {
  Heebo_500Medium,
  Heebo_700Bold,
  Heebo_800ExtraBold,
  Heebo_900Black,
} from "@expo-google-fonts/heebo";

function Logo() {
  return (
    <View style={styles.logo}>
      <Image style={styles.logoImage} source={logoImage} />
      <Text style={styles.logoText}>Couch Buddy</Text>
    </View>
  );
}

export default Logo;

const styles = StyleSheet.create({
  logoImage: {
    width: 40,
    height: 40,
  },
  logo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  logoText: {
    color: "#96D0D3",
    fontSize: 30,
    marginLeft: 10,
    fontFamily: Heebo_800ExtraBold,
  },
});
