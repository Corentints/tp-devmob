import { TextInput } from 'react-native-paper';
import { addOrUpdateFilter } from '../reducers/filterReducer';
import Filter from '../models/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalStoreProps } from '../store/globalStore';

interface NumberFilterProps {
  filter: keyof Filter;
  label: string;
  isNumber?: boolean;
}

function FilterInput({ filter, label, isNumber }: NumberFilterProps) {
  const filters = useSelector<GlobalStoreProps, Filter>((state) => state.filter);

  const dispatch = useDispatch();

  return (
    <TextInput
      label={label}
      value={filters[filter]?.toString() ?? ''}
      keyboardType={isNumber ? 'numeric' : 'default'}
      onChangeText={(text) => {
        if (text === '' || (isNumber && Number.isNaN(parseInt(text)))) {
          dispatch(addOrUpdateFilter({ key: filter, value: null }));
          return;
        }
        dispatch(addOrUpdateFilter({ key: filter, value: isNumber ? parseInt(text) : text }));
      }}
      right={
        <TextInput.Icon
          onPress={() => {
            dispatch(addOrUpdateFilter({ key: filter, value: null }));
          }}
          icon="delete"
        />
      }
    />
  );
}

export default FilterInput;
