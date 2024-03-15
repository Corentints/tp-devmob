import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import Movie from "../models/Movie";
import Colors from "../constants/Colors";

type ListItemMovieParams = {
  movie: Movie
  onClick : () => void
}

const ListItemMovie = ({ movie, onClick }: ListItemMovieParams) => {
  return (
    <TouchableOpacity onPress={onClick}>
      <View style={styles.informationContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {movie.title} {movie.voteAverage}
          </Text>
        </View>
        <View>
          <Text style={styles.cuisine}>{movie.releaseDate}</Text>
        </View>
        <View>
          <Text>{movie.overview}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ListItemMovie;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  informationContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
    marginBottom: 10
  },
  titleContainer: {
    flexDirection: 'row',
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  statContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  noThumbnailContainer: {
    width: 128,
    height: 128,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    width: 128,
    height: 128,
    borderRadius: 12,
    backgroundColor: Colors.mainGreen,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  data: {
    fontSize: 16,
  },
  cuisine: {
    fontStyle: 'italic',
  },
  icon: {
    tintColor: Colors.mainGreen,
  },
  stat: {
    marginLeft: 4,
  },
});