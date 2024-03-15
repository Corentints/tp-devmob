import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './routes/RootStack';
import { Provider } from 'react-redux';
import globalStore from './store/globalStore';

export default function App() {
  return (
    <View style={styles.container}>
      <Provider store={globalStore}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16
  }
});


