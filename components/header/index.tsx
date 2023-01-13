import { useState } from 'react'
import ModalWraper from '../modalWraper'
import ThemeSwitch from '../themeSwitch'
import Link from 'next/link'
import Image from 'next/image'

import useUserContext from '../../context/user'
import useConfigContext from '../../context/appconfig'

export default function Header() {
  const {logedIn, user, clearAuth} = useUserContext()
  const { language } = useConfigContext()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserOpen, setIsUserOpen] = useState(false)

  function handleOpenMenu () {
    setIsMenuOpen(!isMenuOpen)
  }

  function handleOpenUser () {
    setIsUserOpen(!isUserOpen)
  }

  return (
    <>
      <header className='header'>
        <section className='menu'>
          {
            logedIn
              ? <button className='bx bx-menu-alt-left menu__button' onClick={handleOpenMenu} />
              : <Link href='/' className='nav__link nav__link-home'>{language.schema.header.home}</Link>
          }
        </section>
        <nav className='nav'/>
        <section className='user'>
          {
            logedIn
              ? <Image className='user__button__img' src={user?.image} onClick={handleOpenUser} width={100} height={100} alt='profile'/>
              : <button className='bx bx-menu-alt-right menu__button' onClick={handleOpenUser} />
          }
        </section>
      </header>
      {isMenuOpen &&
      <ModalWraper handleOpen={handleOpenMenu}>
        <section className='menu-container'>
          <Link href='/' className='nav__link nav__link-home'>{language.schema.header.home}</Link>
        </section>
      </ModalWraper>}
      {isUserOpen &&
      <ModalWraper handleOpen={handleOpenUser}>
        <section className='user-container'>
          {
            logedIn
              ? <section className='user-container__link user-container__link-login' onClick={clearAuth}>{language.schema.header.logout}</section>
              : <Link href='/login' className='user-container__link user-container__link-login'>{language.schema.header.login}</Link>
          }
          {
            logedIn && <Link href='/profile' className='user-container__link user-container__link-login'>{language.schema.header.profile}</Link>
          }
          <ThemeSwitch className='user-container__link user-container__link-theme'/>
        </section>
      </ModalWraper>}
    </>
  )
}
