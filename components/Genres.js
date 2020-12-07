import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";

function Genres({ selectedGenres, handleGenre }) {
  const data = Object.keys(selectedGenres);
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => handleGenre(item)}
        style={selectedGenres[item] ? styles.buttonSelected : styles.button}
      >
        <Text
          style={
            selectedGenres[item] ? styles.buttonTextSelected : styles.buttonText
          }
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.genreWrapper}>
      <FlatList
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        numColumns={3}
      />
    </View>
  );
}

export default Genres;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 10,
    margin: 10,
    borderColor: "#D90404",
    borderWidth: 1,
    display: "inline",
    color: "#D90404",
  },
  buttonSelected: {
    padding: 10,
    borderRadius: 10,
    margin: 10,
    borderColor: "#590202",
    borderWidth: 1,
    backgroundColor: "#590202",
    display: "inline",
  },
  genreWrapper: {
    flexDirection: "row",
  },
  buttonText: {
    color: "#D90404",
  },
  buttonTextSelected: {
    color: "#D90404",
  },
});
