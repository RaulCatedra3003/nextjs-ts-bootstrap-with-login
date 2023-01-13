import Link from 'next/link'

import Header from '../../components/header'
import useConfigContext from '../../context/appconfig'
import config from '../../config'
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export interface MailValidatedProps {
  token?: string;
}

export async function getServerSideProps(context: { params: { token: string } }) {
  const { token } = context.params
  const opts = {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }
  const res = await fetch(`${config.apiUrl}/mailvalidated`, opts);
  if (res.status === 200) {
    return {
      props: { token } // will be passed to the page component as props
    }
  } else {
    return {
      props: { token: false }
    }
  }
}

export default function MailValidated (props: MailValidatedProps) {
  const { token } = props;
  const { language } = useConfigContext()
  const router = useRouter()

  useEffect(() => {
    if (!token) {
      router.push('/404')
    } else {
      setTimeout(() => {router.push('/dasboard')}, 6000);
    }
  })

  return (
    <>
      {
        token
          ? (
            <>
              <Header/>
              <main className='main'>
                <h1 className='title'>{language.schema.profile.title}</h1>
                <Link href='/dashboard' className='signin-link'>{language.schema.user.dashboard}</Link>
              </main>
            </>
          )
          : (<div></div>)
      }
    </>
  )
}