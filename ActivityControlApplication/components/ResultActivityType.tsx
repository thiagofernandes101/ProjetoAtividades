import { FontAwesome } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { Alert, Pressable, StyleSheet, ScrollView } from 'react-native';

import Colors from '../constants/Colors';
import { RootTabScreenProps } from '../types';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

export default function ResultActivityTypeScreen({ path }: { path: string }) {
    return (
        <View style={styles.container}>
            <ScrollView style={[styles.scrollWholeScreenWidth]}>
                <View style={[styles.card, styles.shadowComponent]}>
                    <View>
                        <Text style={styles.activityTypeMainText}>N2</Text>
                        <Text style={styles.activityTypeDescriptionText}>Provas de primeiro e segundo bimestre com peso 0.6</Text>

                        <View style={[styles.cardActionComponentDirection]}>
                            <Pressable style={[styles.cardActionButton, styles.editActivityTypeButton, styles.shadowComponent]}
                                onPress={() => Alert.alert("Editar novo tipo de atividade")}>
                                <Text style={styles.buttonText}>
                                    <FontAwesome name="edit" size={20} color="#FFFFFF" />
                                </Text>
                            </Pressable>
                            <Pressable style={[styles.cardActionButton, styles.deleteActivityTypeButton, styles.shadowComponent]}
                                onPress={() => Alert.alert("Editar novo tipo de atividade")}>
                                <Text style={styles.buttonText}>
                                    <FontAwesome name="edit" size={20} color="#FFFFFF" />
                                </Text>
                            </Pressable>
                            <Pressable style={[styles.cardActionButton, styles.infoActivityTypeButton, styles.shadowComponent]}
                                onPress={() => Alert.alert("Editar novo tipo de atividade")}>
                                <Text style={styles.buttonText}>
                                    <FontAwesome name="edit" size={20} color="#FFFFFF" />
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>

                <View style={[styles.card, styles.shadowComponent]}>
                    <View>
                        <Text style={styles.activityTypeMainText}>N2</Text>
                        <Text style={styles.activityTypeDescriptionText}>Provas de primeiro e segundo bimestre com peso 0.6</Text>

                        <View style={[styles.cardActionComponentDirection]}>
                            <Pressable style={[styles.cardActionButton, styles.editActivityTypeButton, styles.shadowComponent]}
                                onPress={() => Alert.alert("Editar novo tipo de atividade")}>
                                <Text style={styles.buttonText}>
                                    <FontAwesome name="edit" size={20} color="#FFFFFF" />
                                </Text>
                            </Pressable>
                            <Pressable style={[styles.cardActionButton, styles.deleteActivityTypeButton, styles.shadowComponent]}
                                onPress={() => Alert.alert("Editar novo tipo de atividade")}>
                                <Text style={styles.buttonText}>
                                    <FontAwesome name="edit" size={20} color="#FFFFFF" />
                                </Text>
                            </Pressable>
                            <Pressable style={[styles.cardActionButton, styles.infoActivityTypeButton, styles.shadowComponent]}
                                onPress={() => Alert.alert("Editar novo tipo de atividade")}>
                                <Text style={styles.buttonText}>
                                    <FontAwesome name="edit" size={20} color="#FFFFFF" />
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>

                <View style={[styles.card, styles.shadowComponent]}>
                    <View>
                        <Text style={styles.activityTypeMainText}>N2</Text>
                        <Text style={styles.activityTypeDescriptionText}>Provas de primeiro e segundo bimestre com peso 0.6</Text>

                        <View style={[styles.cardActionComponentDirection]}>
                            <Pressable style={[styles.cardActionButton, styles.editActivityTypeButton, styles.shadowComponent]}
                                onPress={() => Alert.alert("Editar novo tipo de atividade")}>
                                <Text style={styles.buttonText}>
                                    <FontAwesome name="edit" size={20} color="#FFFFFF" />
                                </Text>
                            </Pressable>
                            <Pressable style={[styles.cardActionButton, styles.deleteActivityTypeButton, styles.shadowComponent]}
                                onPress={() => Alert.alert("Editar novo tipo de atividade")}>
                                <Text style={styles.buttonText}>
                                    <FontAwesome name="edit" size={20} color="#FFFFFF" />
                                </Text>
                            </Pressable>
                            <Pressable style={[styles.cardActionButton, styles.infoActivityTypeButton, styles.shadowComponent]}
                                onPress={() => Alert.alert("Editar novo tipo de atividade")}>
                                <Text style={styles.buttonText}>
                                    <FontAwesome name="edit" size={20} color="#FFFFFF" />
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>

                <View style={[styles.card, styles.shadowComponent]}>
                    <View>
                        <Text style={styles.activityTypeMainText}>N2</Text>
                        <Text style={styles.activityTypeDescriptionText}>Provas de primeiro e segundo bimestre com peso 0.6</Text>

                        <View style={[styles.cardActionComponentDirection]}>
                            <Pressable style={[styles.cardActionButton, styles.editActivityTypeButton, styles.shadowComponent]}
                                onPress={() => Alert.alert("Editar novo tipo de atividade")}>
                                <Text style={styles.buttonText}>
                                    <FontAwesome name="edit" size={20} color="#FFFFFF" />
                                </Text>
                            </Pressable>
                            <Pressable style={[styles.cardActionButton, styles.deleteActivityTypeButton, styles.shadowComponent]}
                                onPress={() => Alert.alert("Editar novo tipo de atividade")}>
                                <Text style={styles.buttonText}>
                                    <FontAwesome name="edit" size={20} color="#FFFFFF" />
                                </Text>
                            </Pressable>
                            <Pressable style={[styles.cardActionButton, styles.infoActivityTypeButton, styles.shadowComponent]}
                                onPress={() => Alert.alert("Editar novo tipo de atividade")}>
                                <Text style={styles.buttonText}>
                                    <FontAwesome name="edit" size={20} color="#FFFFFF" />
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: "80%",
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
    buttonText: {
        textAlign: "center",
        fontSize: 18,
        color: "#FFFFFF",
        fontWeight: "bold",
    },
    card: {
        width: "100%",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10
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
    scrollWholeScreenWidth: {
        width: "100%",
    }
})