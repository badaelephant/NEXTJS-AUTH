import { getSession } from "next-auth/client";
import { signIn } from "next-auth/client";
import axios from "axios";
export default function PrivatePage({ data }) {
  return (
    <div>
      <div>PrivatePage</div>
      <div>{data}</div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const axios = require("axios");
  const session = await getSession(ctx);
  console.log(session);
  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin?callbackUrl=http://localhost:3000",
        permanent: false,
      },
    };
  }
  return {
    props: { data: "authenticated" },
  };
}
