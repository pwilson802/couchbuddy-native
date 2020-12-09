import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { API, graphqlOperation } from "aws-amplify";
import { getCouchmovie, getWatchOn, listProviders } from "../graphql/queries";
import Logo from "./Logo";
import LocationSelect from "./LocationSelect";
import Genres from "./Genres";
import Providers from "./Providers";
import Duration from "./Duration";
import Slider from "@react-native-community/slider";

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

function SearchPage({ handleSearchDetails, setPage }) {
  const [location, setLocation] = useState("AU");
  const [selectedGenres, setSelectedGenres] = useState(genreObj);
  const [selectedProviders, setSelectedProviders] = useState({});
  // move this line below maybe?
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
    // change to page ResultsPage and pass props
    // run calculation on ResultsPage tgo get movies so a spinner can play while waiting
    // maybe pass selected providers with moves for filtering
    // might need to make an object for movies with providers at the end so it can be displayed with each movie.
  };

  useEffect(() => {
    setLoaded(false);
    setSelectedGenres(genreObj);
    configureProviders(location);
  }, [location]);

  //   console.log("selectedProviders", selectedProviders);
  //   console.log("localProviderMovies", localProviderMovies);
  //   console.log("allProviderData", allProviderData);

  return (
    <View>
      <View style={styles.wrapper}>
        <View style={styles.nav}>
          <Logo />
          <LocationSelect handleLocation={handleLocation} location={location} />
        </View>
        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
        {loaded && (
          <View>
            <Genres selectedGenres={selectedGenres} handleGenre={handleGenre} />
            <Providers
              selectedProviders={selectedProviders}
              handleProvider={handleProvider}
              allProviderData={allProviderData}
            />
            <Duration duration={duration} handleDuration={handleDuration} />
            <TouchableOpacity onPress={handleSubmit}>
              <Text>Get Movies</Text>
            </TouchableOpacity>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
