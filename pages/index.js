import { signIn, signOut, useSession } from "next-auth/client";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Head from "next/head";
export default function Home() {
  const [session, loadingSession] = useSession();

  if (loadingSession) {
    return <p>Loading...</p>;
  }
  console.log(session);

  return (
    <div className={styles.container}>
      <Head>
        <title>NextAuth Authentication</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="text-3xl font-serif mb-6">Main Page</div>
      <div className="mb-5">
        {session ? (
          <div className="flex flex-col  items-center">
            <div className="text-blue-500 font-bold font-mono">Authenticated</div>
            <div className="text-blue-500 font-bold font-mono">Email: {session.user.email}</div>
          </div>
        ) : (
          <p className="text-red-500 font-bold font-mono">Not Authenticated</p>
        )}
      </div>

      {session ? (
        <div>
          <button className="bg-red-600 rounded-lg px-4 py-1 text-white font-bold font-mono hover:bg-red-400" onClick={() => signOut()}>
            SIGN-OUT
          </button>
        </div>
      ) : (
        <div className="flex space-x-6">
          <Link href="/signup" passHref>
            <button className="bg-green-600 rounded-lg px-4 py-1 text-white font-bold font-mono hover:bg-green-400">SIGN-UP</button>
          </Link>

          <button className="bg-blue-600 rounded-lg px-4 py-1 text-white font-bold font-mono hover:bg-blue-400" onClick={() => signIn()}>
            SIGN-IN
          </button>
        </div>
      )}
      <div className="flex space-x-10 mt-10">
        <Link href="/private" passHref>
          <button className="underline">{`<=`} Go To Private Link</button>
        </Link>
        <Link href="/public" passHref>
          <button className="underline">Go To Public Link {`=>`}</button>
        </Link>
      </div>
    </div>
  );
}
