import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import config from '../../config'
import loginSchema from '../../utils/validationSchemas/login'
import useUserContext from '../../context/user'
import useForm from '../../hooks/useForm'
import FormPasswordInput from '../../components/formPasswordInput'
import FormImput from '../../components/formInput'
import Header from '../../components/header'
import useConfigContext from '../../context/appconfig'

export default function Login() {
  const [error, setError] = useState('')
  const router = useRouter()
  const { signin } = useUserContext()
  const { language } = useConfigContext()
  const { formValues, handleInputChange, isValid, errors } = useForm(
    {
      email: '',
      password: ''
    },
    loginSchema
  )

  async function handleSubmit (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isValid()) {
      const opt = {
        method: 'POST',
        body: JSON.stringify(formValues),
        headers:{
          'Content-Type': 'application/json'
        }
      }
      const res = await fetch(`${config.apiUrl}/login`, opt)
      if (res.status === 200) {
        const {data}= await res.json()
        signin && signin({
          name: data.name,
          role: data.role,
          image: data.image
        }, data.token)
        router.push('/')
      } else {
        const {message}= await res.json()
        setError(message)
      }
    }
  }

  return (
    <>
      <Header/>
      <main className='main main-small'>
        <Link href='/signin' className='signin-link'>{language.schema.user.sigin}</Link>
        <form className='login-form' onSubmit={handleSubmit}>
          <FormImput
            type="email"
            id="email"
            ariaLabel={language.schema.user.email}
            className='form-input'
            value={formValues.email}
            onChange={handleInputChange}
            placeholder={language.schema.user.email}
            error={errors?.email ? errors?.email : ' '}
          />
          <FormPasswordInput
            id="password"
            ariaLabel={language.schema.user.password}
            className='form-input'
            value={formValues.password}
            onChange={handleInputChange}
            placeholder={language.schema.user.password}
            error={errors?.password ? errors.password : ' '}
          />
          { error ? <span className='info'>{error}</span> : '' }
          <button type='submit' className='login-form__button'>{language.schema.user.login}</button>
        </form>
        <Link href='/forgotpassword' className='signin-link'>{language.schema.user.forgotPassword}</Link>
      </main>
    </>
  )
}
