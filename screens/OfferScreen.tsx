import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../routes/RootStack';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalStoreProps } from '../store/globalStore';
import DisplayError from '../components/DisplayError';
import { getOfferById } from '../services/OfferService';
import Offer from '../models/Offer';
import { Avatar, Button } from 'react-native-paper';
import Colors from '../constants/Colors';
import { addFavori, removeFavori } from '../reducers/offerReducer';

type OfferScreenParams = NonNullable<unknown>;

type OfferScreenProps = OfferScreenParams & StackScreenProps<RootStackParamList, 'Offer'>;

function OfferScreen({ route, navigation }: OfferScreenProps) {
  const favoris = useSelector<GlobalStoreProps, Array<Offer>>((state) => state.favori);
  const [offer, setOffer] = useState<Offer>();
  const [, setIsLoading] = useState<boolean>(true);
  const [, setOnError] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    async function getOffer(): Promise<void> {
      try {
        const offer = await getOfferById(route.params.offerId);
        if (offer == null) {
          throw new Error('404 not found');
        }
        setOffer(offer);
      } catch (e) {
        setOnError(true);
      }
      setIsLoading(false);
    }

    void getOffer();
  }, []);

  if (offer == null) {
    return <DisplayError message={'Erreur dans le chargment du film'}></DisplayError>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.rowOne}>
        <Text style={styles.title}>
          {offer.carMake} {offer.carModel}
        </Text>
      </View>
      <View style={styles.rowTwo}>
        <Text style={styles.setionTitle}>Information :</Text>
        <Text>Prix : {offer.price}</Text>
        <Text>Année de fabrication : {offer.carModelYear}</Text>

        <Text style={styles.setionTitle}>Vendeur :</Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 15,
          }}
        >
          <Avatar.Image source={{ uri: offer.avatar }} size={50} style={styles.avatar} />
          <View>
            <Text>{offer.saler}</Text>
            <View style={styles.salerInfosContainer}>
              <Text style={styles.smallText}>Pays: {offer.country}</Text>
              <Text style={styles.smallText}>Ville: {offer.city}</Text>
              <Text style={styles.smallText}>Tel. {offer.phone}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.setionTitle}>Description :</Text>
        <Text>{offer.description}</Text>
      </View>
      <View style={styles.rowThree}>
        {favoris.find((m) => m.id === offer?.id) == null ? (
          <Button
            onPress={() => {
              dispatch(addFavori(offer));
              navigation.navigate('Favoris');
            }}
            mode="contained"
          >
            Ajouter au favoris
          </Button>
        ) : (
          <Button onPress={() => dispatch(removeFavori(offer))} mode="contained">
            Supprimer des favoris
          </Button>
        )}
      </View>
    </View>
  );
}

export default OfferScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  baseText: {
    fontSize: 14,
  },
  smallText: {
    fontSize: 10,
  },
  setionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 24,
  },
  rowOne: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  rowTwo: {
    flex: 4,
  },
  avatar: {
    backgroundColor: Colors.background,
    borderColor: Colors.mainGreen,
    borderWidth: 2,
    justifyContent: 'center',
  },
  rowThree: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  salerInfosContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
  },
});
