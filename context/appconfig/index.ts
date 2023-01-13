import { useContext, createContext, useState, useEffect, createElement } from 'react';

import config from '../../config';
import { Languaje } from '../../utils/defaultLanguage';

export interface InitialState {
  theme: string;
  language: Languaje,
  setTheme?: (theme: string) => void
}

export interface ConfigContextProviderProps {
  children: React.ReactNode;
}

const initalState: InitialState = {
  theme: 'light',
  language: config.defaultLanguage,
}

const noReRun = false
const ConfigContext = createContext(initalState);

export const ConfigContextProvider = ({ children }: ConfigContextProviderProps) => {
  const [state, setState] = useState (initalState)

  useEffect(() => {
    let theme = null;
    let language = null;
    const localTheme = localStorage.getItem('theme')
    if (localTheme) {
      theme = JSON.parse(localTheme)
    }

    const locallanguage = localStorage.getItem('language')
    if(locallanguage) {
      language = JSON.parse(locallanguage)
    }

    if (theme) {
      setTheme(theme)
    }
    if (language) {
      // const opt = {
      //   method: 'GET',
      //   headers:{
      //     'Content-Type': 'application/json',
      //   }
      // }
      // fetch(`${config.apiUrl}/languaje/${language}`, opt)
      //   .then(res => res.json())
      //   .then(data => {
      //     setLanguage(data);
      //   })
      //   .catch(error => {console.log(error.message)})
    }
  }, [noReRun])

  function setTheme (newTheme: string) {
    setState({
      ...state,
      theme: newTheme
    })
    localStorage.setItem('theme', JSON.stringify(newTheme))
  }

  function setLanguage (newLanguage: Languaje) {
    setState({
      ...state,
      language: newLanguage
    })
    localStorage.setItem('language', JSON.stringify(newLanguage))
  }

  const values = { ...state, setTheme, setLanguage }
  // Interface donde será expuesto como proveedor y envolverá la App.
  return createElement(ConfigContext.Provider, {value: values }, children)
}

//
export function useConfigContext() {
  const context = useContext(ConfigContext);

  if(!context){
    console.error('Error deploying App Context!!!');
  }

  return context;
}

export default useConfigContext