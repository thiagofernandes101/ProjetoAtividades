import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert, Picker } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import ActivityDatabaseService from "../services/ActivityDatabaseService";
import ActivityTypeDatabaseService from "../services/ActivityTypeDatabaseService";
import { ActivityModel } from '../models/ActivityModel';
import { ActivityTypeModel } from '../models/ActivityTypeModel';
import { FontAwesome } from '@expo/vector-icons';

export default function ActivityScreen({ navigation }: RootTabScreenProps<'Activity'>) {
  let activitiesInitialState: ActivityModel[] = [];
  let activitiesTypesInitialState: ActivityTypeModel[] = [];

  const [selectedValue, setSelectedValue] = useState("1");
  const [descricao, setDescricao] = useState("");
  const [atividades, setAtividades] = useState(activitiesInitialState);
  const [recarregaTela, setRecarregaTela] = useState(true);
  const [criarTabela, setCriarTabela] = useState(false);
  const [activitiesTypes, setActivitiesTypes] = useState(activitiesTypesInitialState);
  const [isSelected, setSelection] = useState(false);

  function redirectToEditActivity(id: number) {
    navigation.navigate('ActivityEdit', {
      itemId: id,
    })
  }

  async function processamentoUseEffect() {
    if (!criarTabela) {
      console.log("Verificando necessidade de criar tabelas...");
      setCriarTabela(true);
      await ActivityDatabaseService.createTable();
    }
    if (recarregaTela) {
      console.log("Recarregando dados...");
      await carregaDados();
    }
  }

  useEffect(
    () => {
      console.log('executando useffect');
      navigation.addListener('focus', () => setRecarregaTela(!recarregaTela));
      processamentoUseEffect(); //necessário método pois aqui não pode utilizar await...
    }, [recarregaTela]);

  async function carregaDados() {
    try {
      let atividades = await ActivityDatabaseService.GetPendingActivities();

      setAtividades(atividades);
      setRecarregaTela(false);
    } catch (e) {
      console.log(e);
      Alert.alert("Ocorreu um erro ao carregar as atividades. Verifique o log");
    }
  }

  async function carregaDado(identificador: any) {
    try {
      let atividades: ActivityModel = await ActivityDatabaseService.getActivityById(identificador);
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

  async function closeActivity(id: number) {
    try {
      console.log('concluir atividade')
      console.log(id);
      console.log(selectedValue);
      
      await ActivityDatabaseService.closeActivity(id);
      
      Alert.alert("Pendência alterada com sucesso");
      filtroStatus(selectedValue);
    } catch (e) {
      console.log(e);
      Alert.alert("Ocorreu um erro ao excluir o tipo de atividade. Consulte o log.");
    }
  }

  async function filtroStatus(itemValue: string) {
    setSelectedValue(itemValue);
    let valorFiltroNumerico = parseInt(itemValue);
    let atividades: ActivityModel[]

    if (valorFiltroNumerico == 2) {
      atividades = await ActivityDatabaseService.GetPendingActivities();
    }
    else if (valorFiltroNumerico == 3) {
      atividades = await ActivityDatabaseService.GetActivitiesCompleted();
    }
    else {
      atividades = await ActivityDatabaseService.GetAllActivities();
    }

    setAtividades(atividades);
    setRecarregaTela(false);
  }

  async function efetivaRemoverContato(id: number) {
    try {
      let isItemDeleted = await ActivityDatabaseService.deleteActivity(id);

      if (isItemDeleted == true) {
        Alert.alert("Registro excluído com sucesso");
        setRecarregaTela(true);
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Ocorreu um erro ao excluir o tipo de atividade. Consulte o log.");
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
              onValueChange={(itemValue: string, itemIndex) => filtroStatus(itemValue)}
            >
              <Picker.Item label="Selecione um status" value="1" />
              <Picker.Item label="Pendente" value="2" />
              <Picker.Item label="Concluído" value="3" />
              <Picker.Item label="Todos" value="4" />
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
          atividades.map((atividade: ActivityModel, index) => (
            <View style={[styles.card, styles.shadowComponent]} key={index.toString()}>
              <Text style={styles.tituloAtividade}>{atividade.activityTypeDescription}</Text>
              <Text style={styles.legendaAtividade}>{atividade.activityDescription}</Text>
              <View style={styles.areaCheckBox}>
                <Pressable style={[styles.cardCloseActionButton, styles.closeActivity, styles.shadowComponent]}
                  onPress={() => closeActivity(atividade.id)}>
                  <Text style={styles.buttonText}>
                    Concluir atividade
                  </Text>
                </Pressable>
              </View>

              <View style={[styles.cardActionComponentDirection]}>
                <Pressable style={[styles.cardActionButton, styles.editActivityTypeButton, styles.shadowComponent]}
                  onPress={() => navigation.navigate('ActivityEdit', { itemId: atividade.id })}>
                  <Text style={styles.buttonText}>
                    <FontAwesome name="edit" size={20} color="#FFFFFF" />
                  </Text>
                </Pressable>
                <Pressable style={[styles.cardActionButton, styles.deleteActivityTypeButton, styles.shadowComponent]}
                  onPress={() => removerElemento(atividade.id)}>
                  <Text style={styles.buttonText}>
                    <FontAwesome name="remove" size={20} color="#FFFFFF" />
                  </Text>
                </Pressable>
                <Pressable style={[styles.cardActionButton, styles.infoActivityTypeButton, styles.shadowComponent]}
                  onPress={() => navigation.navigate('ActivityDetail', { itemId: atividade.id })}>
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
  card: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
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
    padding: 10,
    borderRadius: 10,
    width: "15%",
    marginTop: 10,

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
    marginLeft: 10
  },
  cardCloseActionButton: {
    padding: 10,
    borderRadius: 10,
    width: "70%",
    marginTop: 10,
  },
  closeActivity: {
    backgroundColor: "#6C767D",
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
