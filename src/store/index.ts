import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import Constants from 'expo-constants';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants';
import systemReducer from './system';

const rootReducer = combineReducers({
  system: systemReducer,
});
const persistConfig = {
  key: Constants.manifest.slug || 'root',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
