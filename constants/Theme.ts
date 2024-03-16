import { DefaultTheme } from 'react-native-paper';
import Colors from './Colors';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.mainGreen,
  },
};

export default theme;
