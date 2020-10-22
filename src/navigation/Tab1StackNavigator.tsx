import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ReactElement } from 'react';
import TabOneScreen from '../screens/TabOneScreen';

const Stack = createStackNavigator();

export type Tab1StackkParamList = {
  ContactsScreen: undefined;
  ContactDetailScreen: { id: string };
};

const Tab1StackNavigator = (): ReactElement => {
  return (
    <Stack.Navigator headerMode="none" mode="modal">
      <Stack.Screen name="TabOneScreen" component={TabOneScreen} />
    </Stack.Navigator>
  );
};

export default Tab1StackNavigator;
