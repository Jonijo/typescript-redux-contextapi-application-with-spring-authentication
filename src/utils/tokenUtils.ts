import {jwtDecode} from 'jwt-decode';

export interface JwtPayload {
  sub?: string;          // standard: subject
  name?: string;         // optional: user name
  username?: string;     // custom field
  email?: string;
  iat?: number;          // issued at
  exp: number;           // expiration time
  role?: string;         // custom field (e.g. user role)
  [key: string]: unknown; // allows other optional custom fields
}

export const isTokenExpired = (token: string): boolean => {
  try {
    const { exp } = jwtDecode<JwtPayload>(token);
    if (!exp) return true;
    const now = Date.now() / 1000;
    return exp < now;
  } catch (error) {
    console.log(error);
    return true; // Treat any decoding error as expired
  }
};

export const getUsernameFromToken = (token: string): string | null => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    console.log("decoded token as " + JSON.stringify(decoded));
    return decoded.sub ?? null;
  } catch {
    return null;
  }
};