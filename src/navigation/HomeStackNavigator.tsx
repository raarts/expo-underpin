import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ReactElement } from 'react';
import MenuHomeScreen from '../screens/MenuHomeScreen';

const Stack = createStackNavigator();

export type Tab1StackkParamList = {
  ContactsScreen: undefined;
  ContactDetailScreen: { id: string };
};

const HomeStackNavigator = (): ReactElement => {
  return (
    <Stack.Navigator headerMode="none" mode="modal">
      <Stack.Screen name="MenuHomeScreen" component={MenuHomeScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
