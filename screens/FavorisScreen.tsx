import { useSelector } from 'react-redux';
import { GlobalStoreProps } from '../store/globalStore';
import Movie from '../models/Movie';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ListItemMovie from '../components/ListItemMovie';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../routes/RootStack';

type Props = StackScreenProps<RootStackParamList>;

function FavorisScreen({ navigation }: Props) {
  const favoris = useSelector<GlobalStoreProps, Array<Movie>>((state) => state.favori);

  const navigateFilmDetails = (id: number) => {
    navigation.navigate('Movie', { movieId: id });
  };

  if (favoris.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Vous ne possèdez aucun favoris</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={favoris}
        renderItem={({ item }) => (
          <ListItemMovie movie={item} onClick={() => navigateFilmDetails(item.id)} />
        )}
      />
    </View>
  );
}

export default FavorisScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowOne: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  rowTwo: {
    flex: 4,
  },
  rowThree: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
