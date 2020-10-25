/* eslint-disable camelcase */
export interface RefreshToken {
  acr?: string;
  'allowed-origins'?: string[];
  aud?: string;
  auth_time?: number;
  azp?: string;
  email?: string;
  exp?: number;
  family_name?: string;
  given_name?: string;
  iat?: number;
  iss?: string;
  jti?: string;
  name?: string;
  nbf?: number;
  nonce?: string;
  preferred_username?: string;
  realm_access?: {
    roles?: string[];
  };
  resource_access?: {
    account?: {
      roles?: string[];
    };
  };
  scope?: string;
  session_state?: string;
  sub?: string;
  typ?: string;
}

export interface IdToken {
  acr?: string;
  aud?: string;
  auth_time?: number;
  azp?: string;
  email?: string;
  exp?: number;
  family_name?: string;
  given_name?: string;
  iat?: number;
  iss?: string;
  jti?: string;
  name?: string;
  nbf?: number;
  nonce?: string;
  preferred_username?: string;
  session_state?: string;
  sub?: string;
  typ?: string;
}
