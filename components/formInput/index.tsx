import styles from '../../styles/FormInput.module.css';

export interface FormInputProps {
  type: string;
  id: string;
  ariaLabel: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error: string;
  className: string;
}

export default function FormImput({type, id, ariaLabel, value, onChange, placeholder, error, className}: FormInputProps) {
  return (
    <section className={className}>
      <input
        type={type}
        id={id}
        name={id}
        aria-label={ariaLabel}
        className={styles.input}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <span className={styles.inputError}>
        {error}
      </span>
    </section>
  )
}