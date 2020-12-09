import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import logoImage from "../assets/CouchBuddyLogo.png";

function Logo() {
  return (
    <View style={styles.logo}>
      <Image style={styles.logoImage} source={logoImage} />
    </View>
  );
}

export default Logo;

const styles = StyleSheet.create({
  logoImage: {
    width: 300,
    height: 100,
  },
});
