import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

function LocationSelect({ handleLocation, location }) {
  return (
    <Picker
      selectedValue={location}
      style={{ height: 50, width: 50 }}
      onValueChange={(itemValue, indexItem) => handleLocation(itemValue)}
    >
      <Picker.Item label="Australia" value="AU" />
      <Picker.Item label="United States" value="US" />
    </Picker>
  );
}

export default LocationSelect;
