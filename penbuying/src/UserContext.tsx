import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  PropsWithChildren,
} from 'react';
import { User } from './userPage/Register';

export interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const defaultUser: User = {
  user_id: '',
  user_pw: '',
  user_access: 0,
  user_name: '',
  user_phone_number: '',
  user_email: '',
};

const UserContext = createContext<UserContextType>({
  user: defaultUser,
  setUser: () => {},
});

export function UserProvider(props: PropsWithChildren<unknown>) {
  const [user, setUser] = useState<User>(defaultUser);
  const { children } = props;

  const value: UserContextType = useMemo(
    () => ({ user, setUser }),
    [user, setUser],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
