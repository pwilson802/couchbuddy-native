import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Amplify from "aws-amplify";
import config from "./aws-exports";
import { API, graphqlOperation } from "aws-amplify";
import { getCouchmovie, getWatchOn, listMovieLengths } from "./graphql/queries";
Amplify.configure(config);
import SearchPage from "./components/SearchPage";
import ResultsPage from "./components/ResultPage";

export default function App() {
  const [page, setPage] = useState("SearchPage");
  const [searchDetails, setSearchDetails] = useState({});

  const handleSearchDetails = (item) => {
    setSearchDetails(item);
  };

  const changePage = (page) => {
    setPage(page);
  };

  return (
    <View style={styles.container}>
      {page === "SearchPage" && (
        <SearchPage
          handleSearchDetails={handleSearchDetails}
          setPage={setPage}
        />
      )}
      {page === "ResultsPage" && (
        <ResultsPage searchDetails={searchDetails} setPage={setPage} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
