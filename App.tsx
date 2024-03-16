import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './routes/RootStack';
import { Provider } from 'react-redux';
import globalStore from './store/globalStore';
import { PaperProvider } from 'react-native-paper';
import theme from './constants/Theme';

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <Provider store={globalStore}>
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </Provider>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
});
