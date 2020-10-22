import * as WebBrowser from 'expo-web-browser';
import React, { ReactElement } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

import { MonoText } from './StyledText';

import { _ } from '../i18n';
import ThemeProvider, { applyTheme } from '../underpin/ThemeProvider';

export default function EditScreenInfo({ path }: { path: string }): ReactElement {
  const styles = applyTheme(localStyles);
  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text style={styles.getStartedText}>{`${_('openFileForThisScreen')}:`}</Text>
        <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
          <MonoText>{path}</MonoText>
        </View>

        <Text style={styles.getStartedText}>
          Change any of the text, save the file, and your app will automatically update.
        </Text>
      </View>

      <View style={styles.helpContainer}>
        <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
          <Text style={styles.helpLinkText}>
            Tap here if your app doesn&apos;t automatically update after making changes
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet',
  ).then();
}

const styles = ThemeProvider.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
    backgroundColor: '$backgroundColor',
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
    backgroundColor: '$backgroundColor',
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
    color: '$textColor',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '$backgroundColor',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
    color: '$tintColor',
  },
});
const localStyles = styles;
