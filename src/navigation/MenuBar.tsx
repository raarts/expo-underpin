import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs/src/types';
import { View } from 'react-native';
import * as React from 'react';
import { ReactElement } from 'react';
import ThemeProvider, { applyTheme } from '../underpin/ThemeProvider';
import { useKeycloakAuthentication } from '../underpin/KeycloakAuthentication';
import MenuBarButton from './MenuBarButton';
import MenuLoginLogoutButton from './MenuLoginLogoutButton';

export default function MenuBar({ state, descriptors, navigation }: MaterialTopTabBarProps): ReactElement {
  const keycloak = useKeycloakAuthentication();
  const styles = applyTheme(baseStyles);

  return (
    <View style={styles.menuBarContainer}>
      <View style={styles.leftMenuContainer}>
        {state.routes.map((route, index) => {
          const isSelected = state.index === index;
          const anynomousMenus = ['MenuHome'];

          const onPress = (): void => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isSelected && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          if (!anynomousMenus.includes(route.name) && keycloak.loginState !== 'loggedin') {
            if (isSelected) {
              navigation.navigate('MenuHome');
            }
            return null;
          }
          return (
            <MenuBarButton
              key={route.key}
              isSelected={isSelected}
              options={descriptors[route.key].options}
              routeName={route.name}
              onPress={onPress}
            />
          );
        })}
      </View>
      <View style={styles.rightMenuContainer}>
        <MenuLoginLogoutButton />
      </View>
    </View>
  );
}

const styles = ThemeProvider.create({
  menuBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    backgroundColor: '$menuBarColor',
  },
  leftMenuContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 40,
    backgroundColor: '$menuBarColor',
  },
  rightMenuContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 40,
    backgroundColor: '$menuBarColor',
  },
});
const baseStyles = styles;
