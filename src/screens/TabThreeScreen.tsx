import * as React from 'react';
import { Text, View } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import ThemeProvider, { applyTheme } from '../underpin/ThemeProvider';

export default function TabThreeScreen(): React.ReactElement {
  const styles = applyTheme(localStyles);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Three</Text>
      <View style={styles.separator} />
      <EditScreenInfo path="/screens/TabThreeScreen.tsx" />
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: '$sepColor',
  },
});
const localStyles = styles;
