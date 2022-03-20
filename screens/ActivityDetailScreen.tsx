import { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function CreateScreen({ navigation }: RootTabScreenProps<'Activity'>) {    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalhes da Atividade</Text>

            <View style={styles.cadastroAtividade}>
                <View style={styles.campo}> 
                    <Text style={styles.tipoAtividade}>Tipo de Atividade</Text>
                    <Text style={styles.texto}>Descrição da atividade
                    </Text>
                    <Text style={styles.texto}>Local da atividade
                    </Text>
                    <Text style={styles.texto}>Data e hora da entrega
                    </Text><Text style={styles.texto}>Status de pendência
                    </Text>
                </View>
            </View>
            <TouchableOpacity style={styles.botaoVoltar}
                onPress={() => navigation.navigate('Activity')}>
                <Text style={styles.legendaCadastro}>Voltar</Text>
            </TouchableOpacity>
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
    tipoAtividade: {
        //color: "white",
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        textAlignVertical: "center",
        //marginTop: 20,
        marginBottom: 10,
    },
    texto: {
        paddingHorizontal: 10,
        marginBottom: 10,
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
