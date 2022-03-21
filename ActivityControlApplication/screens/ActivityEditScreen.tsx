import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Picker, Alert, Keyboard, Platform, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps, RootStackScreenProps } from '../types';
import ActivityDatabaseService from "../services/ActivityDatabaseService";
import ActivityTypeDatabaseService from "../services/ActivityTypeDatabaseService";
import { ActivityModel } from '../models/ActivityModel';
import { ActivityTypeModel } from '../models/ActivityTypeModel';

export default function CreateScreen({ navigation, route }: RootStackScreenProps<'ActivityEdit'>) {
    let activitiesTypesInitialState: ActivityTypeModel[] = [];
    let { itemId } = route.params;

    const [id, setId] = useState("");
    const [descricao, setDescricao] = useState("");
    const [local, setLocal] = useState("");
    const [tipoAtividade, setTipoAtividade] = useState("");
    const [data, setData] = useState("");
    const [hora, setHora] = useState("");
    const [statusAtividade, setStatusAtividade] = useState("");
    const [selectedValue, setSelectedValue] = useState("0");

    const [activitiesTypes, setActivitiesTypes] = useState(activitiesTypesInitialState);
    const [recarregaTela, setRecarregaTela] = useState(true);

    useEffect(
        () => {
            console.log('executando useffect');
            navigation.addListener('focus', () => setRecarregaTela(!recarregaTela));
            processamentoUseEffect(); //necessário método pois aqui não pode utilizar await...
        }, [recarregaTela]);

    async function processamentoUseEffect() {
        if (recarregaTela) {
            await loadActivitiesTypesForDropbox();
        }
    }

    async function loadActivitiesTypesForDropbox() {
        let activitiesTypes = await ActivityTypeDatabaseService.findAll();
        if (activitiesTypes != null) {
            setActivitiesTypes(activitiesTypes)
        }
        else {
            Alert.alert("Error", "Verifique as atividades cadastradas", [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate("ActivityType"),
                },
                {
                    text: 'Cancelar',
                    style: 'cancel',
                }
            ])
        }
    }

    async function salvaDados() {
        let activityModel: ActivityModel = new ActivityModel(parseInt(id), descricao, tipoAtividade, local, data, hora, parseInt(statusAtividade))
        try {
            console.log(activityModel);
            await ActivityDatabaseService.updateActivity(activityModel);
            Alert.alert('Registro Adicionado!');
        } catch (e) {
            console.log(e);
            Alert.alert("Ocorreu um erro ao salvar uma nova atividade")
        }
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.cadastroAtividade}>
                    <View style={styles.campo}>
                        <Text style={styles.texto}>Descrição</Text>
                        <TextInput
                            style={styles.campoEdicao}
                            onChangeText={(texto) => setDescricao(texto)}
                            value={descricao}
                        />
                    </View>
                    <View style={styles.campo}>
                        <Text style={styles.texto}>Tipo de Atividade</Text>
                        <Picker
                            selectedValue={tipoAtividade}
                            style={styles.dropDown}
                            onValueChange={(itemValue: any, itemIndex) => setTipoAtividade(itemValue)}>
                            {
                                activitiesTypes.map((activityType, index) => (
                                    <Picker.Item label={activityType.activityType} value={activityType.id.toString()} key={index.toString()} />
                                ))
                            }
                            {/* <Picker.Item label="N1" value="1" />
                            <Picker.Item label="N2" value="2" /> */}
                        </Picker>
                    </View>
                    <View style={styles.campo}>
                        <Text style={styles.texto}>Local da Atividade</Text>
                        <Picker
                            selectedValue={local}
                            style={styles.dropDown}
                            onValueChange={(itemValue: any, itemIndex2) => setLocal(itemValue)}
                        >
                            <Picker.Item label="Selecione o Local da Atividade" value="0" />
                            <Picker.Item label="Sala" value="1" />
                            <Picker.Item label="Laboratório" value="2" />
                        </Picker>
                    </View>
                    <View style={styles.campo}>
                        <Text style={styles.texto}>Data de Entrega</Text>
                        <TextInput
                            style={styles.campoData}
                            onChangeText={(texto) => setData(texto)}
                            value={data}
                        />
                    </View>

                    <View style={styles.campo}>
                        <Text style={styles.texto}>Status</Text>
                        <Picker
                            selectedValue={statusAtividade}
                            style={styles.dropDown}
                            onValueChange={(itemValue: any, itemIndex) => setStatusAtividade(itemValue)}
                        >
                            <Picker.Item label="Selecione o Status da Atividade" value="0" />
                            <Picker.Item label="Pendente" value="1" />
                            <Picker.Item label="Concluído" value="2" />
                        </Picker>
                    </View>


                    <View style={styles.areaBotoes}>
                        <TouchableOpacity style={styles.botaoSalvar}
                            onPress={() => salvaDados()}>
                            <Text style={styles.legendaCadastro}>Salvar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.botaoCancelar}
                            onPress={() => navigation.navigate('Activity')}>
                            <Text style={styles.legendaCadastro}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //marginTop: 10
    },
    texto: {
        paddingHorizontal: 10,
    },
    title: {
        textAlignVertical: "center",
        fontSize: 20,
        fontWeight: 'bold',
        //backgroundColor: "yellow",
        borderRadius: 10,
        borderWidth: 2,
        marginBottom: 10,
        textAlign: 'center',
        width: "90%",
        height: 50
    },
    cadastroAtividade: {
        width: "80%"
    },
    campo: {
        //marginBottom: 30,
        marginTop: 20,
        paddingHorizontal: 10
    },
    dropDown: {
        height: 50,
        borderWidth: 1,
        fontSize: 20,
        //backgroundColor: 'black',
        paddingHorizontal: 10,
        width: "100%",
        textAlignVertical: "center",
        fontWeight: 'bold',
        borderRadius: 10,
        //marginBottom: 30,
        marginTop: 10,
        textAlign: 'center',
        alignSelf: 'center',
    },
    campoData: {
        height: 50,
        borderWidth: 1,
        fontSize: 20,
        //backgroundColor: 'black',
        paddingHorizontal: 10,
        width: "100%",
        textAlignVertical: "center",
        fontWeight: 'bold',
        borderRadius: 10,
        //marginBottom: 30,
        marginTop: 10,
        textAlign: 'center',
        alignSelf: 'center',
    },
    campoEdicao: {
        height: 50,
        borderWidth: 1,
        fontSize: 20,
        //backgroundColor: 'black',
        paddingHorizontal: 10,
        width: "100%",
        textAlignVertical: "center",
        fontWeight: 'bold',
        borderRadius: 10,
        //marginBottom: 30,
        marginTop: 10,
        textAlign: 'center',
        alignSelf: 'center',
        //color: "white",
    },

    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    legendaCadastro: {
        fontWeight: 'bold',
        fontSize: 20,
        color: "white",
    },
    areaBotoes: {
        marginTop: 10,
        marginBottom: 10,
        width: '90%',
        justifyContent: 'space-around',
        flexDirection: 'row',
        //borderWidth: 2,
        //borderRadius: 10,
        //justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'

    },
    botaoSalvar: {
        marginTop: 10,
        marginBottom: 10,
        width: '25%',
        height: 50,
        backgroundColor: '#33A64C',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#33A64C",
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    botaoCancelar: {
        marginTop: 10,
        marginBottom: 10,
        width: '25%',
        height: 50,
        backgroundColor: '#E51400',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#B20000",
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    botaoVoltar: {
        marginTop: 10,
        marginBottom: 10,
        width: '25%',
        height: 50,
        backgroundColor: '#6C767D',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#6C767D",
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
});
