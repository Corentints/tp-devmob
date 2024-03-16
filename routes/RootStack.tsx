import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from '../screens/SearchScreen';
import MovieScreen from '../screens/MovieScreen';
import FavorisScreen from '../screens/FavorisScreen';

export type RootStackParamList = {
  Search: undefined;
  Offer: { offerId: string };
  Favoris: undefined;
};

const SearchNavigation = createStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <SearchNavigation.Navigator
      initialRouteName="Search"
      screenOptions={{ cardStyle: { backgroundColor: '#fff' } }}
    >
      <SearchNavigation.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: 'Liste des annonces' }}
      />
      <SearchNavigation.Screen
        name="Offer"
        component={MovieScreen}
        options={{ title: 'Annonce' }}
      />
      <SearchNavigation.Screen
        name="Favoris"
        component={FavorisScreen}
        options={{ title: 'Mes Favoris' }}
      />
    </SearchNavigation.Navigator>
  );
}

export default RootStack;
