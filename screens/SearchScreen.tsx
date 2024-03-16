import { View, StyleSheet, Text } from 'react-native';
import ListOfOffers from '../components/ListOfOffers';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../routes/RootStack';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalStoreProps } from '../store/globalStore';
import Offer from '../models/Offer';
import { getOffers } from '../services/OfferService';
import { useEffect, useState } from 'react';
import { Button, IconButton, Searchbar } from 'react-native-paper';
import Colors from '../constants/Colors';
import FiltersModal from '../components/FiltersModal';
import Filter from '../models/Filter';
import { addOrUpdateFilter } from '../reducers/filterReducer';

type Props = StackScreenProps<RootStackParamList>;

function SearchScreen({ navigation }: Props) {
  const favoris = useSelector<GlobalStoreProps, Array<Offer>>((state) => state.favori);
  const filter = useSelector<GlobalStoreProps, Filter>((state) => state.filter);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [offers, setOffers] = useState<Array<Offer>>([]);
  const [filtersOpened, setFiltersOpened] = useState<boolean>(false);
  const dispatch = useDispatch();

  const navigateFilmDetails = (offerId: string) => {
    navigation.navigate('Offer', { offerId });
  };

  function hideFiltersModal() {
    setFiltersOpened(false);
  }

  async function fetchOffers(): Promise<void> {
    try {
      const offers = await getOffers(filter);
      setOffers(offers);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  }

  useEffect(() => {
    void fetchOffers();
  }, [filter]);

  function getFiltersCount(): number {
    return Object.keys(filter).reduce((acc, key) => {
      if (filter[key as keyof Filter]) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }

  return (
    <View style={styles.container}>
      <View style={styles.rowOne}>
        <Button
          onPress={() => {
            navigation.navigate('Favoris');
          }}
          mode="contained"
        >
          Mes favoris : {favoris.length}
        </Button>
      </View>
      <View style={styles.rowTwo}>
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Rechercher"
            value={filter.query ?? ''}
            onChangeText={(text) => {
              dispatch(addOrUpdateFilter({ key: 'query', value: text }));
            }}
            autoCapitalize="none"
            style={styles.searchBar}
          />
          <View style={{ position: 'relative' }}>
            <IconButton
              onPress={() => {
                setFiltersOpened(!filtersOpened);
              }}
              mode="contained"
              icon={'filter'}
              style={{ backgroundColor: Colors.background }}
              iconColor={Colors.mainGreen}
            />
            <View style={styles.countContainer}>
              <Text style={styles.countText}>{getFiltersCount()}</Text>
            </View>
          </View>
          <FiltersModal filtersOpened={filtersOpened} onDismiss={hideFiltersModal} />
        </View>
        <Text style={styles.offersLength}>
          Nombre d&apos;annonce : <Text style={styles.offersCount}>{offers.length}</Text>
        </Text>
        <ListOfOffers
          offers={offers}
          isLoading={isLoading}
          isError={isError}
          navigateFilmDetails={navigateFilmDetails}
        />
      </View>
    </View>
  );
}

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    marginHorizontal: 8,
  },
  offersLength: {
    marginVertical: 12,
  },
  offersCount: {
    fontWeight: 'bold',
    color: Colors.mainGreen,
  },
  rowOne: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowTwo: {
    flex: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  countContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: 50,
    backgroundColor: Colors.mainGreen,
    padding: 5,
  },
  searchBar: {
    backgroundColor: Colors.lightGrey,
    flex: 1,
  },
  countText: {
    color: Colors.background,
    fontSize: 10,
    fontWeight: 'bold',
  },
});
