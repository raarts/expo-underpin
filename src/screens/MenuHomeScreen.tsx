import * as React from 'react';
import { Text, View } from 'react-native';

import ThemeProvider, { applyTheme } from '../underpin/ThemeProvider';

export default function MenuHomeScreen(): React.ReactElement {
  const styles = applyTheme(localStyles);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
    </View>
  );
}

const styles = ThemeProvider.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '$backgroundColor',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '$textColor',
  },
});
const localStyles = styles;
