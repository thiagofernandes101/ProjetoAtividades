import { StyleSheet, Pressable, ScrollView } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { RootTabScreenProps } from '../../types';

export default function ActivityScreen({ navigation }: RootTabScreenProps<'Activity'>) {
  return (
    <View style={[styles.container]}>
      <View style={[styles.filterContainer]}>
        <View style={[styles.cardFilterHeader, styles.shadowComponent]}>
          <Text style={[styles.filterHeaderText]}>Filtro</Text>
        </View>
        <View style={[styles.cardFilterBody]}>
          <Text>Status</Text>
          <View style={[styles.formGroup]}>
            <View style={[styles.shadowComponent]}>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.container}>
        <ScrollView style={[styles.scrollWholeScreenWidth]}>
          {
            // activitiesTypes.map((activityType, index) => (
            //   <View style={[styles.card, styles.shadowComponent]} key={index.toString()}>
            //     <Text style={styles.activityTypeMainText}>{activityType.activityType}</Text>
            //     <Text style={styles.activityTypeDescriptionText}>{activityType.description}</Text>

            //     <View style={[styles.cardActionComponentDirection]}>
            //       <Pressable style={[styles.cardActionButton, styles.editActivityTypeButton, styles.shadowComponent]}
            //         onPress={() => redirectToEditActivityTypeScreen(activityType.id)}>
            //         <Text style={styles.buttonText}>
            //           <FontAwesome name="edit" size={20} color="#FFFFFF" />
            //         </Text>
            //       </Pressable>
            //       <Pressable style={[styles.cardActionButton, styles.deleteActivityTypeButton, styles.shadowComponent]}
            //         onPress={() => RemoveActivityType(activityType.id)}>
            //         <Text style={styles.buttonText}>
            //           <FontAwesome name="remove" size={20} color="#FFFFFF" />
            //         </Text>
            //       </Pressable>
            //       <Pressable style={[styles.cardActionButton, styles.infoActivityTypeButton, styles.shadowComponent]}
            //         onPress={() => navigation.navigate('ActivityTypeDetails', { itemId: activityType.id })}>
            //         <Text style={styles.buttonText}>
            //           <FontAwesome name="info-circle" size={20} color="#FFFFFF" />
            //         </Text>
            //       </Pressable>
            //     </View>
            //   </View>
            // ))
          }
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  newActivityTypeButton: {
    backgroundColor: "#0085FC",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    marginTop: 15,
    width: "80%"
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
    marginBottom: 10,
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
    width: "80%",
  },
  filterContainer: {
    marginTop: 15,
    width: "80%",
  },
  cardFilterHeader: {
    width: "100%",
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
    backgroundColor: '#0081F4',
  },
  cardFilterBody: {
    width: "100%",
    borderWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  filterHeaderText: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 18
  },
  formGroup: {
    marginBottom: 20
  },
  formContainer: {
    marginTop: 10,
    width: '80%'
  },
});