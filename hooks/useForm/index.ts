import { useState } from 'react'
import { ObjectSchema } from 'joi'
import useConfigContext from '../../context/appconfig'



export default function useForm (initialState: Record<string, any> = {}, schema: ObjectSchema) {
  const { language } = useConfigContext()
  const errorsInitialState: Record <string, string> = {}
  const [formValues, setFormValues] = useState(initialState)
  const [errors, setErrors] = useState(errorsInitialState)

  function handleInputChange (e: React.ChangeEvent<HTMLInputElement>) {
    if ( e.target?.type === 'checkbox' ) {
      setFormValues({ ...formValues, [e.target?.name]: e.target?.checked })
    }
    else {
      setFormValues({ ...formValues, [e.target?.name]: e.target?.value })
    }
  }

  function resetForm () {
    setFormValues(initialState)
  }

  function errorFormater (array: any[], key = 'path') {
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: item.message
          .replace(/"/g, '')
          .replace(/confirmPassword must be \[ref:password\]/g, language.schema.errors.passDoesNotMatch)
          .replace(/(password with value)(\s.+\s)(fails to match the required pattern:)(\s.+)/g, language.schema.errors.passDoesNotPattern)
      }
    }, {})
  }




  function isValid ():boolean {
    const { error } = schema.validate( formValues, { abortEarly: false })
    if ( error ) {
      setErrors(errorFormater(error.details))
      return false
    }
    setErrors({})
    return true
  }

  return {
    formValues,
    handleInputChange,
    resetForm,
    isValid,
    errors,
    setFormValues
  }
}