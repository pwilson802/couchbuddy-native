import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Genres from "./Genres";

function DropDownGenres({ selectedGenres, handleGenre }) {
  const [show, setShow] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setShow(!show)}>
        <Text style={styles.dropText}>GENRES</Text>
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
    backgroundColor: "rgba(241, 136, 143,0.3)",
    textAlign: "center",
    color: "#F1888F",
  },
});
