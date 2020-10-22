import React from 'react';
import { Text } from 'react-native';
import ThemeProvider, { applyTheme } from '../underpin/ThemeProvider';

export function MonoText(props: Text['props']): React.ReactElement {
  const { style } = props;
  const styles = applyTheme(localStyles);
  return <Text {...props} style={[style, styles.text]} />;
}

const styles = ThemeProvider.create({
  text: {
    fontFamily: 'space-mono',
    color: '$textColor',
  },
});
const localStyles = styles;
