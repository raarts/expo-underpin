import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ReactElement } from 'react';
import TabThreeScreen from '../screens/TabThreeScreen';

const Stack = createStackNavigator();

export type Tab3StackParamList = {
  SettingsScreen: undefined;
  AccountScreen: undefined;
  ContactNumbersScreen: undefined;
};

const Tab3StackNavigator = (): ReactElement => {
  return (
    <Stack.Navigator headerMode="none" mode="modal">
      <Stack.Screen name="TabThreeScreen" component={TabThreeScreen} />
    </Stack.Navigator>
  );
};

export default Tab3StackNavigator;
