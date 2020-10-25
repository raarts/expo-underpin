import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs/src/types';
import { TouchableOpacity, View, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import * as React from 'react';
import { ReactElement } from 'react';
import EStyleSheet from '@raarts/react-native-extended-stylesheet';
import ThemeProvider, { applyTheme } from '../underpin/ThemeProvider';
import { useViewport } from '../underpin/ViewportProvider';

export default function MenuBar({ state, descriptors, navigation }: MaterialTopTabBarProps): ReactElement {
  const { viewportOrientation, viewportFormFactor } = useViewport();
  const styles = applyTheme(baseStyles);

  // console.log('MenuBar: state: ', state);
  // console.log('MenuBar: descriptors: ', descriptors);
  // console.log(state.index);
  return (
    <View style={styles.menuBarContainer}>
      {viewportOrientation !== 'portrait' && viewportFormFactor !== 'phone' && <Text>Logo</Text>}
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const textRef = React.useRef<Animated.Text>(null);
        const label = options.title !== undefined ? options.title : route.name;
        const isSelected = state.index === index;

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
            key={route.key}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.touchableOpacity}
            // @ts-ignore cannot be typed correctly currently
            onMouseEnter={(): void => {
              if (textRef.current) {
                // @ts-ignore cannot be typed correctly currently
                textRef.current.setNativeProps({ style: EStyleSheet.flatten(hoverTextStyle) });
              }
            }}
            onMouseLeave={(): void => {
              if (textRef.current) {
                // @ts-ignore cannot be typed correctly currently
                textRef.current.setNativeProps({ style: EStyleSheet.flatten(textStyle) });
              }
            }}
          >
            <Animated.Text
              ref={(ref): void => {
                // @ts-ignore cannot be typed correctly currently
                textRef.current = ref;
              }}
              numberOfLines={1}
              style={textStyle}
            >
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = ThemeProvider.create({
  menuBarContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 40,
    backgroundColor: '$menuBarColor',
  },
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
const baseStyles = styles;
