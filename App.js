import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Telas/Home';
import AtividadesScreen from './Telas/Atividades';
import TipoAtividadeScreen from './Telas/TiposAtividades';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen} options={{title: 'Bem vindo'}}></Stack.Screen>
        <Stack.Screen name="Atividades" component={AtividadesScreen} options={{title: 'Atividades'}}></Stack.Screen>
        <Stack.Screen name="TiposAtividades" component={TipoAtividadeScreen} options={{title: 'Tipos de Atividades'}}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
