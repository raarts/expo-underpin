import { StackScreenProps } from '@react-navigation/stack';
import React, { ReactElement } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { RootStackParamList } from '../../types';
import ThemeProvider, { applyTheme } from '../underpin/ThemeProvider';

export default function NotFoundScreen({ navigation }: StackScreenProps<RootStackParamList, 'NotFound'>): ReactElement {
  const styles = applyTheme(localStyles);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This screen doesn&pos;t exist.</Text>
      <TouchableOpacity onPress={() => navigation.replace('Root')} style={styles.link}>
        <Text style={styles.linkText}>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = ThemeProvider.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
const localStyles = styles;
