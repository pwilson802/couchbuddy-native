import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Genres from "./Genres";
import Providers from "./Providers";

function DropDownProviders({
  selectedProviders,
  handleProvider,
  allProviderData,
}) {
  const [show, setShow] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setShow(!show)}>
        <Text style={styles.dropText}>Providers &darr; &darr; </Text>
      </TouchableOpacity>
      {show && (
        <Providers
          selectedProviders={selectedProviders}
          handleProvider={handleProvider}
          allProviderData={allProviderData}
        />
      )}
    </View>
  );
}

export default DropDownProviders;

const styles = StyleSheet.create({
  dropText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
    borderColor: "#BF863F",
    borderWidth: 1,
    backgroundColor: "#BF863F",
    marginTop: 10,
  },
});
