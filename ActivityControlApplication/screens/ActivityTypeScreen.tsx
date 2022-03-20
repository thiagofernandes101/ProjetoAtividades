import { StyleSheet, Pressable } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import ResultActivityType from '../components/ResultActivityType';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function ActivityTypeScreen({ navigation }: RootTabScreenProps<'Activity'>) {
  return (
    <View style={styles.container}>
      <Pressable style={[styles.newActivityTypeButton, styles.shadowComponent]}
        onPress={() => navigation.navigate("CreateNewActivityType")}>
        <Text style={styles.buttonText}>Novo Tipo de Atividade</Text>
      </Pressable>

      <ResultActivityType path='/screens/ActivityTypeScreen.tsx'></ResultActivityType>
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
  newActivityTypeButton: {
    backgroundColor: "#0085FC",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    marginTop: 15,
    width: "80%"
  },
  shadowComponent: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,

    elevation: 8,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
