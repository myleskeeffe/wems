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


const createVisitation = async (event) => {
  event.preventDefault();
  if (!event.target.userId || !event.target.workPlacementId || !event.target.date || !event.target.documentName) {
    return
  }
  const res = await fetch(apiurl + "api/visitation/", {
    body: JSON.stringify({
      userId: event.target.userId.value,
      workPlacementId: event.target.workPlacementId.value,
      date: event.target.date.value,
      documentName: event.target.documentName.value
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
        <title>Create Visitation - Visitations - Dash - Keja</title>
      </Head>
      <div id="root">
        <Navbar />
        <div id="bodyContent" className="ml-64 p-4">
          <div className="w-full py-4 px-8 bg-white shadow-lg rounded-lg my-4">
            <p className="block text-xs uppercase font-bold text-gray-700">
              CREATE VISITATION
            </p>
            <br />
            <form onSubmit={createVisitation}>
              <InputText
                placeholder="1"
                id="userId"
                type="number"
                label="Teacher ID (User ID)"
                required
                icon={<AiOutlineUsergroupAdd></AiOutlineUsergroupAdd>}
              ></InputText>
              <InputText
                placeholder="1"
                id="workPlacementId"
                type="number"
                label="Workplacement ID"
                required
                icon={<AiOutlineUsergroupAdd></AiOutlineUsergroupAdd>}
              ></InputText>
              <InputText
                placeholder="H:/WE/JohnSmith.docx"
                id="documentName"
                type="text"
                label="Form Name / Location"
                required
                icon={<AiOutlineUsergroupAdd></AiOutlineUsergroupAdd>}
              ></InputText>
              <InputText
                placeholder=""
                id="date"
                type="datetime-local"
                label="Date & Time of Visit"
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
