import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import jwtDecode from 'jwt-decode';
import { IdToken, RefreshToken } from '../underpin/utils/oidc.types';

export type LoginState = 'loggedin' | 'loggedout' | 'gettoken' | 'weblogin';

export type IdentityInfo = {
  idToken?: string;
  expiresIn?: number;
  accessToken: string;
  refreshToken?: string;
};

export interface IdentityState extends IdToken {
  loginState: LoginState;
  prevSub?: string;
  anonymous?: string;
  accessToken?: string;
  accessExpiry?: number;
  refreshToken?: string;
  refreshExpiry?: number;
}

const initialState: IdentityState = {
  loginState: 'loggedout',
};

// noinspection JSUnusedLocalSymbols
const identitySlice = createSlice({
  name: 'identity',
  initialState,
  reducers: {
    setIdentityFromAuthCode: (state, action: PayloadAction<IdentityInfo>): IdentityState => {
      const idToken = jwtDecode(action.payload.idToken || '') as IdToken;
      const refreshToken = jwtDecode(action.payload.refreshToken || '') as RefreshToken | undefined;
      return {
        ...state,
        accessToken: action.payload.accessToken,
        accessExpiry: Math.round(new Date().getTime() / 1000) + (action.payload.expiresIn || 0),
        refreshToken: action.payload.refreshToken,
        refreshExpiry: Math.round(new Date().getTime() / 1000) + (refreshToken?.exp || 0),
        ...idToken,
      };
    },
    clearIdentity: (state): IdentityState => ({
      ...initialState,
      anonymous: state.anonymous,
      prevSub: state.prevSub,
    }),
    setAnonymousId: (state): IdentityState => {
      if (state.anonymous === '') {
        return {
          ...state,
          anonymous: uuidv4().toUpperCase(),
        };
      }
      return state;
    },
    setLoginState: (state, action: PayloadAction<LoginState>): IdentityState => {
      let { prevSub } = state;
      if (action.payload === 'loggedout' && state.sub !== '') {
        prevSub = state.sub;
      }
      if (action.payload === 'loggedin') {
        prevSub = '';
      }
      return {
        ...state,
        loginState: action.payload,
        prevSub,
      };
    },
  },
});

export const { setIdentityFromAuthCode, clearIdentity, setLoginState } = identitySlice.actions;

export default identitySlice.reducer;
