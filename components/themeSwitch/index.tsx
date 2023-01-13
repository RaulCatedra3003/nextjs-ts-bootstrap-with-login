import useConfigContext from '../../context/appconfig'

export interface ThemeSwitchProps {
  className: string;
}

export default function ThemeSwitch({className}: ThemeSwitchProps) {
  const { theme, setTheme } = useConfigContext()

  function handleOnChange (e: React.ChangeEvent<HTMLInputElement>) {
    e.stopPropagation()
    theme === 'dark' ? setTheme && setTheme('light') : setTheme && setTheme('dark')
  }

  return (
    <div className={`theme-switch ${className}`}>
      <input
        className="theme-switch-input"
        id="theme-switch-input"
        type="checkbox"
        checked={theme === 'dark' ? true : false}
        onChange={handleOnChange}
      />
      <label
        className="theme-switch-label"
        htmlFor="theme-switch-input"
      >
        <span className="theme-switch-span" />
      </label>
      <i className={ theme === 'dark' ? 'bx bx-moon theme-switch-icon' : 'bx bx-sun theme-switch-icon'} />
    </div>
  )
}
