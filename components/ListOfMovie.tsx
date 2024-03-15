import { ReactNode, useEffect, useState } from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";
import ListItemMovie from "./ListItemMovie";
import Movie from "../models/Movie";
import DisplayError from "./DisplayError";
import { getMovies } from "../services/MovieService";

interface ListOfMovieProps {
  navigateFilmDetails: (id: number) => void
}

function ListOfMovie({navigateFilmDetails}: ListOfMovieProps): ReactNode {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [movies, setMovies] = useState<Array<Movie>>([]);

  async function fetchMovie(): Promise<void> {
    try {
      const movies = await getMovies();
      setMovies(movies);
      setIsLoading(false);
    } catch (error) {
      // TODO error handling
      setIsError(true)
    }
  }
  
  useEffect(() => {
    void fetchMovie()
  }, [])

  if(isLoading)
    return <Text>Chargement en cours ...</Text>

  return (
    <View style={styles.container}>
      {
        isError ?
          (<DisplayError message='Impossible de récupérer les films' />) :
          (<FlatList
            data={movies}
            renderItem={({ item }) => (
              <ListItemMovie
                movie={item}
                onClick={() => navigateFilmDetails(item.id)}
              />
            )}
          />)
      }
    </View>
  );
}

export default ListOfMovie;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
