import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../routes/RootStack";
import Movie from "../models/Movie";
import { useEffect, useState } from "react";
import { getMovieById } from "../services/MovieService";
import { View, Text, StyleSheet } from "react-native";
import MyButton from "../components/Atoms/MyButton";
import { useDispatch, useSelector } from "react-redux";
import { GlobalStoreProps } from "../store/globalStore";
import { addFavori, removeFavori } from "../reducers/favoriReducer";
import DisplayError from "../components/DisplayError";

type MovieScreenParams = {}

type MovieScreenProps = MovieScreenParams & StackScreenProps<RootStackParamList, 'Movie'>

function MovieScreen({ navigation, route }: MovieScreenProps) {
   const favoris = useSelector<GlobalStoreProps, Array<Movie>>((state) => state.favori);
   const [movie, setMovie] = useState<Movie>();
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [onError, setOnError] = useState<boolean>(false);

   const dispatch = useDispatch();

   useEffect(() => {
      async function getMovie(): Promise<void> {
         try {
            const movie = await getMovieById(route.params.movieId);
            if (movie == null) {
               throw new Error("404 not found")
            }
            setMovie(movie);
         } catch (e) {
            setOnError(true);
         }
         setIsLoading(false);
      }
      void getMovie();
   }, []);

   if(movie == null) {
      return <DisplayError message={"Erreur dans le chargment du film"}></DisplayError>
   }

   return (
      <View style={styles.container}>
         <View style={styles.rowOne}>
            <Text style={{ fontSize: 24, fontWeight: "600" }}>{movie?.title}</Text>
         </View>
         <View style={styles.rowTwo}>
            <Text style={{ fontSize: 12 }}>More and more details ... .</Text>
         </View>
         <View style={styles.rowThree}>
            {favoris.find(m => m.id === movie?.id) == null ?
               (
                  <MyButton title={"Ajouter au favoris"} pressed={() => dispatch(addFavori(movie))} color={'#43A047'} colorPress={'#2E7D32'} />
               ) : (
                  <MyButton title={"Supprimer des favoris"} pressed={() => dispatch(removeFavori(movie))} color={'#43A047'} colorPress={'#2E7D32'} />
               )}
         </View>
      </View>
   );
}

export default MovieScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   rowOne: {
      flex: 2,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row"
   },
   rowTwo: {
      flex: 4,
   },
   rowThree: {
      flex: 4,
      justifyContent: "center",
      alignItems: "center",
   }
});
