import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Genres from "./Genres";

function DropDownGenres({ selectedGenres, handleGenre }) {
  const [show, setShow] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setShow(!show)}>
        <Text style={styles.dropText}>Genres &darr; &darr; </Text>
      </TouchableOpacity>
      {show && (
        <Genres selectedGenres={selectedGenres} handleGenre={handleGenre} />
      )}
    </View>
  );
}

export default DropDownGenres;

const styles = StyleSheet.create({
  dropText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
    borderColor: "#D90404",
    borderWidth: 1,
    backgroundColor: "#D90404",
  },
});
