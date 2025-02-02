import { useState } from "react"

export default function AuthView() {
  const [text, setText] = useState("")
  const getInput = (t: string) => {
    console.log(t)
    setText(t)
  }

  return (
    <div className="flex flex-col h-dvh bg-primary_gray">
      <header className="h-14 bg-white"></header>
      <main className="m-5">
        <h1 className="font-roboto text-2xl">Вход в аккаунт</h1>
        <form className="flex flex-col">
          <Input title="Email" getInput={getInput} value={text} />
        </form>
      </main>
      {/* <header className="bg-purple-500"></header> */}
    </div>
  )
}

function Input({ title, getInput, value }: any) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-inter ">{title}</label>
      <input
        className="h-9 bg-primary_gray border border-input_border rounded p-3 placeholder-gray_title_light text-sm font-inter"
        placeholder="Yaropolk@yandex.ru"
        value={value}
        onChange={(e) => getInput(e.target.value)}
      />
    </div>
  )
}
