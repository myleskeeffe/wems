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


const createGroup = async (event) => {
  event.preventDefault();
  if (!event.target.groupname) {
    return
  }
  const res = await fetch(apiurl + "api/group/", {
    body: JSON.stringify({
      name: event.target.groupname.value
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
        <title>Create Group - Users - Dash - Keja</title>
      </Head>
      <div id="root">
        <Navbar />
        <div id="bodyContent" className="ml-64 p-4">
          <div className="w-full py-4 px-8 bg-white shadow-lg rounded-lg my-4">
            <p className="block text-xs uppercase font-bold text-gray-700">
              CREATE GROUP
            </p>
            <br />
            <form onSubmit={createGroup}>
              <InputText
                placeholder="Staff"
                id="groupname"
                type="text"
                label="Group Name"
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
