import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getCsrfToken, getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleCredentialsSignIn = async (e: FormEvent) => {
    e.preventDefault();
    console.log("signIn");
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/",
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push(result?.url ?? "/");
    }
  };

  return (
    <>
      <div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form method="post" onSubmit={handleCredentialsSignIn}>
          {/*<input name="csrfToken" type="hidden" defaultValue={csrfToken} />*/}
          <label>
            Email
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
            />
          </label>
          <label>
            Пароль
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </label>
          <button type="submit">Войти</button>
        </form>
      </div>
      <div>
        {Object.values(providers).map((provider) => (
          <>
            {provider.name !== "credentials" && (
              <div key={provider.name}>
                <button onClick={() => signIn(provider.id)}>
                  Войти с помощью {provider.name}
                </button>
              </div>
            )}
          </>
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: {
      csrfToken: await getCsrfToken(context),
      providers: providers ?? [],
    },
  };
}
