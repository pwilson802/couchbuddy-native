import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";

function Providers({ selectedProviders, handleProvider, allProviderData }) {
  console.log(allProviderData);
  const providerIDs = Object.keys(selectedProviders);
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => handleProvider(item)}
        style={selectedProviders[item] ? styles.buttonSelected : styles.button}
      >
        <Image
          style={styles.providerImage}
          source={allProviderData[item]["logo"]}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.genreWrapper}>
      {providerIDs.map((item) => {
        return (
          <TouchableOpacity
            onPress={() => handleProvider(item)}
            style={
              selectedProviders[item] ? styles.buttonSelected : styles.button
            }
          >
            <Image
              style={styles.providerImage}
              source={allProviderData[item]["logo"]}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default Providers;

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    margin: 10,
    borderWidth: 0,
    display: "inline",
    opacity: 0.4,
  },
  buttonSelected: {
    borderRadius: 10,
    margin: 10,
    borderWidth: 0,
    display: "inline",
  },
  genreWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  providerImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
});
