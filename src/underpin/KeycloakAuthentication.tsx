import React, { ReactElement } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { ActivityIndicator, Alert, Platform, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setIdentityFromAuthCode, clearIdentity, LoginState, setLoginState } from '../store/identity';
import { RootState } from '../store';
import ThemeProvider, { applyTheme } from './ThemeProvider';

export const keycloak = {
  context: null as KeycloakAuthenticationType | null,
};

export type KeycloakAuthenticationType = {
  loginState: LoginState;
  getAccessToken: () => Promise<string | null | undefined>;
  login: () => void;
  logout: () => void;
  working: boolean;
};

const defaultKeycloakAuthentication = {
  getAccessToken: (): Promise<string | null | undefined> =>
    new Promise(() => {
      return undefined;
    }),
};

export const KeycloakAuthenticationContext = React.createContext(defaultKeycloakAuthentication);

WebBrowser.maybeCompleteAuthSession();

type Props = {
  children: ReactElement;
  urlDiscovery: string;
  clientId: string;
  indicator?: boolean;
};

const KeycloakAuthentication = ({ children, urlDiscovery, clientId, indicator }: Props): ReactElement => {
  const dispatch = useDispatch();
  const identity = useSelector((state: RootState) => state.identity);
  const [code, setCode] = React.useState<string | null>(null);
  const [working, setWorking] = React.useState<boolean>(false);
  const discovery = AuthSession.useAutoDiscovery(urlDiscovery);
  const redirectUri = AuthSession.makeRedirectUri({
    native: 'neemop://redirect',
  });
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId,
      extraParams: { nonce: 'skjDgeF5sG' },
      scopes: ['openid'],
      redirectUri,
    },
    discovery,
  );

  // eslint-disable-next-line no-console
  console.log('redirectUri', redirectUri);
  React.useEffect(() => {
    switch (response?.type) {
      case 'cancel': //  the user cancelled the authentication session by closing the browser,
        setWorking(false);
        dispatch(clearIdentity());
        break;
      case 'dismiss': // If the authentication is dismissed manually with AuthSession.dismiss()
        setWorking(false);
        dispatch(clearIdentity());
        break;
      case 'locked': // AuthSession.startAsync called more than once before the first call has returned
        // do nothing, already working on logging in
        break;
      case 'error': //  the authentication flow returns an error
        if (Platform.OS === 'web') {
          // eslint-disable-next-line no-alert
          alert(`Authentication error: ${response.params.error_description}`);
        } else {
          Alert.alert(`Authentication error: ${response.params.error_description}`);
        }
        setWorking(false);
        dispatch(clearIdentity());
        break;
      case 'success': // authentication flow is successful
        setCode(response.params.code);
        response.params.code = ''; // this code is now invalid.
        break;
      default:
        break;
    }
  }, [response]);

  React.useEffect(() => {
    const getAccesTokenFromCode = async (verificationCode: string) => {
      try {
        const authCode = await AuthSession.exchangeCodeAsync(
          {
            clientId,
            redirectUri,
            code: verificationCode,
            extraParams: {
              code_verifier: request!.codeVerifier || '',
            },
          },
          discovery!,
        );

        setWorking(false);
        dispatch(
          setIdentityFromAuthCode({
            idToken: authCode.idToken,
            accessToken: authCode.accessToken,
            expiresIn: authCode.expiresIn,
            refreshToken: authCode.refreshToken,
          }),
        );
        dispatch(setLoginState('loggedin'));
      } catch (e) {
        if (Platform.OS === 'web') {
          // eslint-disable-next-line no-alert
          alert(`getTokenFromCode error: ${e.message || 'something went wrong'}`);
        } else {
          Alert.alert(`getTokenFromCode error: ${e.message || 'something went wrong'}`);
        }
        setWorking(false);
        dispatch(clearIdentity());
      }
    };
    if (code) {
      getAccesTokenFromCode(code).then(() => {
        setCode(null);
      });
    }
  }, [code]);

  const getTokenFromRefresh = async (): Promise<string | null> => {
    try {
      const authCode = await AuthSession.refreshAsync(
        {
          clientId,
          refreshToken: identity.refreshToken || '',
        },
        discovery!,
      );
      setWorking(false);
      dispatch(
        setIdentityFromAuthCode({
          idToken: authCode.idToken,
          accessToken: authCode.accessToken,
          expiresIn: authCode.expiresIn,
          refreshToken: authCode.refreshToken,
        }),
      );
      dispatch(setLoginState('loggedin'));
      return authCode.accessToken;
    } catch (e) {
      if (Platform.OS === 'web') {
        // eslint-disable-next-line no-alert
        alert(`getTokenFromRefresh error: ${e.message || 'something went wrong'}`);
      } else {
        Alert.alert(`getTokenFromRefresh error: ${e.message || 'something went wrong'}`);
      }
      setWorking(false);
      dispatch(setLoginState('loggedout'));
      dispatch(clearIdentity());
    }
    return null;
  };

  keycloak.context = {
    loginState: identity.loginState,
    working,
    getAccessToken: async (): Promise<string | null | undefined> => {
      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.log('getAccessToken: loginState=', identity.loginState);
      }
      if (identity.loginState === 'loggedin') {
        const now = Math.round(new Date().getTime() / 1000);
        if (now > (identity.accessExpiry || 0) - 60) {
          if (__DEV__) {
            // eslint-disable-next-line no-console
            console.log('getAccessToken: accessToken expired');
          }
          if (now < (identity.refreshExpiry || 0) - 60) {
            if (__DEV__) {
              // eslint-disable-next-line no-console
              console.log('getAccessToken: getting new accesstoken');
            }
            return getTokenFromRefresh();
          }
          if (__DEV__) {
            // eslint-disable-next-line no-console
            console.log('getAccessToken: refreshToken expired too: forcing login');
          }
          dispatch(setLoginState('loggedout'));
          dispatch(clearIdentity());
          return undefined;
        }
        if (__DEV__) {
          // eslint-disable-next-line no-console
          console.log('getAccessToken: returning access token, starts with:', identity.accessToken?.slice(0, 16));
        }
        return identity.accessToken;
      }
      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.log('getAccessToken: returning undefined');
      }
      return undefined;
    },
    login: (): void => {
      setWorking(true);
      dispatch(setLoginState('weblogin'));
      promptAsync().then();
    },
    logout: async (): Promise<void> => {
      // Unfortunately keycloak does not provide a revocation endpoint
      // await AuthSession.revokeAsync(
      //   {
      //     token: identity.accessToken || '',
      //     tokenTypeHint: AuthSession.TokenTypeHint.AccessToken,
      //   },
      //   discovery!,
      // );
      setWorking(false);
      dispatch(setLoginState('loggedout'));
      dispatch(clearIdentity());
    },
  };
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.log(keycloak.context);
  }
  const styles = applyTheme(localStyles);
  if (indicator && working) {
    return (
      <View style={styles.activity}>
        <ActivityIndicator size="large" color={ThemeProvider.value('$tintColor')} />
      </View>
    );
  }
  return (
    <KeycloakAuthenticationContext.Provider value={keycloak.context}>{children}</KeycloakAuthenticationContext.Provider>
  );
};

export default KeycloakAuthentication;

export function useKeycloakAuthentication(): KeycloakAuthenticationType {
  const context = React.useContext(KeycloakAuthenticationContext);
  return context as KeycloakAuthenticationType;
}

const styles = ThemeProvider.create({
  activity: {
    flex: 1,
    backgroundColor: 'darkgrey',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const localStyles = styles;
