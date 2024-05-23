import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  PropsWithChildren,
} from 'react';

interface User {
  user_id: string;
  user_pw?: string;
  user_access?: number;
  user_name?: string;
  user_phone_number?: string;
  user_email?: string;
}

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
