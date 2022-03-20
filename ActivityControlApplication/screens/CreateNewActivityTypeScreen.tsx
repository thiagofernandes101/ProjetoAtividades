import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import CreateActivityType from '../components/CreateEditActivityType';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function CreateNewActivityScreen({ navigation }: RootTabScreenProps<'Activity'>) {
  return (
    <View style={styles.container}>
      <CreateActivityType path='/screens/CreateNewActivityTypeScreen.tsx'></CreateActivityType>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});