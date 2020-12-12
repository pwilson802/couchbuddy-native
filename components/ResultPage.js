import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { API, graphqlOperation } from "aws-amplify";
import { getCouchmovie, getGenre, listMovieLengths } from "../graphql/queries";
import Logo from "./Logo";
import MovieCard from "./MovieCard";
import SpinnerMovie from "./SpinnerMovie";
import NavButton from "./NavButton";

async function getMoviesByLength(duration) {
  let firstQuery = await API.graphql({
    query: listMovieLengths,
    limit: 1000,
  });
  let allMovies = firstQuery.data.listMovieLengths.items;
  let nextToken = firstQuery.data.listMovieLengths.nextToken;
  while (nextToken != null) {
    let nextPage = await API.graphql({
      query: listMovieLengths,
      variables: {
        limit: 1000,
        nextToken,
      },
    });
    allMovies = [...allMovies, ...nextPage.data.listMovieLengths.items];
    nextToken = nextPage.data.listMovieLengths.nextToken;
  }
  const moviesUnderDuration = allMovies
    .filter((item) => item.runtime < duration)
    .map((item) => Number(item.movieID));
  return moviesUnderDuration;
}

async function getMoviesByGenre(genre) {
  const movies = await API.graphql({
    query: getGenre,
    variables: { genre: genre },
  });
  const moviesList = JSON.parse(movies.data.getGenre.movieIDs);
  return moviesList;
}

async function getMovieIDsforGenres(genres) {
  let result = [];
  for (let i = 0; i < genres.length; i++) {
    let movies = await getMoviesByGenre(genres[i]);
    result = [...result, ...movies];
  }
  return result;
}

function reduceShuffleMovies(movies) {
  shuffle(movies);
  return movies.slice(0, 99);
}

function ResultsPage({ searchDetails, setPage, width, screenSize }) {
  const [loaded, setLoaded] = useState(false);
  const [movies, setMovies] = useState([]);
  const [activeMovies, setActiveMovies] = useState([]);
  const [movieNumber, setMovieNumber] = useState(3);
  const {
    allProviderData,
    selectedGenres,
    selectedProviders,
    duration,
  } = searchDetails;
  console.log(selectedProviders);

  function getProviders(id) {
    return Object.keys(selectedProviders).filter((item) =>
      selectedProviders[item].includes(id)
    );
  }

  useEffect(() => {
    const genres = Object.keys(selectedGenres).filter(
      (item) => selectedGenres[item]
    );
    async function updateMovies() {
      const moviesByLength = await getMoviesByLength(duration);
      const matchedMoviesByGenre = await getMovieIDsforGenres(genres);
      const matchedMoviesbyProvider = Object.values(selectedProviders).flat();
      const moviesInProvider = matchedMoviesByGenre.filter((movie) =>
        matchedMoviesbyProvider.includes(movie)
      );
      console.log("moviesInProvider", moviesInProvider);
      console.log("moviesByLength", moviesByLength);
      const moviesInLength = moviesByLength.filter((item) =>
        moviesInProvider.includes(item)
      );
      console.log(moviesInLength);
      const result = reduceShuffleMovies(moviesInLength).reduce((acc, curr) => {
        let providers = getProviders(curr);
        acc.push({ id: curr, providers: providers });
        return acc;
      }, []);
      console.log("result", result);
      setMovies(result);
      setActiveMovies(result.slice(0, 3));
      setLoaded(true);
    }
    updateMovies();
  }, []);

  function nextMovies() {
    if (movieNumber > movies.length) {
      // show an end page screen
      return;
    }
    setActiveMovies(movies.slice(movieNumber, movieNumber + 3));
    setMovieNumber(movieNumber + 3);
  }

  const renderMovieCard = ({ item }) => {
    return (
      <MovieCard
        id={item.id}
        providers={item.providers}
        allProviderData={allProviderData}
        screenSize={screenSize}
      ></MovieCard>
    );
  };

  return (
    <View>
      {loaded ? (
        <View>
          <TouchableOpacity onPress={() => setPage("SearchPage")}>
            <Logo />
          </TouchableOpacity>
          <FlatList
            data={activeMovies}
            renderItem={renderMovieCard}
            keyExtractor={(item) => item}
          />
          <View style={styles.buttonBox}>
            <View>
              <NavButton handleSubmit={nextMovies} buttonText={"More"} />
            </View>
            {/* <View style={styles.secondButton}>
              <NavButton
                handleSubmit={() => setPage("SearchPage")}
                buttonText={"Home"}
              />
            </View> */}
          </View>
        </View>
      ) : (
        <SpinnerMovie />
      )}
    </View>
  );
}

export default ResultsPage;

const styles = StyleSheet.create({
  buttonBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 20,
    borderRadius: 10,
    borderColor: "#D90404",
    borderWidth: 1,
    backgroundColor: "#D90404",
    marginLeft: 20,
  },
  secondButton: {
    marginLeft: 20,
  },
});

function shuffle(data) {
  // shuffle the questions using Fisher-Yates Algorithm
  for (let i = data.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = data[i];
    data[i] = data[j];
    data[j] = temp;
  }
  return data;
}
