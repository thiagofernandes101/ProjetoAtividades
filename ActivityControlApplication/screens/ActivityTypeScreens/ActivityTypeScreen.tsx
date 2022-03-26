import { StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import { Text, View } from '../..//components/Themed';
import { RootTabScreenProps } from '../..//types';
import { FontAwesome } from '@expo/vector-icons';

import { ActivityTypeModel } from '../../models/ActivityTypeModel';
import ActivityTypeDatabaseService from "../../services/ActivityTypeDatabaseService";
import { useEffect, useState } from 'react';
import { activityTypeController } from '../../controllers/ActivityTypeController';

export default function ActivityTypeScreen({ navigation }: RootTabScreenProps<'ActivityType'>) {
  let activitiesTypesInitialState: ActivityTypeModel[] = [];

  const [activitiesTypes, setActivitiesTypes] = useState(activitiesTypesInitialState);
  const [reloadActivityTypeScreen, setReloadActivityTypeScreen] = useState(true);
  const [createTable, setCreateTable] = useState(false);

  useEffect(() => {
    navigation.addListener('focus', () => setReloadActivityTypeScreen(!reloadActivityTypeScreen));
    useEffectProcessing();
  }, [reloadActivityTypeScreen]);

  async function useEffectProcessing() {
    if (reloadActivityTypeScreen) {
      await loadActivitiesTypes();
    }
  }

  async function loadActivitiesTypes() {
    try {
      let activityType = await activityTypeController.findAllActivitiesTypes();
      setActivitiesTypes(activityType);
      setReloadActivityTypeScreen(false);
    }
    catch (error) {
      console.log(error);
      Alert.alert("Erro", "Ocorreu um erro ao carregar os tipos de atividades. Verifique o log");
    }
  }

  async function RemoveActivityType(id: number) {
    Alert.alert("Atenção", "Deseja excluir o registro?",
      [
        {
          text: 'Sim',
          onPress: () => {
            activityTypeController.deleteActivityType(id);
            setReloadActivityTypeScreen(true);
          },
        },
        {
          text: 'Não',
          style: 'cancel'
        }
      ])
  }

  return (
    <View style={styles.container}>
      <Pressable style={[styles.newActivityTypeButton, styles.shadowComponent]}
        onPress={() => navigation.navigate("CreateNewActivityType")}>
        <Text style={styles.buttonText}>Novo Tipo de Atividade</Text>
      </Pressable>

      <View style={styles.container}>
        <ScrollView style={[styles.scrollWholeScreenWidth]}>
          {
            activitiesTypes.map((activityType, index) => (
              <View style={[styles.card, styles.shadowComponent]} key={index.toString()}>
                <Text style={styles.activityTypeMainText}>{activityType.activityType}</Text>
                <Text style={styles.activityTypeDescriptionText}>{activityType.description}</Text>

                <View style={[styles.cardActionComponentDirection]}>
                  <Pressable style={[styles.cardActionButton, styles.editActivityTypeButton, styles.shadowComponent]}
                    onPress={() => navigation.navigate('EdityActivityType', { itemId: activityType.id })}>
                    <Text style={styles.buttonText}>
                      <FontAwesome name="edit" size={20} color="#FFFFFF" />
                    </Text>
                  </Pressable>
                  <Pressable style={[styles.cardActionButton, styles.deleteActivityTypeButton, styles.shadowComponent]}
                    onPress={() => RemoveActivityType(activityType.id)}>
                    <Text style={styles.buttonText}>
                      <FontAwesome name="remove" size={20} color="#FFFFFF" />
                    </Text>
                  </Pressable>
                  <Pressable style={[styles.cardActionButton, styles.infoActivityTypeButton, styles.shadowComponent]}
                    onPress={() => navigation.navigate('ActivityTypeDetails', { itemId: activityType.id })}>
                    <Text style={styles.buttonText}>
                      <FontAwesome name="info-circle" size={20} color="#FFFFFF" />
                    </Text>
                  </Pressable>
                </View>
              </View>
            ))
          }
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
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
  card: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  cardActionComponentDirection: {
    flexDirection: "row"
  },
  cardActionButton: {
    padding: 10,
    borderRadius: 10,
    width: "15%",
    marginTop: 10,
  },
  editActivityTypeButton: {
    backgroundColor: "#0085FC",
  },
  deleteActivityTypeButton: {
    backgroundColor: "#E51400",
    marginLeft: 10
  },
  infoActivityTypeButton: {
    backgroundColor: "#1CA5B8",
    marginLeft: 10
  },
  activityTypeMainText: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 18
  },
  activityTypeDescriptionText: {
    marginBottom: 5
  },
  scrollWholeScreenWidth: {
    width: "80%",
  }
});
