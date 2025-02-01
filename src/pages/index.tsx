import { Geist, Geist_Mono } from "next/font/google";
import { Input } from "postcss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="flex flex-col h-dvh bg-primary">
      <header className="bg-purple-500 h-14"></header>
      <main>
        <h1>Вход в аккаунт</h1>
        <form>
          <input name="email" className="bg-yellow-300" />
        </form>
      </main>
      {/* <header className="bg-purple-500"></header> */}
    </div>
  )
};

