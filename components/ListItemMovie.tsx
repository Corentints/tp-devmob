import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import Offer from '../models/Offer';

type ListItemMovieParams = {
  offer: Offer;
  onClick: () => void;
};

const ListItemMovie = ({ offer, onClick }: ListItemMovieParams) => {
  return (
    <TouchableOpacity onPress={onClick}>
      <View style={styles.informationContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {offer.carMake} {offer.carModel}
          </Text>
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

export default ListItemMovie;

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
    flexDirection: 'row',
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
