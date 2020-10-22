import React, { ReactElement } from 'react';
import ThemeProvider, { applyTheme } from '../underpin/ThemeProvider';

import { Text, TextProps } from './Themed';

export function MonoText(props: TextProps): ReactElement {
  const { style } = props;
  const styles = applyTheme(localStyles);
  return <Text {...props} style={[style, styles.text]} />;
}

const styles = ThemeProvider.create({
  text: {
    fontFamily: 'space-mono',
  },
});
const localStyles = styles;
