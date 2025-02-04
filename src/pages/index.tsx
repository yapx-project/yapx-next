import SignInView from "./auth/sign-in-view";
import SignUpView from "./auth/sign-up-view";
import { Inter, Roboto } from "next/font/google";

const interFont = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-inter",
});

const robotoFont = Roboto({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-roboto",
});

export default function Home() {
  return (
    <div className={`${interFont.variable} ${robotoFont.variable}`}>
      <SignInView />
    </div>
  );
}
