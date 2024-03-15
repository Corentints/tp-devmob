import { ReactNode } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface MyButtonProps {
   title: string;
   pressed: (...params: any[]) => void;
   color: string;
   colorPress: string;
}

function MyButton({title, pressed, color, colorPress}: MyButtonProps): ReactNode {
   return (
      <Pressable
         onPress={pressed}
         style={({ pressed }) => [
            { backgroundColor: pressed ? colorPress : color },
            styles.searchButton
         ]}>
         <Text style={styles.textButton}>{title}</Text>
      </Pressable>
   );
}

export default MyButton;

const styles = StyleSheet.create({
   searchButton: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 20,
      elevation: 3,
   },
   textButton: {
      color: 'white',
   }
});