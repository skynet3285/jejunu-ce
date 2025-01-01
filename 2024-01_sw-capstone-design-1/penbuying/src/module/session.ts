import { User } from './sqlOrm';

export function setSessionUser(user: User) {
  sessionStorage.setItem('userInfo', JSON.stringify(user));
}

export function getSessionUser(): User | null {
  const data = sessionStorage.getItem('userInfo');
  if (data !== null) {
    const userInfo = JSON.parse(data) as User;
    return userInfo;
  }
  return null;
}

export function removeSessionUser() {
  sessionStorage.removeItem('userInfo');
}
