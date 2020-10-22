import React, { ReactElement } from 'react';

import { Text, TextProps } from './Themed';

export function MonoText(props: TextProps): ReactElement {
  const { style } = props;
  return <Text {...props} style={[style, { fontFamily: 'space-mono' }]} />;
}
