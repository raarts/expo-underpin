import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ReactElement } from 'react';
import TabTwoScreen from '../screens/TabTwoScreen';

const Stack = createStackNavigator();

// export type Tab2StackParamList = {
//   CallHistoryScreen: undefined;
//   CallDetailScreen: { id: number };
// };

const Tab2StackNavigator = (): ReactElement => {
  return (
    <Stack.Navigator headerMode="none" mode="modal">
      <Stack.Screen name="TabTwoScreen" component={TabTwoScreen} />
    </Stack.Navigator>
  );
};

export default Tab2StackNavigator;
