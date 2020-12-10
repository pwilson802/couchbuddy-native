import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from "react-native";
import { API, graphqlOperation } from "aws-amplify";
import { getCouchmovie, getGenre, listMovieLengths } from "../graphql/queries";

async function getMovieDetails(id) {
  const movieDetails = await API.graphql({
    query: getCouchmovie,
    variables: { movieID: id },
  });
  console.log(movieDetails.data.getCouchmovie);
  return movieDetails.data.getCouchmovie;
}

function MovieCard({ id, allProviderData, providers }) {
  const [loaded, setLoaded] = useState(false);
  const [title, setTitle] = useState();
  const [overview, setOverview] = useState();
  const [tagline, setTagline] = useState();
  const [runtime, setRuntime] = useState();
  const [image, setImage] = useState();
  const [providerImages, setProviderImages] = useState([]);
  useEffect(() => {
    async function setMovieCard() {
      const {
        title,
        overview,
        tagline,
        runtime,
        image,
      } = await getMovieDetails(id);
      setTitle(title);
      setOverview(overview.slice(0, 180) + "...");
      setTagline(tagline);
      setRuntime(runtime);
      const imagePath = "http://image.tmdb.org/t/p/w185" + image;
      setImage(imagePath);
      const providerLogos = providers.map(
        (item) => allProviderData[item]["logo"]
      );
      console.log("providerLogos", providerLogos);
      setProviderImages(providerLogos);
      setLoaded(true);
    }
    setMovieCard();
  }, [id]);

  const renderProvider = (item) => {
    console.log("provider path", item);
    return (
      <View>
        <Image style={styles.providerImage} source={item.item} />
      </View>
    );
  };

  return (
    <View>
      {loaded && (
        <View style={styles.cardWrapper}>
          <View style={styles.imageBox}>
            <Image style={styles.mobileImage} source={image} />
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.runtime}>{runtime} minutes</Text>
            <Text style={styles.overview}>{overview}</Text>
            <View style={styles.providerWrapper}>
              <FlatList
                horizontal={true}
                data={providerImages}
                renderItem={renderProvider}
                keyExtractor={(item) => item}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

export default MovieCard;

const styles = StyleSheet.create({
  cardWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    marginTop: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 40,
  },
  mobileImage: {
    width: 92.5,
    height: 139,
  },
  imageBox: {
    padding: 10,
  },
  infoBox: {
    width: "70%",
  },
  title: {
    fontSize: "1.5rem",
  },
  runtime: {
    color: "grey",
    fontStyle: "italic",
  },
  providerImage: {
    width: 40,
    height: 40,
    marginLeft: 3,
    borderRadius: 10,
  },
  overview: {
    paddingBottom: 5,
  },
  providerWrapper: {
    flexDirection: "row",
  },
});
