import { Button, Modal, Portal } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';
import FilterInput from './FilterInput';
import { useDispatch } from 'react-redux';
import { clearFilters } from '../reducers/filterReducer';

interface FiltersModalProps {
  filtersOpened: boolean;
  onDismiss: () => void;
}

function filtersModal({ filtersOpened, onDismiss }: FiltersModalProps) {
  const dispatch = useDispatch();
  return (
    <Portal>
      <Modal
        visible={filtersOpened}
        onDismiss={onDismiss}
        style={styles.modalContainer}
        contentContainerStyle={styles.container}
      >
        <Text style={{ fontSize: 20 }}>Filtres</Text>
        <View style={{ gap: 10, marginTop: 20 }}>
          <FilterInput filter={'carModelYear'} label={'Année'} isNumber />
          <FilterInput filter={'minPrice'} label={'Prix minimum'} isNumber />
          <FilterInput filter={'maxPrice'} label={'Prix maximum'} isNumber />
          <FilterInput filter={'country'} label={'Pays'} />
          <FilterInput filter={'city'} label={'Ville'} />
          <FilterInput filter={'description'} label={'Description contient...'} />
          <View style={styles.actionsContainer}>
            <Button
              onPress={() => {
                dispatch(clearFilters());
                onDismiss();
              }}
              buttonColor={Colors.danger}
              textColor={Colors.background}
            >
              Réinitialiser
            </Button>
            <Button onPress={onDismiss}>Fermer</Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  container: {
    width: '80%',
    borderRadius: 10,
    backgroundColor: Colors.background,
    padding: 20,
  },
  actionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default filtersModal;
