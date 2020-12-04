import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";

function Providers({ selectedProviders, handleProvider, allProviderData }) {
  const providerIDs = Object.keys(selectedProviders);
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => handleProvider(item)}
        style={selectedProviders[item] ? styles.buttonSelected : styles.button}
      >
        <Text>{item}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.genreWrapper}>
      <FlatList
        contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
        data={providerIDs}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        numColumns={3}
      />
    </View>
  );
}

export default Providers;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 10,
    margin: 10,
    borderColor: "black",
    borderWidth: 4,
    display: "inline",
  },
  buttonSelected: {
    padding: 10,
    borderRadius: 10,
    margin: 10,
    borderColor: "black",
    borderWidth: 4,
    backgroundColor: "orange",
    display: "inline",
  },
  genreWrapper: {
    flexDirection: "row",
  },
});
