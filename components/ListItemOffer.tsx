import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import Offer from '../models/Offer';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalStoreProps } from '../store/globalStore';
import { IconButton } from 'react-native-paper';
import { addFavori, removeFavori } from '../reducers/offerReducer';

type ListItemOfferParams = {
  offer: Offer;
  onClick: () => void;
};

const ListItemOffer = ({ offer, onClick }: ListItemOfferParams) => {
  const favoris = useSelector<GlobalStoreProps, Array<Offer>>((state) => state.favori);
  const isOfferInFavoris = favoris.some((favori) => favori.id === offer.id);

  const dispatch = useDispatch();

  return (
    <TouchableOpacity onPress={onClick}>
      <View style={styles.informationContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {offer.carMake} {offer.carModel}
          </Text>

          <IconButton
            style={{ position: 'absolute', right: 0 }}
            icon={isOfferInFavoris ? 'heart' : 'heart-outline'}
            iconColor={Colors.mainGreen}
            size={20}
            onPress={() => {
              if (isOfferInFavoris) {
                dispatch(removeFavori(offer));
              } else {
                dispatch(addFavori(offer));
              }
            }}
          />
        </View>
        <View>
          <Text style={styles.cuisine}>
            {offer.carModelYear} - {offer.price}
          </Text>
        </View>
        <View>
          <Text>{offer.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListItemOffer;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  informationContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 10,
  },
  titleContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  statContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  noThumbnailContainer: {
    width: 128,
    height: 128,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    width: 128,
    height: 128,
    borderRadius: 12,
    backgroundColor: Colors.mainGreen,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  data: {
    fontSize: 16,
  },
  cuisine: {
    fontStyle: 'italic',
  },
  icon: {
    tintColor: Colors.mainGreen,
  },
  stat: {
    marginLeft: 4,
  },
});
