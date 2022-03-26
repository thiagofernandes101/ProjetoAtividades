import { useState, useEffect } from 'react';
import { Alert, Pressable, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import { Text, View } from '../../components/Themed';
import { RootTabScreenProps, RootStackScreenProps } from '../../types';
import { ActivityTypeModel } from '../../models/ActivityTypeModel';
import ActivityTypeDatabaseService from "../../services/ActivityTypeDatabaseService";

export default function EdityActivityType({ navigation, route }: RootStackScreenProps<'ActivityTypeDetails'>) {
    let { itemId } = route.params;

    const [activityTypeId, setActivityTypeId] = useState(itemId);
    const [typeOfActivity, setTypeOfActivity] = useState("");
    const [description, setDescription] = useState("");
    const [reloadActivityTypeScreen, setReloadActivityTypeScreen] = useState(true);

    useEffect(() => {
        useEffectProcessing();
    }, [reloadActivityTypeScreen]);

    async function useEffectProcessing() {
        if (reloadActivityTypeScreen) {
            await loadActivityType();
        }
    }

    async function loadActivityType() {
        let activityTypeModel = await ActivityTypeDatabaseService.findById(itemId);

        if (activityTypeModel != null) {
            setActivityTypeId(activityTypeModel.id);
            setTypeOfActivity(activityTypeModel.activityType);
            setDescription(activityTypeModel.description);
        }
        else {
            Alert.alert('Ocorreu um erro e não foi possível encontrar o tipo de atividade');
        }
    }

    return (
        <View style={[styles.container]}>
            <View style={[styles.formContainer, styles.card, styles.shadowComponent]}>
                <View style={[styles.formGroup]}>
                    <Text style={[styles.textForms]}>Tipo de Atividade</Text>
                    <Text style={[styles.textActivityTypeResult]}>{typeOfActivity}</Text>
                </View>
                <View style={[styles.formGroup]}>
                    <Text style={[styles.textForms]}>Descrição:</Text>
                    <Text style={[styles.textActivityTypeResult]}>{description}</Text>
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
    textActivityTypeResult: {
        fontSize: 18,
        marginBottom: 5,
        fontWeight: 'bold',
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
    card: {
        width: "80%",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
});