import { useState } from "react";

import { providers, signIn, getSession, csrfToken } from "next-auth/client";

export default function SignIn({ providers }) {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const onSubmitLogin = (e) => {
  //   e.preventDefault();
  // };
  return (
    //   <div>
    //     <form onSubmit={onSubmitLogin}>
    //       <label>email</label>
    //       <input onChange={(e) => setEmail(e.currentTarget.value)} value={email} />
    //       <label>password</label>
    //       <input onChange={(e) => setPassword(e.currentTarget.value)} value={password} />
    //       <button type="submit">login</button>
    //     </form>
    //   </div>

    <div>
      {Object.values(providers).map((provider) => {
        return provider.name === "Custom" ? (
          <div>custom</div>
        ) : (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
          </div>
        );
      })}
    </div>
  );
}
export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  // if (session) {
  //   return {
  //     redirect: { destination: "/" },
  //   };
  // }

  return {
    props: {
      providers: await providers(context),
      csrfToken: await csrfToken(context),
    },
  };
}
