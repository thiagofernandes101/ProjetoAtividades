import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Alert, Keyboard, Platform, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import {    
    insertActivity,    
} from '../services/ActivityDatabaseService';

export default function CreateScreen({ navigation }: RootTabScreenProps<'Activity'>) {
    const [id, setId] = useState("");
    const [descricao, setDescricao] = useState("");
    const [local, setLocal] = useState("");
    const [tipoAtividade, setTipoAtividade] = useState("");
    const [data, setData] = useState("");
    const [statusAtividade, setStatusAtividade] = useState("");
    //const [atividades, setAtividades] = useState([]);
    //const [recarregaTela, setRecarregaTela] = useState(true);
    //const [criarTabela, setCriarTabela] = useState(false);


    function createUniqueId() {
        let a = Date.now().toString(36) + Math.random().toString(36).slice(0, 2);
        console.log(a)
        return Date.now().toString(36) + Math.random().toString(36).slice(0, 2);
    }


    async function salvaDados() {
        let novoRegistro = false;
        let identificador = id;

        if (!identificador) {
            identificador = createUniqueId();
            novoRegistro = true;
        }

        let obj = {
            id: identificador,
            descricao: descricao,
            local: local,
            tipoAtividade: tipoAtividade,
            data: data,
            statusAtividade: statusAtividade,
        };

        try {
            if (novoRegistro) {
                let resposta = (await insertActivity(obj));
                if (resposta) {
                    Alert.alert('Registro Adicionado!');
                }
                else {
                    Alert.alert('Erro ao adicionar registro!');
                }
            }
            else {
                Alert.alert('Atividade já existe!');
            }

            Keyboard.dismiss();
            //setRecarregaTela(true);
            navigation.navigate('Activity')
        } catch (e) {
            Alert.alert("erro");
        }
    }

    return (
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
                    <TextInput
                        style={styles.dropDown}
                        onChangeText={(texto) => setTipoAtividade(texto)}
                        value={tipoAtividade}
                    />
                </View>
                <View style={styles.campo}>
                    <Text style={styles.texto}>Local da Atividade</Text>
                    <TextInput
                        style={styles.dropDown}
                        onChangeText={(texto) => setLocal(texto)}
                        value={local}
                    />
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
                    <TextInput
                        style={styles.dropDown}
                        onChangeText={(texto) => setStatusAtividade(texto)}
                        value={statusAtividade}
                    />
                </View>


                <View style={styles.areaBotoes}>
                    <TouchableOpacity style={styles.botaoSalvar}
                        onPress={() => salvaDados()}>
                        <Text style={styles.legendaCadastro}>Salvar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botaoVoltar}
                        onPress={() => navigation.navigate('Activity')}>
                        <Text style={styles.legendaCadastro}>Voltar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botaoCancelar}>
                        <Text style={styles.legendaCadastro}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
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
        borderRadius: 10,
        borderWidth: 2,
        width: "90%"
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
        backgroundColor: 'black',
        paddingHorizontal: 10,
        width: "100%",
        textAlignVertical: "center",
        fontWeight: 'bold',
        borderRadius: 10,
        //marginBottom: 30,
        marginTop: 10,
        textAlign: 'center',
        alignSelf: 'center',
        color: "white",
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
