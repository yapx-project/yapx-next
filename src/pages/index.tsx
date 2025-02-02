import AuthView from "./auth_view";
import { Inter, Roboto } from "next/font/google";

const interFont = Inter({
  subsets: ['latin'],
  weight: ["400"],
});

const robotoFont = Roboto({
  subsets: ['latin'],
  weight: ["700"]
})

export default function Home() {
  return (
    <div className={`${interFont.className} ${robotoFont.className}`}>
      <AuthView />
    </div>
  )
};


