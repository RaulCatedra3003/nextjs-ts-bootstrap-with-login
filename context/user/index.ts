import React, { useContext, createContext, useState, useEffect } from 'react';

import config from '../../config'

export interface UserInitialState {
  logedIn: boolean;
  user: User;
  token?: string;
  clearAuth?: () => void;
  signin?: (newUser: User, token: string) => void;
}

export interface User {
  image: string;
  name?: string;
  surname?: string;
  role?: string;
  email?: string;
}

export interface UserContextProviderProps {
  children: React.ReactNode
}

export interface FetchData {
  data?: User;
  token?: string;
}

const initialState: UserInitialState = {
  logedIn: true,
  user: {
    image: 'https://www.softzone.es/app/uploads/2018/04/guest.png'
  },
  token: undefined
}

const UserContext = createContext(initialState);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [state, setState] = useState(initialState)

  const fetchData = async () => {
    try {
      let token
      const localToken = localStorage.getItem('token')
      if (localToken) {
        token = JSON.parse(localToken)
      }

      if (token) {
        const opt = {
          method: 'GET',
          headers:{
            'Content-Type': 'application/json'
          }
        }
        const res = await fetch(`${config.apiUrl}/login/${token}`, opt)
        if (res.status === 200) {
          const { data } = await res.json()
          return {
            data,
            token
          }
        } else {
          localStorage.setItem('token', '')
          return {
            data: false,
            token: false
          }
        }
      }
    } catch (error) {
      return {
        data: false,
        token: false
      }
    }
  }

  useEffect(() => {
    fetchData().then((response) => {
      if (response && response.data && response.token) {
        signin({
          name: response.data.name,
          role: response.data.role,
          image: response.data.image
        }, response.token)
      }
    })
  })

  function signin (newUser: User, token: string) {
    setState({
      ...state,
      logedIn: true,
      user: newUser,
      token: token
    })
    localStorage.setItem('token', JSON.stringify(token))
  }

  function clearAuth () {
    setState({
      logedIn: false,
      user: {
        image: 'https://www.softzone.es/app/uploads/2018/04/guest.png'
      },
      token: undefined
    })
    localStorage.setItem('token', '')
  }

  const values = { ...state, signin, clearAuth }

  return React.createElement(UserContext.Provider, {value: values}, children)
}

export function useUserContext() {
  const context = useContext(UserContext);

  if(!context){
    console.error('Error deploying App Context!!!');
  }

  return context;
}

export default useUserContext