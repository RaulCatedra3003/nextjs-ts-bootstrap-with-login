import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import config from '../../../config'
import updateUserSchema from '../../../utils/validationSchemas/updateUser'
import useForm from '../../../hooks/useForm'
import FormImput from '../../../components/formInput'
import FormPasswordInput from '../../../components/formPasswordInput'
import useImgPreview from '../../../hooks/useImgPreview'
import ImgEdit from '../../../components/imgEdit'
import useUserContext from '../../../context/user'
import useConfigContext from '../../../context/appconfig'

export default function ProfileConfig () {
  const router = useRouter ()
  const [updated, setUpdated] = useState(undefined)
  const { language } = useConfigContext()
  const { user, token, logedIn } = useUserContext()
  const {formValues, handleInputChange, isValid, errors, setFormValues} = useForm(
    {
      name: '',
      surname: '',
      password: '',
      confirmPassword: ''
    },
    updateUserSchema
  )
  const { stateImg, handleImageChange, handleImage, refId } = useImgPreview(
    'image',
  )
  const { urlPreview, file } = stateImg

  useEffect(() => {
    if (!logedIn) {
      router.push('/login')
    }
    const token = localStorage.getItem('token')
    const opt ={
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
    fetch(`${config.apiUrl}/user`, opt)
      .then(res => res.json())
      .then(data => {
        setFormValues({
          name: data.name,
          surname: data.surname,
        })
      })
      .catch(error => {
        console.log(error.message)
      })
  })

  function handleGoBack () {
    router.back()
  }

  async function handleSubmit (e: React.FormEvent) {
    e.preventDefault()
    if (isValid()) {
      let fileData
      const fileBody = new FormData();
      fileBody.append("file", file);
      const fileResponse = await fetch(`${config.apiUrl}/image`);
      if (fileResponse.status === 200) {
        fileData = fileResponse.json()
      }
      const body = {
        ...formValues,
        ...fileData
      }
      const opt = {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      const res = await fetch(`${config.apiUrl}/user`, opt)
      const { data } = await res.json()
      if (res.status === 200) {
        setUpdated(data)
      } else {
        setUpdated(data.message)
      }
    }
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
              <ImgEdit
                handleImage={handleImage}
                handleImageChange={handleImageChange}
                urlPreview={urlPreview}
                refId={refId}
                defaultImg={user?.image}
                rounded
              />
              <form className='signin-form' onSubmit={handleSubmit}>
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
                { updated && <span className='info'>{updated}</span> }
                <button type='submit' className='signin-form__button'>{language.schema.user.update}</button>
              </form>
            </section>
          </main>)
        : (<div></div>)
      }
    </>
  )
}
