import React from 'react'
import useConfigContext from '../context/appconfig'

export interface ThemeProviderProps {
  children: React.ReactNode
}

export default function ThemeProvider({children}: ThemeProviderProps) {
  const {theme} = useConfigContext()
  return <div className={theme}>{children}</div>
}