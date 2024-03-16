import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../routes/RootStack';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
        <Text style={{ fontSize: 24, fontWeight: '600' }}>
          {offer.carMake} {offer.carModel}
        </Text>
      </View>
      <View style={styles.rowTwo}>
        <Text style={styles.setionTitle}>Information :</Text>
        <Text style={{ fontSize: 14 }}>Prix : {offer.price}</Text>
        <Text style={{ fontSize: 14 }}>Année de fabrication : {offer.carModelYear}</Text>

        <Text style={styles.setionTitle}>Vendeur :</Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 15,
          }}
        >
          <Avatar.Image
            source={{ uri: offer.avatar }}
            size={50}
            style={{
              backgroundColor: Colors.background,
              borderColor: Colors.mainGreen,
              borderWidth: 2,
              justifyContent: 'center',
            }}
          />
          <View>
            <Text style={{ fontSize: 14 }}>{offer.saler}</Text>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
              <Text style={{ fontSize: 10 }}>Pays: {offer.country}</Text>
              <Text style={{ fontSize: 10 }}>Ville: {offer.city}</Text>
              <Text style={{ fontSize: 10 }}>Tel. {offer.phone}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.setionTitle}>Description :</Text>
        <Text style={{ fontSize: 14 }}>{offer.description}</Text>
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
  rowThree: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
