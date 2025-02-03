import { SyntheticEvent, useState } from "react"
import Image from "next/image"
import logo from "../styles/yapx_logo.png"
import Input from "@/components/input"
import ButtonBlue from "@/components/button_blue"
import ButtonTransparent from "@/components/button_transparent"
import { InputEvent } from "@/types/events"

export default function SignInView() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const getEmail = (e: InputEvent) => {
    setEmail(e.target.value)
  }
  const getPassword = (e: InputEvent) => {
    setPassword(e.target.value)
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

