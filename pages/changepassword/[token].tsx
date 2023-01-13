import { useEffect, useState } from 'react'

import FormPasswordInput from '../../components/formPasswordInput'
import Header from '../../components/header'
import useForm from '../../hooks/useForm'
import changePasswordSchema from '../../utils/validationSchemas/changePassword'
import config from '../../config'
import { useRouter } from 'next/router'
import useConfigContext from '../../context/appconfig'

export interface ChangePasswordProps {
  token: string;
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
  const res = await fetch(`${config.apiUrl}/changepassword`, opts);
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

export default function ChangePassword (props: ChangePasswordProps) {
  const { token } = props;
  const [created, setCreated] = useState('')
  const { language } = useConfigContext()
  const router = useRouter()
  const {formValues, handleInputChange, isValid, errors} = useForm(
    {
      password: token,
      confirmPassword: ''
    },
    changePasswordSchema
  )

  useEffect(() => {
    if (!token) {
      router.push('/404')
    }
  })

  async function handleSubmit (e: React.FormEvent) {
    e.preventDefault()
    if (isValid()) {
      const opt = {
        method: 'POST',
        body: JSON.stringify(formValues),
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      const res = await fetch(`${config.apiUrl}/changepassword`, opt)
      if (res.status === 200) {
        setCreated('Password updated correctly')
        setTimeout(() => router.push('/login'), 3000)
      } else {
        const { message } = await res.json()
        setCreated(message)
      }
    }
  }

  return (
    <>
      {
        token
          ? (<>
              <Header/>
              <main className='main main-small'>
                <form className='signin-form' onSubmit={handleSubmit}>
                  <FormPasswordInput
                    id="password"
                    ariaLabel={language.schema.user.password}
                    className="form-input"
                    value={formValues.password}
                    onChange={handleInputChange}
                    placeholder={language.schema.user.password}
                    error={errors?.password ? errors.password : ' '}
                  />
                  <FormPasswordInput
                    id="confirmPassword"
                    ariaLabel={language.schema.user.repeatPassword}
                    className="form-input"
                    value={formValues.confirmPassword}
                    onChange={handleInputChange}
                    placeholder={language.schema.user.repeatPassword}
                    error={errors?.confirmPassword ? errors.confirmPassword : ' '}
                  />
                  { created ? <span className='info'>{created}</span> : '' }
                  <button type='submit' className='signin-form__button'>{language.schema['changepassword/token'].changePassword}</button>
                </form>
              </main>
            </>
          )
          : (<div></div>)
    }
    </>)
}