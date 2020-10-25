import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { ReactElement } from 'react';
import MenuBar from './MenuBar';
import Tab1StackNavigator from './Tab1StackNavigator';
import Tab2StackNavigator from './Tab2StackNavigator';
import Tab3StackNavigator from './Tab3StackNavigator';
import { useViewport } from '../underpin/ViewportProvider';
import HomeStackNavigator from './HomeStackNavigator';

const TopMenu = createMaterialTopTabNavigator();
const INITIAL_ROUTE_NAME = 'MenuOne';

export default function RootMenuBarNavigator(): React.ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { viewportWidth } = useViewport();

  return (
    <TopMenu.Navigator
      lazy
      initialLayout={{ width: viewportWidth }}
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBar={(props): ReactElement => <MenuBar {...props} />}
      timingConfig={{
        duration: 1, // milliseconds
      }}
    >
      <TopMenu.Screen
        name="MenuHome"
        component={HomeStackNavigator}
        options={{
          title: 'Home',
        }}
      />
      <TopMenu.Screen
        name="MenuOne"
        component={Tab1StackNavigator}
        options={{
          title: 'Menu 1',
        }}
      />
      <TopMenu.Screen
        name="MenuTwo"
        component={Tab2StackNavigator}
        options={{
          title: 'Menu 2',
        }}
      />
      <TopMenu.Screen
        name="MenuThree"
        component={Tab3StackNavigator}
        options={{
          title: 'Menu 3',
        }}
      />
    </TopMenu.Navigator>
  );
}
