import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import styles from './PixelInput.module.css'

type BaseProps = {
  label: string
  name: string
  multiline?: boolean
}

type InputProps = BaseProps &
  InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement>

export function PixelInput({
  label,
  name,
  multiline = false,
  ...props
}: InputProps) {
  return (
    <div className={styles.field}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>

      <div className={styles.wrap}>
        <div className={`${styles.border} ${styles.clip}`} />
        <div className={`${styles.fill} ${styles.clip}`} />

        {multiline ? (
          <textarea
            id={name}
            name={name}
            className={`${styles.input} ${styles.textarea}`}
            rows={4}
            {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            id={name}
            name={name}
            className={styles.input}
            {...(props as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
      </div>
    </div>
  )
}