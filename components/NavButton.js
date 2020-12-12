import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import logoImage from "../assets/tv-ex-small.png";
import {
  Heebo_500Medium,
  Heebo_700Bold,
  Heebo_800ExtraBold,
  Heebo_900Black,
} from "@expo-google-fonts/heebo";

function NavButton({ handleSubmit, buttonText }) {
  return (
    <TouchableOpacity onPress={handleSubmit}>
      <Text style={styles.navButton}>{buttonText}</Text>
    </TouchableOpacity>
  );
}

export default NavButton;

const styles = StyleSheet.create({
  navButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
    borderRadius: 10,
    borderColor: "#FDD782",
    borderWidth: 1,
    backgroundColor: "#FDD782",
    alignSelf: "center",
    fontFamily: Heebo_800ExtraBold,
  },
});
