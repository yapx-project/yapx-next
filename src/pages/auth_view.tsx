import { useState } from "react"
import Image from "next/image"
import logo from "../styles/yapx_logo.png"

export default function AuthView() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const getEmail = (t: string) => {
    console.log(t)
    setEmail(t)
  }
  const getPassword = (t: string) => {
    console.log(t)
    setPassword(t)
  }

  return (
    <div className="flex flex-col h-dvh justify-between bg-primary_gray">
      <header className="h-14 flex items-center bg-white">
        <Image className="ml-5" src={logo} alt="logo" />
      </header>
      <main className="m-5">
        <h1 className="font-roboto text-2xl mb-4">Вход в аккаунт</h1>
        <form className="flex flex-col ">
          <div className="flex flex-col gap-4">
            <Input title="Email" placeholder="Yaropolk@yandex.ru" type="email" getValue={getEmail} value={email} />
            <Input title="Пароль" placeholder="******" type="password" getValue={getPassword} value={password} />
          </div>
          <div className="flex flex-row-reverse mt-1">
            <label className="text-xs font-inter text-gray-500">Забыли пароль?</label>
          </div>
          <ButtonBlue className="mt-4" title="Войти" />
        </form>
        <div className="flex flex-col gap-4 mt-10">
          <label className="text-xs font-inter text-gray_title_light">У вас ещё нет аккаунта?</label>
          <label className="text-sm font-inter text-primary_blue">зарегистрироваться</label>
        </div>
      </main>
      <footer className="h-14 flex items-center gap-2 bg-white border-t border-t-gray-300">
        <ButtonTransparent className="flex-grow ml-5" title="Зарегистрироваться" />
        <ButtonBlue className="flex-grow mr-5" title="Войти" />
      </footer>
    </div>
  )
}

function ButtonBlue({ className, title }: any) {
  return (
    <button className={`h-10 bg-primary_blue rounded-md font-inter font-semibold text-sm text-white ${className}`}>{title}</button>
  )
}

function ButtonTransparent({ className, title }: any) {
  return (
    <button className={`h-10 bg-transparent border border-gray-500 rounded-md font-inter font-semibold text-sm text-black ${className}`}>{title}</button>
  )
}

function Input({ title, placeholder, type, getValue, value }: any) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-inter text-gray-600">{title}</label>
      <input
        className="h-9 bg-primary_gray border border-input_border rounded p-3 placeholder-gray_title_light text-sm font-inter"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => getValue(e.target.value)}
      />
    </div>
  )
}
