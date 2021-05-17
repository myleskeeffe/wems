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


const createCompany = async (event) => {
  event.preventDefault();
  if (!event.target.name.value || !event.target.email.value || !event.target.phone.value) {
    return
  }
  const res = await fetch(apiurl + "api/company/", {
    body: JSON.stringify({
      name: event.target.name.value,
      email: event.target.email.value,
      phone: event.target.phone.value
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
        <title>Create Company - Companies - Dash - Keja</title>
      </Head>
      <div id="root">
        <Navbar />
        <div id="bodyContent" className="ml-64 p-4">
          <div className="w-full py-4 px-8 bg-white shadow-lg rounded-lg my-4">
            <p className="block text-xs uppercase font-bold text-gray-700">
              CREATE COMPANY
            </p>
            <br />
            <form onSubmit={createCompany}>
              <InputText
                placeholder="ACME Corp"
                id="name"
                type="text"
                label="Company Name"
                required
                icon={<AiOutlineUser></AiOutlineUser>}
              ></InputText>
              <InputText
                placeholder="info@acme.org"
                id="email"
                type="email"
                label="Company Email"
                required
                icon={<AiOutlineUser></AiOutlineUser>}
              ></InputText>
              <InputText
                placeholder="0123456789"
                id="phone"
                type="tel"
                label="Company Phone"
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
