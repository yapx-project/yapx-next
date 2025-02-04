import Image from "next/image";
import logo from "../../styles/yapx_logo.png";
import Input from "@/components/input";
import ButtonBlue from "@/components/button_blue";
import ButtonTransparent from "@/components/button_transparent";
import { InputEvent } from "@/types/events";
import { useState } from "react";

export default function SignInView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const getEmail = (e: InputEvent) => {
    setEmail(e.target.value);
  };
  const getPassword = (e: InputEvent) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex h-dvh flex-col justify-between bg-primary_gray">
      <header className="flex h-14 items-center bg-white">
        <Image className="ml-5" src={logo} alt="logo" />
      </header>
      <main className="m-5">
        <h1 className="mb-4 font-roboto text-2xl">Вход в аккаунт</h1>
        <form className="flex flex-col">
          <div className="flex flex-col gap-4">
            <Input
              title="Email"
              placeholder="Yaropolk@yandex.ru"
              type="email"
              getValue={getEmail}
              value={email}
            />
            <Input
              title="Пароль"
              placeholder="******"
              type="password"
              getValue={getPassword}
              value={password}
            />
          </div>
          <div className="mt-1 flex flex-row-reverse">
            <label className="font-inter text-xs text-gray-500">
              Забыли пароль?
            </label>
          </div>
          <ButtonBlue className="mt-4" title="Войти" />
        </form>
        <div className="mt-10 flex flex-col gap-4">
          <label className="font-inter text-xs text-gray_title_light">
            У вас ещё нет аккаунта?
          </label>
          <label className="font-inter text-sm text-primary_blue">
            зарегистрироваться
          </label>
        </div>
      </main>
      <footer className="flex h-14 items-center gap-2 border-t border-t-gray-300 bg-white">
        <ButtonTransparent
          className="ml-5 flex-grow"
          title="Зарегистрироваться"
        />
        <ButtonBlue className="mr-5 flex-grow" title="Войти" />
      </footer>
    </div>
  );
}
