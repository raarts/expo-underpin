import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrentSystem {
  colorScheme: string;
}
type CurrentSystemState = {
  // other parameters here
} & CurrentSystem;

const initialState: CurrentSystemState = {
  colorScheme: 'light',
};

const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    setColorScheme: (state, action: PayloadAction<string>): CurrentSystemState => ({
      ...state,
      colorScheme: action.payload,
    }),
  },
});

export const { setColorScheme } = systemSlice.actions;

export default systemSlice.reducer;
