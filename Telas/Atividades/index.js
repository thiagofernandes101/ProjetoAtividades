import * as React from 'react';
import { Button, View, Text } from 'react-native';

export default function AtividadesScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Atividades Screen</Text>
      <Button
        title="Go to Tipos de Atividades"
        onPress={() => navigation.navigate('TiposAtividades')}
      />
    </View>
  );
}