import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

import useUserContext from '../../context/user'
import { useEffect } from 'react'
import useConfigContext from '../../context/appconfig'

export default function Prifile () {
  const { user, logedIn } = useUserContext()
  const router = useRouter()
  const { language } = useConfigContext()

  useEffect(() => {
    if (!logedIn) {
      router.push('/login');
    }
  })

  function handleGoBack () {
    router.back()
  }

  return (
    <>
      {
        logedIn
          ? (<main className='profile main-small'>
            <section className='header'>
              <button  className='header-back' onClick={handleGoBack}><i className='bx bx-left-arrow-alt'/>{language.schema.user.goBack}</button>
            </section>
            <section className='main'>
              <Image src={user.image} className='profile-img' width={300} height={300} alt='profile-image'/>
              <h1 className='profile-title'>{`Hi, ${user.name} !`}</h1>
              <Link href='/profile/config' className='profile-button'>{language.schema.profile.edit}</Link>
            </section>
          </main>)
        : (<div></div>)
      }
    </>
  )
}