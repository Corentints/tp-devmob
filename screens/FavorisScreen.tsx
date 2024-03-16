import { useSelector } from 'react-redux';
import { GlobalStoreProps } from '../store/globalStore';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ListItemOffer from '../components/ListItemOffer';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../routes/RootStack';
import Offer from '../models/Offer';
import { useLayoutEffect } from 'react';
import { HeaderBackButton } from '@react-navigation/elements';

type Props = StackScreenProps<RootStackParamList>;

function FavorisScreen({ navigation }: Props) {
  const favoris = useSelector<GlobalStoreProps, Array<Offer>>((state) => state.favori);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton label="Annonces" onPress={() => navigation.navigate('Search')} />
      ),
    });
  }, []);

  const navigateFilmDetails = (offerId: string) => {
    navigation.navigate('Offer', { offerId });
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
          <ListItemOffer offer={item} onClick={() => navigateFilmDetails(item.id)} />
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
    paddingTop: 12,
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
