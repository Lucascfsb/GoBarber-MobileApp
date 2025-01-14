import React, {createContext, ReactNode, useCallback, useState, useContext, useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "../services/api";

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface AuthState {
  token: string,
  user: User;
}

interface SingInCredentials {
  email: string,
  password: string,
}

interface AuthContextData {
  user: User;
  token: string;
  loading: boolean
  signIn(credentials: SingInCredentials): Promise<void>,
  signOut(): void,
  updateUser(user: User): Promise<void> 
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [data, setData] = useState<AuthState>({} as AuthState)
    const [loading , setLoading] = useState(true)

    useEffect(() => {
      async function loadStorageData(): Promise<void> {
        const [token, user] = await AsyncStorage.multiGet([
          '@GoBarber:token',
          '@GoBarber:user',
        ]);

        if (token[1] && user[1]) {
          api.defaults.headers.common['Authorization'] = `Bearer ${token[1]}`;
          setData({ token : token[1], user: JSON.parse(user[1]) })
        }

        setLoading(false)
      }
      loadStorageData()
    }, [])

  const signIn = useCallback (async ({ email, password }: SingInCredentials) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { user, token} = response.data

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    await AsyncStorage.multiSet([
      ['@GoBarber:token', token],
      ['@GoBarber:user', JSON.stringify(user)]
    ])

    setData({ token, user })
  }, [])

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove([
      '@GoBarber:user',
      '@GoBarber:token',
    ]);

    setData({} as AuthState)
  }, [])

  const updateUser = useCallback(async(user: User)=>{
    await AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user));
    setData({ token: data.token, user })

    }, 
    [setData, data.token]
  )

  return(
    <AuthContext.Provider value={{user: data.user, signIn, signOut, token: data.token, loading, updateUser}}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext)
  if(!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export { AuthProvider, useAuth }
