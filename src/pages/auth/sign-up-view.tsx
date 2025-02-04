import { useState } from "react"
import Image from "next/image"
import logo from "../styles/yapx_logo.png"
import Input from "@/components/input"
import ButtonBlue from "@/components/button_blue"
import { InputEvent } from "@/types/events"

export default function SignUpView() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [passwordRep, setPasswordRep] = useState("")

  const getName = (e: InputEvent) => { setName(e.target.value) }
  const getEmail = (e: InputEvent) => { setEmail(e.target.value) }
  const getLogin = (e: InputEvent) => { setLogin(e.target.value) }
  const getPassword = (e: InputEvent) => { setPassword(e.target.value) }
  const getPasswordRep = (e: InputEvent) => { setPasswordRep(e.target.value) }

  return (
    <div className="flex flex-col h-dvh justify-between bg-primary_gray">
      <header className="h-14 flex items-center bg-white">
        <Image className="ml-5" src={logo} alt="logo" />
      </header>
      <main className="m-5">
        <h1 className="font-roboto text-2xl mb-4">Регистрация</h1>
        <form className="flex flex-col ">
          <div className="flex flex-col gap-4">
            <Input title="Имя" placeholder="Ярополк" type="text" getValue={getName} value={name} />
            <Input title="Email" placeholder="Yaropolk@yandex.ru" type="email" getValue={getEmail} value={email} />
            <Input title="Логин" placeholder="Yaropolk" type="text" getValue={getLogin} value={login} />
            <Input title="Придумайте пароль" placeholder="******" type="password" getValue={getPassword} value={password} />
            <Input title="Повторите пароль" placeholder="******" type="text" getValue={getPasswordRep} value={passwordRep} />
          </div>
          <ButtonBlue className="mt-4" title="Зарегистрироваться" />
        </form>
      </main>
      <footer className="h-14 bg-white border-t border-t-gray-300"></footer>
    </div>
  )
}


