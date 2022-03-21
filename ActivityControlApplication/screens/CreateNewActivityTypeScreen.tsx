import { useState } from 'react';
import { Alert, Pressable, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { ActivityTypeModel } from '../models/ActivityTypeModel';
import ActivityTypeDatabaseService from "../services/ActivityTypeDatabaseService";

export default function CreateNewActivityScreen({ navigation }: RootTabScreenProps<'ActivityType'>) {
  const [typeOfActivity, setTypeOfActivity] = useState("");
  const [description, setDescription] = useState("");

  function saveActivityType() {
    let activityType: ActivityTypeModel = new ActivityTypeModel(0, typeOfActivity, description);
    try {
      if (activityType.activityType == "") {
        Alert.alert("O campo tipo de atividade é obrigatório");
      }
      else {
        ActivityTypeDatabaseService.addData(activityType);
        Alert.alert("Sucesso", "Cadastro realizado com sucesso", [
          { text: 'OK', onPress: () => { navigation.navigate("ActivityType") } }
        ]);
      }
    }
    catch (error) {
      console.log(error);
      Alert.alert("Ocorreu um erro ao salvar um novo tipo de atividade")
    }
  }

  return (
    <View style={[styles.container]}>
      <View style={[styles.formContainer]}>
        <View style={[styles.formGroup]}>
          <Text style={[styles.textForms]}>Tipo de Atividade</Text>
          <View style={[styles.shadowComponent]}>
            <TextInput style={[styles.inputComponent]}
              onChangeText={(textValue) => setTypeOfActivity(textValue)}
              value={typeOfActivity}></TextInput>
          </View>
        </View>
        <View style={[styles.formGroup]}>
          <Text style={[styles.textForms]}>Descrição</Text>
          <View style={[styles.shadowComponent]}>
            <TextInput
              style={[styles.inputComponent, styles.textAreaInputComponent]}
              multiline
              onChangeText={(textValue) => setDescription(textValue)}
              value={description}>
            </TextInput>
          </View>
        </View>
        <View style={[styles.actionComponentDirection]}>
          <Pressable style={[styles.actionButton, styles.saveActivityTypeButton, styles.shadowComponent]}
            onPress={() => saveActivityType()}>
            <Text style={styles.buttonText}>
              Salvar
            </Text>
          </Pressable>
          <Pressable style={[styles.actionButton, styles.cancelActivityTypeButton, styles.shadowComponent]}
            onPress={() => navigation.navigate('ActivityType')}>
            <Text style={styles.buttonText}>
              Cancelar
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  textForms: {
    fontSize: 18,
    marginBottom: 5,
  },
  inputComponent: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 5
  },
  textAreaInputComponent: {
    height: 60
  },
  formGroup: {
    marginBottom: 20
  },
  formContainer: {
    marginTop: 10,
    width: '80%'
  },
  shadowComponent: {
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,

    elevation: 8,
  },
  actionComponentDirection: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  actionButton: {
    padding: 10,
    borderRadius: 10,
    width: "30%",
    marginTop: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  saveActivityTypeButton: {
    backgroundColor: "#0085FC",
  },
  cancelActivityTypeButton: {
    backgroundColor: "#E51400",
  },
});