import React, { useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useHover, useFocus, useActive } from "react-native-web-hooks";
import {
  Heebo_500Medium,
  Heebo_700Bold,
  Heebo_800ExtraBold,
  Heebo_900Black,
} from "@expo-google-fonts/heebo";

function Genres({ selectedGenres, handleGenre }) {
  const ref = useRef(null);
  const isHovered = useHover(ref);
  const data = Object.keys(selectedGenres);
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => handleGenre(item)}
        ref={ref}
        style={[
          selectedGenres[item] && styles.buttonSelected,
          !selectedGenres[item] && styles.button,
          isHovered && styles.buttonSelected,
        ]}
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
    borderColor: "rgba(254,244,225,.2)",
    borderWidth: 1,
  },
  buttonSelected: {
    padding: 10,
    borderRadius: 10,
    margin: 10,
    borderColor: "rgba(253,215,130,.1)",
    borderWidth: 1,
    backgroundColor: "rgba(253,215,130,.1)",
  },
  genreWrapper: {
    flexDirection: "row",
  },
  buttonText: {
    color: "#FEF4E1",
    fontFamily: Heebo_500Medium,
  },
  buttonTextSelected: {
    color: "#FDD782",
  },
});
