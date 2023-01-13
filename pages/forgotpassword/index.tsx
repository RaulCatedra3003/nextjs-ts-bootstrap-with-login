import { useState } from 'react'
import Link from 'next/link'

import forgotPasswordSchema from '../../utils/validationSchemas/forgotPassword'
import useForm from '../../hooks/useForm'
import Header from '../../components/header'
import FormImput from '../../components/formInput'
import config from '../../config'
import useConfigContext from '../../context/appconfig'

export default function ForgotPassword () {
  const [response, setResponse] = useState('')
  const { language } = useConfigContext()
  const {formValues, handleInputChange, isValid, errors} = useForm(
    {
      email: '',
    },
    forgotPasswordSchema
  )

  async function handleSubmit (e: React.FormEvent) {
    e.preventDefault()
    if (isValid()) {
      const opt = {
        method: 'POST',
        body: JSON.stringify(formValues),
        headers:{
          'Content-Type': 'application/json'
        }
      }
      const res = await fetch(`${config.apiUrl}forgotpassword`, opt)
      if (res.status === 200) {
        setResponse('Check your mail to continue')
      } else {
        const {message}= await res.json()
        setResponse(message)
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
            className="form-input"
            value={formValues.email}
            onChange={handleInputChange}
            placeholder={language.schema.user.email}
            error={errors?.email ? errors?.email : ' '}
          />
          { response ? <span className='info'>{response}</span> : '' }
          <button type='submit' className='login-form__button'>{language.schema.user.sendMail}</button>
        </form>
      </main>
    </>
  )
}
