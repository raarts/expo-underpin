import { StatusBar } from 'expo-status-bar';
import React, { ReactElement } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';
import { setColorScheme } from './store/system';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import ViewportProvider from './underpin/ViewportProvider';
import ThemeProvider from './underpin/ThemeProvider';

export default function App(): ReactElement | null {
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
            <SafeAreaProvider>
              <Navigation />
              <StatusBar />
            </SafeAreaProvider>
          </ThemeProvider>
        </ViewportProvider>
      </PersistGate>
    </Provider>
  );
}
