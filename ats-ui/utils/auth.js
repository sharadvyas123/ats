// utils/auth.js
import { destroyCookie } from 'nookies';

export function logout() {
  destroyCookie(null, 'access_token');
}
