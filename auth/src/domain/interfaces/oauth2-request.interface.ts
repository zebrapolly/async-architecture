export interface OAuth2Request {
  readonly grantType: string;
  readonly clientId: string;
  readonly clientSecret: string;
  readonly exp?: number;
  readonly iat?: number;
  readonly scopes?: string | string[];
  readonly refreshToken?: string;
  readonly username?: string;
  readonly password?: string;
}