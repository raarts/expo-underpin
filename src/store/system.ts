import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { rebuildTheme } from '../underpin/ThemeProvider';

interface CurrentSystem {
  colorScheme: string;
  theme: string;
}
type CurrentSystemState = {
  // other parameters here
} & CurrentSystem;

const initialState: CurrentSystemState = {
  colorScheme: 'light',
  theme: 'default',
};

const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    setColorScheme: (state, action: PayloadAction<string>): CurrentSystemState => {
      rebuildTheme(state.theme || 'default', action.payload || 'light');
      return {
        ...state,
        colorScheme: action.payload,
      };
    },
    themeBuild: (state): CurrentSystemState => {
      rebuildTheme(state.theme, state.colorScheme);
      return {
        ...state,
      };
    },
  },
});

export const { setColorScheme, themeBuild } = systemSlice.actions;

export default systemSlice.reducer;
