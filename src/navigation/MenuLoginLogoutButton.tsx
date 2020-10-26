// @ts-nocheck onMouseEnter and setNativeProps cannot be typed correctly currently
import { TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import * as React from 'react';
import ThemeProvider, { applyTheme } from '../underpin/ThemeProvider';
import { useKeycloakAuthentication } from '../underpin/KeycloakAuthentication';

const MenuLoginLogoutButton = (): React.ReactElement => {
  const textRef = React.useRef<Animated.Text | null>(null);
  const keycloak = useKeycloakAuthentication();

  const onPress = () => {
    if (keycloak.loginState === 'loggedin') {
      keycloak.logout();
      return;
    }
    keycloak.login();
  };
  const styles = applyTheme(localStyles);
  const textStyle = [styles.textStyle];
  let hoverTextStyle = [...textStyle];
  hoverTextStyle.push(styles.textStyleHover);
  textStyle.push(styles.selectedTextStyle);
  hoverTextStyle = [...textStyle];
  hoverTextStyle.push(styles.selectedHoverTextStyle);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.touchableOpacity}
      onMouseEnter={(): void => {
        if (textRef.current) {
          textRef.current.setNativeProps({ style: ThemeProvider.flatten(hoverTextStyle) });
        }
      }}
      onMouseLeave={(): void => {
        if (textRef.current) {
          textRef.current.setNativeProps({ style: ThemeProvider.flatten(textStyle) });
        }
      }}
    >
      <Animated.Text
        ref={(ref): void => {
          textRef.current = ref;
        }}
        numberOfLines={1}
        style={textStyle}
      >
        {keycloak.loginState === 'loggedin' ? 'Logout' : 'Login'}
      </Animated.Text>
    </TouchableOpacity>
  );
};

const styles = ThemeProvider.create({
  touchableOpacity: {
    flex: 1,
    maxWidth: 100,
    marginLeft: 12,
    marginRight: 2,
  },
  textStyle: {
    textAlign: 'center',
    color: '$textColor',
    padding: 6,
    borderRadius: 2,
    fontSize: 16,
  },
  textStyleHover: {
    color: '$textColor',
  },
  selectedTextStyle: {
    color: '$menuSelectedTextColor',
    backgroundColor: '$menuSelectedBackgroundColor',
  },
  selectedHoverTextStyle: {
    color: '$textColor',
  },
});
const localStyles = styles;

export default MenuLoginLogoutButton;
