import { ReactNode } from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import ListItemMovie from './ListItemMovie';
import DisplayError from './DisplayError';
import Offer from '../models/Offer';

interface ListOfMovieProps {
  navigateFilmDetails: (offerId: string) => void;
  offers: Array<Offer>;
  isLoading: boolean;
  isError: boolean;
}

function ListOfMovie({
  navigateFilmDetails,
  offers,
  isLoading,
  isError,
}: ListOfMovieProps): ReactNode {
  if (isLoading) return <Text>Chargement en cours ...</Text>;

  return (
    <View style={styles.container}>
      {isError ? (
        <DisplayError message="Impossible de récupérer les films" />
      ) : (
        <FlatList
          data={offers}
          renderItem={({ item }) => (
            <ListItemMovie offer={item} onClick={() => navigateFilmDetails(item.id)} />
          )}
        />
      )}
    </View>
  );
}

export default ListOfMovie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
