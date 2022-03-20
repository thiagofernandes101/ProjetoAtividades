import { FontAwesome } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { Alert, Pressable, StyleSheet, ScrollView } from 'react-native';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

export default function CreateEditActivityType({ path }: { path: string }) {
    return (
        <View>
            <Text>Criar um novo tipo de atividade</Text>
        </View>
    )
}