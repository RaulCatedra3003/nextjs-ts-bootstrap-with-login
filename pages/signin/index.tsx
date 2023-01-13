import React, { useState } from 'react'
import Link from 'next/link'

import styles from '../../styles/Signin.module.css'

import FormImput from '../../components/formInput'
import FormPasswordInput from '../../components/formPasswordInput'
import Header from '../../components/header'
import useForm from '../../hooks/useForm'
import signinSchema from '../../utils/validationSchemas/signIn'
import config from '../../config'
import useConfigContext from '../../context/appconfig'

export default function SignIn() {
  const [created, setCreated] = useState('')
  const { language } = useConfigContext()
  const {formValues, handleInputChange, isValid, errors} = useForm(
    {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      surname: ''
    },
    signinSchema
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
      const res = await fetch(`${config.apiUrl}signin`, opt)
      if (res.status === 200) {
        setCreated('User created correctly, check your mail to validate it')
      } else {
        const { message } = await res.json()
        setCreated(message)
      }
    }
  }

  return (
    <>
      <Header/>
      <main className='main main-small'>
        <Link href='/login' className={styles.signinLink}>{language.schema.user.loginlink}</Link>
        <form className={styles.signinForm} onSubmit={handleSubmit}>
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
          <FormImput
            type="text"
            id="name"
            ariaLabel={language.schema.user.name}
            className="form-input"
            value={formValues.name}
            onChange={handleInputChange}
            placeholder={language.schema.user.name}
            error={errors?.name ? errors?.name : ' '}
          />
          <FormImput
            type="text"
            id="surname"
            ariaLabel={language.schema.user.surname}
            className="form-input"
            value={formValues.surname}
            onChange={handleInputChange}
            placeholder={language.schema.user.surname}
            error={errors?.surname ? errors?.surname : ' '}
          />
          { created ? <span className='info'>{created}</span> : '' }
          <button type='submit' className={styles.signinFormButton}>{language.schema.user.signinLink}</button>
        </form>
      </main>
    </>
  )
}
