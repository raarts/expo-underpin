import { configureStore, combineReducers } from '@reduxjs/toolkit';
import systemReducer from './system';

const rootReducer = combineReducers({
  system: systemReducer,
});
const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
