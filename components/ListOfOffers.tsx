import { ReactNode } from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import ListItemOffer from './ListItemOffer';
import DisplayError from './DisplayError';
import Offer from '../models/Offer';

interface ListOfOffersProps {
  navigateFilmDetails: (offerId: string) => void;
  offers: Array<Offer>;
  isLoading: boolean;
  isError: boolean;
}

function ListOfOffers({
  navigateFilmDetails,
  offers,
  isLoading,
  isError,
}: ListOfOffersProps): ReactNode {
  if (isLoading) return <Text>Chargement en cours ...</Text>;

  return (
    <View style={styles.container}>
      {isError ? (
        <DisplayError message="Impossible de récupérer les films" />
      ) : (
        <FlatList
          data={offers}
          renderItem={({ item }) => (
            <ListItemOffer offer={item} onClick={() => navigateFilmDetails(item.id)} />
          )}
        />
      )}
    </View>
  );
}

export default ListOfOffers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
