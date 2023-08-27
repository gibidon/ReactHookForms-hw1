import { useState, useRef } from "react"
import styles from "./FormWithValidation.module.css"

export default function FormWithValidation() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
  })
  const [errors, setErrors] = useState(null)
  const { email, password, passwordConfirmation } = formData
  const submitBtnRef = useRef()

  function checkFields(formData) {
    const regexMap = {
      email:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      password: /^[\w_]*$/,
      passwordConfirmation: /^[\w_]*$/,
    }
    let error = null
    if (formData.email === "" || formData.password === "") {
      error = "Поля не могут быть пустыми"
    } else if (!regexMap.email.test(formData.email)) {
      error = "Проверьте правильность ввода email"
    } else if (!regexMap.password.test(formData.password)) {
      error = "В пароле допустимы только буквы, цифры и нижнее подчеркивание"
    } else if (formData.password !== formData.passwordConfirmation) {
      error = "Пароли не совпадают"
    } else if (error === null) {
      submitBtnRef.current.disabled = false
      submitBtnRef.current.focus()
    }

    setErrors(error)
  }

  function onChange(fieldName, value) {
    setFormData({ ...formData, [fieldName]: value })
    checkFields({ ...formData, [fieldName]: value })
  }

  let hasError = errors !== null || Object.values(formData).some((value) => value === "")

  return (
    <form
      onSubmit={(e) => {
        console.log("form submitted", formData)
      }}
    >
      <div>Заполните поля формы:</div>
      {errors && <div className={styles.errors}>{errors}</div>}
      <label htmlFor="email">Введите адрес почты:</label>
      <input
        type="text"
        name="email"
        id="email"
        value={email}
        onChange={({ target }) => onChange("email", target.value)}
      />
      <br />
      <label htmlFor="password">Введите пароль:</label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={({ target }) => onChange("password", target.value)}
      />
      <br />
      <label htmlFor="passwordConfirmation">Подтвердите пароль:</label>
      <input
        type="password"
        name="passwordConfirmation"
        id="passwordConfirmation"
        value={passwordConfirmation}
        onChange={({ target }) => onChange("passwordConfirmation", target.value)}
      />
      <br />
      <button type="submit" disabled={hasError} ref={submitBtnRef}>
        submit form
      </button>
    </form>
  )
}
