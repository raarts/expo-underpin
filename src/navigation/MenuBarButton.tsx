// @ts-nocheck onMouseEnter and setNativeProps cannot be typed correctly currently
import { TouchableOpacity } from 'react-native';
import EStyleSheet from '@raarts/react-native-extended-stylesheet';
import Animated from 'react-native-reanimated';
import * as React from 'react';
import {
  MaterialTopTabBarOptions,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs/src/types';
import ThemeProvider, { applyTheme } from '../underpin/ThemeProvider';

export type MenuBarButtonProps = MaterialTopTabBarOptions & {
  options: MaterialTopTabNavigationOptions;
  routeName: string;
  isSelected: boolean;
  onPress: () => void;
};

const MenuBarButton = ({ options, routeName, isSelected, onPress }: MenuBarButtonProps): React.ReactElement => {
  const textRef = React.useRef<Animated.Text | null>(null);
  const label = options.title !== undefined ? options.title : routeName;

  const styles = applyTheme(localStyles);
  const textStyle = [styles.textStyle];
  let hoverTextStyle = [...textStyle];
  hoverTextStyle.push(styles.textStyleHover);
  if (isSelected) {
    textStyle.push(styles.selectedTextStyle);
    hoverTextStyle = [...textStyle];
    hoverTextStyle.push(styles.selectedHoverTextStyle);
  }
  return (
    <TouchableOpacity
      testID={options.tabBarTestID}
      onPress={onPress}
      style={styles.touchableOpacity}
      onMouseEnter={(): void => {
        if (textRef.current) {
          textRef.current.setNativeProps({ style: EStyleSheet.flatten(hoverTextStyle) });
        }
      }}
      onMouseLeave={(): void => {
        if (textRef.current) {
          textRef.current.setNativeProps({ style: EStyleSheet.flatten(textStyle) });
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
        {label}
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
    fontWeight: 'bold',
  },
  selectedTextStyle: {
    color: '$menuSelectedTextColor',
    backgroundColor: '$menuSelectedBackgroundColor',
  },
  selectedHoverTextStyle: {
    color: '$menuSelectedBrightTextColor',
    fontWeight: 'bold',
  },
});
const localStyles = styles;

export default MenuBarButton;
