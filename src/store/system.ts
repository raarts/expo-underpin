import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrentSystem {
  darkMode: boolean;
}
type CurrentSystemState = {
  // other parameters here
} & CurrentSystem;

const initialState: CurrentSystemState = {
  darkMode: false,
};

const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<string>): CurrentSystemState => ({
      ...state,
      darkMode: action.payload === 'dark',
    }),
  },
});

export const { setDarkMode } = systemSlice.actions;

export default systemSlice.reducer;
