import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { API, graphqlOperation } from "aws-amplify";
import { getCouchmovie, getGenre, listMovieLengths } from "../graphql/queries";

function MovieCard({ id, allProviderData, providers }) {
  console.log(allProviderData);
  console.log(providers);
  return (
    <View>
      <Text>{id}</Text>
    </View>
  );
}

export default MovieCard;
