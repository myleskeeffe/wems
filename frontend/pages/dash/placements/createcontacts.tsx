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
  AiOutlineUsergroupAdd
} from "react-icons/ai";
import useSWR from "swr";
import { apiurl } from "../../../config";
import { ClipLoader } from "react-spinners";
import Navbar from "../../../components/elements/navbar/Navbar";
import InputText from "../../../components/elements/forms/inputtext/InputText";


const createContact = async (event) => {
  event.preventDefault();
  if (!event.target.fName || !event.target.lName || !event.target.email || !event.target.title || !event.target.phone || !event.target.companyId) {
    return
  }
  const res = await fetch(apiurl + "api/contact/", {
    body: JSON.stringify({
      fName: event.target.fName.value,
      lName: event.target.lName.value,
      email: event.target.email.value,
      title: event.target.title.value,
      phone: event.target.phone.value,
      companyId: event.target.companyId.value
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
        <title>Create Contact - Contacts - Dash - Keja</title>
      </Head>
      <div id="root">
        <Navbar />
        <div id="bodyContent" className="ml-64 p-4">
          <div className="w-full py-4 px-8 bg-white shadow-lg rounded-lg my-4">
            <p className="block text-xs uppercase font-bold text-gray-700">
              CREATE CONTACT
            </p>
            <br />
            <form onSubmit={createContact}>
              <InputText
                placeholder="John"
                id="fName"
                type="text"
                label="Contact First Name"
                required
                icon={<AiOutlineUsergroupAdd></AiOutlineUsergroupAdd>}
              ></InputText>
              <InputText
                placeholder="Smith"
                id="lName"
                type="text"
                label="Contact Last Name"
                required
                icon={<AiOutlineUsergroupAdd></AiOutlineUsergroupAdd>}
              ></InputText>
              <InputText
                placeholder="john.smith@acme.org"
                id="email"
                type="email"
                label="Contact Email"
                required
                icon={<AiOutlineUsergroupAdd></AiOutlineUsergroupAdd>}
              ></InputText>
              <InputText
                placeholder="Director"
                id="title"
                type="text"
                label="Contact Title"
                required
                icon={<AiOutlineUsergroupAdd></AiOutlineUsergroupAdd>}
              ></InputText>
              <InputText
                placeholder="0123456789"
                id="phone"
                type="tel"
                label="Contact Phone"
                required
                icon={<AiOutlineUsergroupAdd></AiOutlineUsergroupAdd>}
              ></InputText>
              <InputText
                placeholder="1"
                id="companyId"
                type="number"
                label="Company ID"
                required
                icon={<AiOutlineUsergroupAdd></AiOutlineUsergroupAdd>}
              ></InputText> 
              <Button submit label="Create" color="indigo"></Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
