import Amplify, { Auth } from 'aws-amplify';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { AwsConfigAuth } from '../auth';
import { getSpecificStudent } from '../services/userService';

Amplify.configure({ Auth: AwsConfigAuth });

interface UseAuth {
  isAdmin: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
  username: string;
  signIn: (username: string, password: string) => Promise<Result>;
  signOut: () => void;
  firstName: string;
  lastName: string;
}

interface Result {
  success: boolean;
  message: string;
  adminStatus?: boolean;
}

type Props = {
  children?: React.ReactNode;
};

const authContext = createContext({} as UseAuth);

export const ProvideAuth: React.FC<Props> = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = (): UseAuth => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(result => {
        setUsername(result.username.toLowerCase());
        setIsAuthenticated(true);
        setIsLoading(false);
      })
      .catch(() => {
        setUsername('');
        setIsAuthenticated(false);
        setIsLoading(false);
      });
  }, []);

  const signIn = async (username: string, password: string) => {
    try {
      const result = await Auth.signIn(username, password);
      const { user } = await getSpecificStudent(username);

      flushSync(() => {
        setUsername(user.username);
        setIsAuthenticated(true);
        setIsAdmin(user.isAdmin);
        setFirstName(user.firstName);
        setLastName(user.lastName);
      });

      return { success: true, message: '', adminStatus: user.isAdmin };
    } catch (error) {
      console.log('error');
      return {
        success: false,
        message: 'LOGIN FAIL',
      };
    }
  };

  const signOut = async () => {
    try {
      await Auth.signOut();
      setUsername('');
      setIsAuthenticated(false);
      return { success: true, message: '' };
    } catch (error) {
      return {
        success: false,
        message: 'LOGOUT FAIL',
      };
    }
  };

  return {
    firstName,
    lastName,
    isAdmin,
    isLoading,
    isAuthenticated,
    username,
    signIn,
    signOut,
  };
};
