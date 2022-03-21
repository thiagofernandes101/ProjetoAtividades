import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert, Keyboard } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import {
  createTable,
  deleteActivity,
  getActivityById,
  GetAllActivities,
} from '../services/ActivityDatabaseService';



export default function ActivityScreen({ navigation }: RootTabScreenProps<'Activity'>) {
  const [selectedValue, setSelectedValue] = useState("0");
  const [descricao, setDescricao] = useState("");
  const [atividades, setAtividades] = useState([]);
  const [recarregaTela, setRecarregaTela] = useState(true);
  const [criarTabela, setCriarTabela] = useState(false);

  function redirectToEditActivity(id: number) {
    navigation.navigate('ActivityEdit', {
      itemId: id,
    })
  }

  async function processamentoUseEffect() {
    if (!criarTabela) {
      console.log("Verificando necessidade de criar tabelas...");
      setCriarTabela(true);
      await createTable();
    }
    if (recarregaTela) {
      console.log("Recarregando dados...");
      await carregaDados();
    }
  }

  useEffect(
    () => {
      console.log('executando useffect');
      processamentoUseEffect(); //necessário método pois aqui não pode utilizar await...
    }, [recarregaTela]);

  async function carregaDados() {
    try {
      let atividades: any = await GetAllActivities();
      console.log(atividades)
      setAtividades(atividades);
      setRecarregaTela(false);
    } catch (e) {
      Alert.alert("e.toString()");
    }
  }

  async function carregaDado(identificador: any) {
    try {
      let atividades: any = await getActivityById(identificador);
      console.log(atividades)
      setRecarregaTela(false);
    } catch (e: any) {
      Alert.alert(e.toString());
    }
  }

  function removerElemento(identificador: any) {
    Alert.alert('Cuidado', 'Deseja exluir o registro?',
      [
        {
          text: 'Sim',
          onPress: () => efetivaRemoverContato(identificador),
        },
        {
          text: 'Não',
          style: 'cancel',
        }
      ]);
  }

  async function efetivaRemoverContato(identificador: any) {
    try {
      await deleteActivity(identificador);
      Keyboard.dismiss();
      //limparCampos();
      setRecarregaTela(true);
      Alert.alert('Contato apagado com sucesso!!!');
    } catch (e: any) {
      Alert.alert(e);
    }
  }
  return (

    <View style={styles.container}>

      <View style={styles.areaFiltro}>
        <View style={styles.areaTituloFiltro}>
          <Text style={styles.tituloFiltro}>Filtro</Text>
        </View>
        <View style={styles.areaConteudoFiltro}>
          <View style={styles.areaStatus}>
            <Text style={styles.legendaStatus}>Status</Text>
            <Picker
              selectedValue={selectedValue}
              style={styles.dropDown}
              onValueChange={(itemValue: any, itemIndex) => setSelectedValue(itemValue)}
            >
              <Picker.Item label="Selecione um status" value="0" />
              <Picker.Item label="Pendente" value="1" />
              <Picker.Item label="Concluído" value="2" />
              <Picker.Item label="Todos" value="3" />
            </Picker>

          </View>
          <TouchableOpacity style={styles.botaoNovaAtividade}
            onPress={() => navigation.navigate('ActivityCreate')}>
            <Text style={styles.legendaCadastro}>Nova Atividade</Text>
          </TouchableOpacity>

        </View>
      </View>
      <ScrollView style={styles.listaAtividades}>
        {
          atividades.map((atividade: any, index) => (
            <><View style={styles.areaAtividade} key={index.toString()}>
              <Text style={styles.tituloAtividade}>{atividade.tipoAtividade}</Text>
              <Text style={styles.legendaAtividade}>{atividade.descricao} Descrição da atividade</Text>
              <View style={styles.areaCheckBox}>
                <Text style={styles.checkBox}> </Text>
                <Text>Concluir atividade</Text>
              </View>
              <View style={styles.areaBotoes}>
                <TouchableOpacity style={styles.botaoEditar}
                  onPress={() => navigation.navigate('ActivityEdit', atividade.id)}>
                  <Text style={styles.legendaCadastro}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaoExcluir}
                  onPress={() => removerElemento(atividade.id)}>
                  <Text style={styles.legendaCadastro}>Excluir</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaoInfo}
                  onPress={() => navigation.navigate('ActivityDetail', atividade.id)}>
                  <Text style={styles.legendaCadastro}>Info</Text>
                </TouchableOpacity>
              </View>
            </View>
            </>
          ))
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  //<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
  //<EditScreenInfo path="/screens/ActivityScreen.tsx" />
  //<Text style={styles.title}>Atividades</Text>
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    //paddingTop: 40
  },
  listaAtividades: {
    //paddingHorizontal: 30,
    width: '90%',
    //height: '40%',
    backgroundColor: '#FFF',
    marginTop: 20,
    marginBottom: 20,
    //justifyContent: 'center',
    //alignItems: 'center',
    alignSelf: 'center',
    //flexGrow: 1

  },
  tituloAtividade: {
    //color: "white",
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    textAlignVertical: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  legendaAtividade: {
    textAlignVertical: "center",
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  areaTituloAtividade: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: 'bold',
    height: 50,
    //backgroundColor: "#0081F4",
    //borderColor: "#0081F4",
    //height: 50,
    //paddingHorizontal: 10,    
    //justifyContent : "center"   
  },
  checkBox: {
    width: 20,
    borderWidth: 2,
    borderRadius: 10,
  },
  areaCheckBox: {
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    //justifyContent: 'space-between',
  },
  botaoEditar: {
    marginTop: 10,
    marginBottom: 10,
    width: '20%',
    height: 50,
    backgroundColor: '#0085FC',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#0081F4",
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  botaoExcluir: {
    marginTop: 10,
    marginBottom: 10,
    width: '20%',
    height: 50,
    backgroundColor: '#E51400',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#B20000",
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  botaoInfo: {
    marginTop: 10,
    marginBottom: 10,
    width: '20%',
    height: 50,
    backgroundColor: '#1CA5B8',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#0081F4",
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
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
  areaAtividade: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "gray",
    width: '90%',
    elevation: 10,
    marginBottom: 30,

  },
  legendaStatus: {
    textAlignVertical: "center"
  },
  dropDown: {
    width: "60%",
    borderWidth: 2,
    borderRadius: 10,
    textAlignVertical: "center",
  },

  title: {
    textAlignVertical: "center",
    fontSize: 20,
    fontWeight: 'bold',
    //backgroundColor: "yellow",
    borderRadius: 10,
    borderWidth: 2,
    marginBottom: 30,
    textAlign: 'center',
    width: "90%",
    height: 50
  },
  areaStatus: {
    flexDirection: "row",
    width: "100%",
    justifyContent: 'space-around',
    //justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 10,
    //textAlignVertical: "center",
    height: 50

  },
  areaFiltro: {
    borderRadius: 10,
    //borderWidth: 2,
    //borderColor: "gray",
    width: '90%',
    elevation: 10,
    marginBottom: 30,
  },
  tituloFiltro: {
    color: "white",
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    textAlignVertical: "center",

  },
  areaTituloFiltro: {
    fontSize: 20,
    fontWeight: 'bold',
    height: 50,
    backgroundColor: "#0081F4",
    borderColor: "#0081F4",
    borderRadius: 5,
    borderWidth: 2,
    //height: 50,
    //paddingHorizontal: 10,    
    //justifyContent : "center"    
  },
  areaConteudoFiltro: {
    //backgroundColor: "yellow",
    //borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray"

  },
  filtro: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: "#0081F4",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "gray"
    //height: 50,
    //paddingHorizontal: 10,
    //width: '90%',
    //justifyContent : "center"    
  },
  botaoNovaAtividade: {
    marginTop: 10,
    marginBottom: 10,
    width: '90%',
    height: 50,
    backgroundColor: '#0081F4',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#0081F4",
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  legendaCadastro: {
    fontWeight: 'bold',
    fontSize: 20,
    color: "white",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
