import { StatusBar } from 'expo-status-bar';
import React, { ReactElement, useReducer } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { enableScreens } from 'react-native-screens';
import store, { persistor } from './store';
import { setColorScheme } from './store/system';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import ViewportProvider from './underpin/ViewportProvider';
import ThemeProvider from './underpin/ThemeProvider';
import ErrorBoundary from './underpin/ErrorBoundary';
import Navigation from './navigation';

// How to extend the RootNavigator concept to apply to multiple form factors and orientations
// import PortraitPhoneRootStackNavigator from './navigation/portrait/phone/RootStackNavigator';
// import PortraitTabletRootStackNavigator from './navigation/portrait/tablet/RootStackNavigator';
// import PortraitMonitorRootStackNavigator from './navigation/portrait/monitor/RootStackNavigator';
//
// import LandscapePhoneRootStackNavigator from './navigation/landscape/phone/RootStackNavigator';
// import LandscapeTabletRootStackNavigator from './navigation/landscape/tablet/RootStackNavigator';
// import LandscapeMonitorRootStackNavigator from './navigation/landscape/monitor/RootStackNavigator';
//
// const rootNavMatrix = {
//   portrait: {
//     phone: PortraitPhoneRootStackNavigator,
//     tablet: PortraitTabletRootStackNavigator,
//     monitor: PortraitMonitorRootStackNavigator,
//   },
//   landscape: {
//     phone: LandscapePhoneRootStackNavigator,
//     tablet: LandscapeTabletRootStackNavigator,
//     monitor: LandscapeMonitorRootStackNavigator,
//   },
// };

// optimize screen memory usage, see: https://reactnavigation.org/docs/react-native-screens
enableScreens();

export default function App(): ReactElement | null {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  React.useEffect(() => {
    store.dispatch(setColorScheme(colorScheme));
  }, [colorScheme]);

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ViewportProvider>
          <ThemeProvider>
            <ErrorBoundary forceReload={forceUpdate}>
              <SafeAreaProvider>
                <Navigation />
                <StatusBar />
              </SafeAreaProvider>
            </ErrorBoundary>
          </ThemeProvider>
        </ViewportProvider>
      </PersistGate>
    </Provider>
  );
}
