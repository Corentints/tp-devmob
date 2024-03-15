import { View, StyleSheet } from "react-native";
import ListOfMovie from "../components/ListOfMovie";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../routes/RootStack";
import MyButton from "../components/Atoms/MyButton";
import { useSelector } from "react-redux";
import { GlobalStoreProps } from "../store/globalStore";
import Movie from "../models/Movie";

type Props =  StackScreenProps<RootStackParamList>;

function SearchScreen({ navigation }: Props) {

   const favoris = useSelector<GlobalStoreProps, Array<Movie>>((state) => state.favori);

   const navigateFilmDetails = (id: number) => {
      navigation.navigate("Movie", {movieId: id});
    };

   return (
      <View style={styles.container}>
         <View style={styles.rowOne}>
            <MyButton title={`Mes favoris : ${favoris.length}`} pressed={() => {navigation.navigate('Favoris')}} color={'#43A047'} colorPress={'#2E7D32'} />
         </View>
         <View style={styles.rowTwo}>
            <ListOfMovie navigateFilmDetails={navigateFilmDetails} />
         </View>
      </View>
   );
}

export default SearchScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      marginTop: 8
   },
   rowOne: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
   rowTwo: {
      flex: 10,
   },
});
