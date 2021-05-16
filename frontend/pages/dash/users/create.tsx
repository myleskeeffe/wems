import Head from "next/head";
import Button from "../../../components/elements/buttons/Button";
import { useRouter } from "next/router";
import Logo from "../../../components/elements/logos/Logo";
import Link from "next/link";
import {
  AiFillHome,
  AiFillBook,
  AiOutlineUser,
  AiOutlineUserAdd,
} from "react-icons/ai";
import useSWR from "swr";
import { apiurl } from "../../../config";
import { ClipLoader } from "react-spinners";
import Navbar from "../../../components/elements/navbar/Navbar";
import InputText from "../../../components/elements/forms/inputtext/InputText";


const createUser = async (event) => {
  event.preventDefault();
  if (!event.target.fName.value || !event.target.lName.value || !event.target.uName.value || !event.target.email.value || !event.target.password.value) {
    return
  }
  const res = await fetch(apiurl + "api/user/", {
    body: JSON.stringify({
      fName: event.target.fName.value,
      lName: event.target.lName.value,
      uName: event.target.uName.value,
      email: event.target.email.value,
      password: event.target.password.value
    }),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  });
  const result = await res.json()
  event.target.reset();
};

export default function Home() {
  const router = useRouter();
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Create User - Users - Dash - Keja</title>
      </Head>
      <div id="root">
        <Navbar />
        <div id="bodyContent" className="ml-64 p-4">
          <div className="w-full py-4 px-8 bg-white shadow-lg rounded-lg my-4">
            <p className="block text-xs uppercase font-bold text-gray-700">
              CREATE USER
            </p>
            <br />
            <form onSubmit={createUser}>
              <InputText
                placeholder="john@example.com"
                id="email"
                type="email"
                label="Email"
                required
                icon={<AiOutlineUser></AiOutlineUser>}
              ></InputText>
              <InputText
                placeholder="John"
                id="fName"
                type="text"
                label="First Name"
                required
                icon={<AiOutlineUser></AiOutlineUser>}
              ></InputText>
              <InputText
                placeholder="Appleseed"
                id="lName"
                type="text"
                label="Last Name"
                required
                icon={<AiOutlineUser></AiOutlineUser>}
              ></InputText>
              <InputText
                placeholder="Password"
                id="password"
                type="password"
                label="Password"
                required
                icon={<AiOutlineUser></AiOutlineUser>}
              ></InputText>
              <InputText
                placeholder="john.a"
                id="uName"
                type="text"
                label="Username"
                required
                icon={<AiOutlineUser></AiOutlineUser>}
              ></InputText>
              <Button submit label="Create" color="indigo"></Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
