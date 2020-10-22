import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { Asset } from 'expo-asset';

const imageList: number[] | string[] = [require('../../assets/images/splash.png')];

const fontList: (string | { [fontFamily: string]: Font.FontSource })[] = [
  {
    ...Ionicons.font,
    'space-mono': require('../../assets/fonts/SpaceMono-Regular.ttf'),
  },
];

export default function useCachedResources(): boolean {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await SplashScreen.preventAutoHideAsync();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const appPromises: any[] = [
          // This is the place to put non-Underpin async functions
        ];

        // get and cache images
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const cacheImages = (images: unknown[]): any[] => {
          return images.map((image) => {
            if (typeof image === 'string') {
              return Image.prefetch(image);
            }
            return Asset.fromModule(image as string | number).downloadAsync();
          });
        };
        const imageAssets = cacheImages(imageList);

        // get and cache fonts
        const cacheFonts = (fonts: (string | { [fontFamily: string]: Font.FontSource })[]): Promise<void>[] => {
          return fonts.map(
            (font: string | { [fontFamily: string]: Font.FontSource }): Promise<void> => Font.loadAsync(font),
          );
        };
        const fontAssets = cacheFonts(fontList);

        // wait for all promises to resolve
        await Promise.all(appPromises.concat([...imageAssets, ...fontAssets]));
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        // eslint-disable-next-line no-console
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        await SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync().then();
  }, []);

  return isLoadingComplete;
}
