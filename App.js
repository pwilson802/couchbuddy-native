import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Amplify from "aws-amplify";
import config from "./aws-exports";
import { API, graphqlOperation } from "aws-amplify";
import { getCouchmovie, getWatchOn, listMovieLengths } from "./graphql/queries";
Amplify.configure(config);
import SearchPage from "./components/SearchPage";
import ResultsPage from "./components/ResultPage";

export default function App() {
  const [page, setPage] = useState("SearchPage");
  const [width, setWidth] = useState(Dimensions.get("window").width);
  const [screenSize, setScreenSize] = useState("small");
  const [searchDetails, setSearchDetails] = useState({});

  const handleSearchDetails = (item) => {
    setSearchDetails(item);
  };

  const changePage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    const handleResizeWindow = () => {
      const newWidth = Dimensions.get("window").width;
      setWidth(newWidth);
      if (newWidth < 600) {
        setScreenSize("small");
      } else {
        setScreenSize("large");
      }
    };
    handleResizeWindow();
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  return (
    <View style={styles.container}>
      {page === "SearchPage" && (
        <SearchPage
          handleSearchDetails={handleSearchDetails}
          setPage={setPage}
          width={width}
          screenSize={screenSize}
        />
      )}
      {page === "ResultsPage" && (
        <ResultsPage
          searchDetails={searchDetails}
          setPage={setPage}
          width={width}
          screenSize={screenSize}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#1f141a",
    backgroundColor: "#15202B",
  },
});
