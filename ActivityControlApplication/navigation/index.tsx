/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import ActivityScreen from '../screens/ActivityScreens/ActivityScreen';
import ActivityTypeScreen from '../screens/ActivityTypeScreens/ActivityTypeScreen';
import CreateNewActivityTypeScreen from '../screens/ActivityTypeScreens/CreateNewActivityTypeScreen';
import EditActivityTypeScreen from '../screens/ActivityTypeScreens/EditActivityType';
import ActivityTypeDetails from '../screens/ActivityTypeScreens/ActivityTypeDetails';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="CreateNewActivityType" component={CreateNewActivityTypeScreen} options={{ title: 'Criar tipo de atividade' }} />
      <Stack.Screen name="EdityActivityType" component={EditActivityTypeScreen} options={{title: 'Editar tipo de atividade'}} />
      <Stack.Screen name="ActivityTypeDetails" component={ActivityTypeDetails} options={{title: 'Detalhes do tipo de atividade'}} />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (

    <BottomTab.Navigator
      initialRouteName="Activity"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="Activity"
        component={ActivityScreen}
        options={{
          title: 'Atividades',
          tabBarIcon: ({ color }) => <TabBarIcon name="stack-exchange" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="ActivityType"
        component={ActivityTypeScreen}
        options={{
          title: 'Tipo de atividade',
          tabBarIcon: ({ color }) => <TabBarIcon name="pencil-square-o" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
