import AuthView from "./auth_view";
import { Inter, Roboto } from "next/font/google";

const interFont = Inter({
  subsets: ['latin'],
  weight: ["400"],
  variable: "--font-inter"
});

const robotoFont = Roboto({
  subsets: ['latin'],
  weight: ["700"],
  variable: "--font-roboto"
})

export default function Home() {
  return (
    <div className={`${interFont.variable} ${robotoFont.variable}`}>
      <AuthView />
    </div>
  )
};


