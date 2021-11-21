import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmitRegister = async (e) => {
    e.preventDefault();
    const response = await axios.post("/api/users/signup", { name, email, password });
    if (response.data.success) router.push("/");
  };
  return (
    <div className=" bg-blue-200">
      <form onSubmit={onSubmitRegister} className="w-screen h-screen flex flex-col space-y-4 justify-center items-center ">
        <div className="font-mono font-bold underline text-2xl">REGISTER FORM</div>
        <div className="flex flex-col justify-center items-center border-4 px-2 py-4 rounded-lg">
          <label className="font-mono font-bold">Name</label>
          <input className="rounded-lg mb-4 pl-3 py-1" onChange={(e) => setName(e.currentTarget.value)} value={name} />
          <label className="font-mono font-bold">Email</label>
          <input className="rounded-lg mb-4 pl-3 py-1" onChange={(e) => setEmail(e.currentTarget.value)} type="email" value={email} />
          <label className="font-mono font-bold">Password</label>
          <input
            className="rounded-lg mb-4 pl-3 py-1"
            onChange={(e) => setPassword(e.currentTarget.value)}
            type="password"
            value={password}
          />
          <hr className="border-gray-200 border-t-4 w-40 mt-4" />
          <button className=" bg-gray-200 rounded-lg w-full py-2 mt-5 font-mono font-bold hover:bg-gray-400" type="submit">
            REGISTER
          </button>
        </div>
      </form>
    </div>
  );
}
