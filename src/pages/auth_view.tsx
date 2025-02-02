
export default function AuthView() {
  return (
    <div className="flex flex-col h-dvh bg-primary_gray">
      <header className="h-14 bg-white"></header>
      <main
      // className={`${bokorFont.variable}`}
      >
        <h1 className="font-roboto text-2xl">Вход в аккаунт</h1>
        <form className="flex flex-col">
          <label className="font-inter text-xs">Email</label>
          <input
            name="email"
            className="bg-primary_gray border-2 border-input_border rounded placeholder-gray_title_light text-base font-inter"
            placeholder="Yaropolk@yandex.ru" />
        </form>
      </main>
      {/* <header className="bg-purple-500"></header> */}
    </div>

  )
}
