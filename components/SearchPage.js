import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { API, graphqlOperation } from "aws-amplify";
import { getCouchmovie, getWatchOn, listProviders } from "../graphql/queries";
import Logo from "./Logo";
import LocationSelect from "./LocationSelect";
import Genres from "./Genres";
import Providers from "./Providers";
import Duration from "./Duration";
import DropDownGenres from "./DropDownGenres";
import DropDownProviders from "./DropDownProviders";
import TheMovieDatabase from "./TheMovieDatabase";
import NavButton from "./NavButton";
import {
  Heebo_500Medium,
  Heebo_700Bold,
  Heebo_800ExtraBold,
  Heebo_900Black,
} from "@expo-google-fonts/heebo";

const genreObj = {
  Action: false,
  Adventure: false,
  Animation: false,
  Comedy: false,
  Crime: false,
  Documentary: false,
  Drama: false,
  Family: false,
  Fantasy: false,
  History: false,
  Horror: false,
  Mystery: false,
  Romance: false,
  "Science Fiction": false,
  Thriller: false,
  War: false,
  Western: false,
};

async function getLocalProviders(country) {
  const locProviders = await API.graphql({
    query: getWatchOn,
    variables: { country: country },
  });
  return JSON.parse(locProviders.data.getWatchOn.data);
}

function makeProvidersObj(data) {
  return Object.keys(data).reduce((acc, curr) => {
    acc[curr] = false;
    return acc;
  }, {});
}

async function getAllProviderData() {
  const allProviders = await API.graphql({
    query: listProviders,
  });
  const providerList = allProviders.data.listProviders.items;
  const result = providerList.reduce((acc, curr) => {
    let providerID = curr["providerID"];
    let providerName = curr["providerName"];
    let providerLogo = curr["providerLogo"];
    acc[providerID] = {};
    acc[providerID]["name"] = providerName;
    acc[providerID]["logo"] = "http://image.tmdb.org/t/p/w185" + providerLogo;
    return acc;
  }, {});
  return result;
}

function makeSelectedProviders(selectedProviders, localProviderMovies) {
  const selected = Object.keys(selectedProviders).reduce((acc, curr) => {
    if (selectedProviders[curr]) {
      acc[curr] = localProviderMovies[curr];
    }
    return acc;
  }, {});
  return selected;
}

function SearchPage({ handleSearchDetails, setPage, width }) {
  const [location, setLocation] = useState("AU");
  const [selectedGenres, setSelectedGenres] = useState(genreObj);
  const [selectedProviders, setSelectedProviders] = useState({});
  const [localProviderMovies, setLocalProviderMovies] = useState({});
  const [allProviderData, setAllProviderData] = useState();
  const [duration, setDuration] = useState(400);
  const [loaded, setLoaded] = useState(false);

  async function configureProviders() {
    const localProviderData = await getLocalProviders(location);
    const providersObj = makeProvidersObj(localProviderData);
    const allProviderData = await getAllProviderData();
    setLocalProviderMovies(localProviderData);
    setSelectedProviders(providersObj);
    setAllProviderData(allProviderData);
    setLoaded(true);
  }

  function handleLocation(loc) {
    setLocation(loc);
  }

  const handleGenre = (genre) => {
    console.log(genre);
    const newGenreObj = {
      ...selectedGenres,
    };
    newGenreObj[genre] = !selectedGenres[genre];
    setSelectedGenres(newGenreObj);
  };

  const handleProvider = (provider) => {
    const newProviderObj = {
      ...selectedProviders,
    };
    newProviderObj[provider] = !selectedProviders[provider];
    setSelectedProviders(newProviderObj);
  };

  const handleDuration = (num) => {
    setDuration(num);
  };

  const handleSubmit = () => {
    const providerMovies = makeSelectedProviders(
      selectedProviders,
      localProviderMovies
    );
    const searchData = {
      selectedProviders: providerMovies,
      allProviderData: allProviderData,
      selectedGenres: selectedGenres,
      duration: duration,
    };
    handleSearchDetails(searchData);
    setPage("ResultsPage");
  };

  useEffect(() => {
    setLoaded(false);
    setSelectedGenres(genreObj);
    configureProviders(location);
  }, [location]);

  return (
    <View>
      <View style={styles.wrapper}>
        <View style={styles.nav}>
          <View style={styles.logoWrap}>
            <Logo />
          </View>
          <View style={styles.locationWrap}>
            <LocationSelect
              handleLocation={handleLocation}
              location={location}
            />
          </View>
        </View>
        <Text style={styles.introText}>
          Not sure what movie to watch tonight? Let couch buddy help you out
          with some suggestions.
        </Text>
        {loaded && (
          <View>
            {width < 700 ? (
              <DropDownGenres
                selectedGenres={selectedGenres}
                handleGenre={handleGenre}
              />
            ) : (
              <Genres
                selectedGenres={selectedGenres}
                handleGenre={handleGenre}
              />
            )}
            {width < 700 ? (
              <DropDownProviders
                selectedProviders={selectedProviders}
                handleProvider={handleProvider}
                allProviderData={allProviderData}
              />
            ) : (
              <Providers
                selectedProviders={selectedProviders}
                handleProvider={handleProvider}
                allProviderData={allProviderData}
              />
            )}
            <Duration duration={duration} handleDuration={handleDuration} />
            <NavButton handleSubmit={handleSubmit} buttonText={"Get Movies"} />
            <TheMovieDatabase />
          </View>
        )}
      </View>
    </View>
  );
}

export default SearchPage;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: "100%",
  },
  nav: {
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  locationWrap: {
    position: "absolute",
    top: 0,
    right: 0,
    background: "#ddd",
  },
  submitButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
    borderRadius: 10,
    borderColor: "#FDD782",
    borderWidth: 1,
    backgroundColor: "#FDD782",
    alignSelf: "center",
    fontFamily: Heebo_800ExtraBold,
  },
  introText: {
    fontFamily: Heebo_800ExtraBold,
    color: "rgba(255,255,255,0.6)",
    textAlign: "center",
    fontSize: 12,
    marginBottom: 5,
  },
});
