import * as React from 'react';
import { Button, View, Text } from 'react-native';

export default function TipoAtividadeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
      <Button
        title="Go to Atividades"
        onPress={() => navigation.navigate('Atividades')}
      />
    </View>
  );
}