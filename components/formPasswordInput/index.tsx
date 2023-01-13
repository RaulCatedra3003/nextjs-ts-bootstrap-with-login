import { useState } from 'react'

import styles from '../../styles/FormPasswordInput.module.css'

export interface FormPasswordInputProps {
  id: string;
  ariaLabel: string;
  className: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error: string;
}

export default function FormPasswordInput({id, ariaLabel, className, value, onChange, placeholder, error}: FormPasswordInputProps) {
  const [viewPassword, setViewPassword] = useState(false)

  function handleToglePasswordView () {
    setViewPassword(!viewPassword)
  }

  return (
    <section className={`${className}`}>
      <section className={styles.sectionInput}>
        <input
          id={id}
          name={id}
          aria-label={ariaLabel}
          type={viewPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={styles.sectionInputInput}
        />
        {viewPassword ? (
          <button
            type="button"
            className="section-input__input-button bx bxs-low-vision"
            onClick={handleToglePasswordView}
          />
        ) : (
          <button
            type="button"
            className={styles.sectionInputInputButton}
            onClick={handleToglePasswordView}
          />
        )}
      </section>
      <span className={styles.inputError}>
        {error}
      </span>
    </section>
  )
}