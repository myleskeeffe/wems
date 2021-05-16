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

const fetcher = (args) => fetch(args).then((res) => res.json());

const editUser = async (event) => {
  const router = useRouter();
  event.preventDefault();
  if (
    !event.target.id.value ||
    !event.target.fName.value ||
    !event.target.lName.value ||
    !event.target.uName.value ||
    !event.target.email.value ||
    !event.target.password.value
  ) {
    return;
  }
  const res = await fetch(apiurl + "api/user/" + event.target.id.value, {
    body: JSON.stringify({
      fName: event.target.fName.value,
      lName: event.target.lName.value,
      username: event.target.username.value,
      email: event.target.email.value,
      password: event.target.password.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
  });
  const result = await res.json();
  event.target.reset();
  router.push("/dash/users");
};

function EditUser() {
  const router = useRouter();
  const { data, error } = useSWR(
    // THIS NEEDS TO BE FIXED!!!
    apiurl + "api/user/" + 1,
    fetcher
  );
  if (error) return <div>Error loading data...</div>;
  if (!data)
    return (
      <div>
        <ClipLoader />
      </div>
    );
  // render data
  return (
    <div>
      <form onSubmit={editUser}>
        <input type="hidden" id="id" defaultValue={data.id}></input>
        <InputText
          defaultValue={data.fName}
          placeholder="John"
          id="fName"
          type="text"
          label="First Name"
          required
          icon={<AiOutlineUser></AiOutlineUser>}
        ></InputText>
        <InputText
          defaultValue={data.lName}
          placeholder="Appleseed"
          id="lName"
          type="text"
          label="Last Name"
          required
          icon={<AiOutlineUser></AiOutlineUser>}
        ></InputText>
        <InputText
          defaultValue={data.username}
          placeholder="john.a"
          id="uName"
          type="text"
          label="User Name"
          required
          icon={<AiOutlineUser></AiOutlineUser>}
        ></InputText>
        <Button submit label="Save" color="indigo"></Button>
      </form>
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Edit User - Users - Dash - Keja</title>
      </Head>
      <div id="root">
        <Navbar />
        <div id="bodyContent" className="ml-64 p-4">
          <div className="w-full py-4 px-8 bg-white shadow-lg rounded-lg my-4">
            <p className="block text-xs uppercase font-bold text-gray-700">
              EDIT USER
            </p>
            <br />
            <EditUser />
          </div>
        </div>
      </div>
    </div>
  );
}
