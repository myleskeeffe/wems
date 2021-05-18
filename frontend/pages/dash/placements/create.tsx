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


const createPlacement = async (event) => {
  event.preventDefault();
  if (!event.target.userId || !event.target.contactId || !event.target.startDate || !event.target.endDate || !event.target.consent || !event.target.approval || !event.target.notes || !event.target.formSubmitted) {
    return
  }
  const res = await fetch(apiurl + "api/placement/", {
    body: JSON.stringify({
      userId: event.target.userId.value,
      contactId: event.target.contactId.value,
      startDate: event.target.startDate.value,
      endDate: event.target.endDate.value,
      consent: event.target.consent.value,
      approval: event.target.approval.value,
      notes: event.target.notes.value,
      formSubmitted: event.target.formSubmitted.value
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
        <title>Create Placement - Placements - Dash - Keja</title>
      </Head>
      <div id="root">
        <Navbar />
        <div id="bodyContent" className="ml-64 p-4">
          <div className="w-full py-4 px-8 bg-white shadow-lg rounded-lg my-4">
            <p className="block text-xs uppercase font-bold text-gray-700">
              CREATE PLACEMENT
            </p>
            <br />
            <form onSubmit={createPlacement}>
              <InputText
                placeholder="1"
                id="userId"
                type="number"
                label="User ID"
                required
                icon={<AiOutlineUsergroupAdd></AiOutlineUsergroupAdd>}
              ></InputText>
              <InputText
                placeholder="1"
                id="contactId"
                type="number"
                label="Contact ID"
                required
                icon={<AiOutlineUsergroupAdd></AiOutlineUsergroupAdd>}
              ></InputText>
              <InputText
                placeholder="01/01/2021"
                id="startDate"
                type="date"
                label="Start Date"
                required
                icon={<AiOutlineUsergroupAdd></AiOutlineUsergroupAdd>}
              ></InputText>
              <InputText
                placeholder="01/01/2021"
                id="endDate"
                type="date"
                label="End Date"
                required
                icon={<AiOutlineUsergroupAdd></AiOutlineUsergroupAdd>}
              ></InputText>
              <InputText
                placeholder="True"
                id="consent"
                type="text"
                label="Parental Consent"
                required
                icon={<AiOutlineUsergroupAdd></AiOutlineUsergroupAdd>}
              ></InputText>
              <InputText
                placeholder="True"
                id="approval"
                type="text"
                label="WE Coordinator Approval"
                required
                icon={<AiOutlineUsergroupAdd></AiOutlineUsergroupAdd>}
              ></InputText>
              <InputText
                placeholder=""
                id="notes"
                type="text"
                label="Notes"
                required
                icon={<AiOutlineUsergroupAdd></AiOutlineUsergroupAdd>}
              ></InputText>
              <InputText
                placeholder="False"
                id="formSubmitted"
                type="text"
                label="EdSmart Form Completed"
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
