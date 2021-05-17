import Head from "next/head";
import Button from "../../components/elements/buttons/Button";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import { apiurl } from "../../config";
import { ClipLoader } from "react-spinners";
import Navbar from "../../components/elements/navbar/Navbar";
import {
  AiOutlineUserDelete,
  AiOutlineUserSwitch,
  AiOutlineUser,
} from "react-icons/ai";
import InputText from "../../components/elements/forms/inputtext/InputText";
import React, { createContext, useState } from "react";
import Modal from "react-modal";

const fetcher = (args) => fetch(args).then((res) => res.json());

const deleteUser = async (user, filter) => {
  if (!user) {
    return;
  }
  const res = await fetch(apiurl + "api/user/" + user, {
    method: "DELETE",
  });
  mutate(apiurl + "api/user/?filter=" + filter);
  const result = await res.json();
};

async function updateUser(event, filter) {
  event.preventDefault();
  console.log(event);

  if (
    !event.target.fName.value ||
    !event.target.lName.value ||
    !event.target.uName.value ||
    !event.target.email.value
  ) {
    return;
  }
  const res = await fetch(apiurl + "api/user/" + event.target.id.value, {
    body: JSON.stringify({
      fName: event.target.fName.value,
      lName: event.target.lName.value,
      uName: event.target.uName.value,
      email: event.target.email.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
  });
  const result = await res.json();
  mutate(apiurl + "api/user/?filter=" + filter);
}

function updateUserModal(user, closeModal, filter) {
  return (
    <form
      onSubmit={function (event) {
        updateUser(event, filter);
        closeModal();
      }}
      className="ml-64"
    >
      <input id="id" type="hidden" value={user.id}></input>
      <InputText
        placeholder="john@example.com"
        defaultValue={user.email}
        id="email"
        type="email"
        label="Email"
        required
        icon={<AiOutlineUser></AiOutlineUser>}
      ></InputText>
      <InputText
        placeholder="John"
        defaultValue={user.fName}
        id="fName"
        type="text"
        label="First Name"
        required
        icon={<AiOutlineUser></AiOutlineUser>}
      ></InputText>
      <InputText
        placeholder="Appleseed"
        defaultValue={user.lName}
        id="lName"
        type="text"
        label="Last Name"
        required
        icon={<AiOutlineUser></AiOutlineUser>}
      ></InputText>
      <InputText
        placeholder="john.a"
        defaultValue={user.username}
        id="uName"
        type="text"
        label="Username"
        required
        icon={<AiOutlineUser></AiOutlineUser>}
      ></InputText>
      <Button submit label="Save" color="indigo"></Button>
    </form>
  );
}

function Users(filter) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const router = useRouter();
  const { data, error } = useSWR(
    apiurl + "api/user/?filter=" + filter,
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
    <tbody className="bg-white divide-y divide-gray-200">
      {data.map((user) => (
        <tr>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{user.id}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{user.fName}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{user.lName}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{user.email}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{user.username}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900 flex">
              <Button
                onClick={openModal}
                icon={<AiOutlineUserSwitch />}
                label="Edit"
              ></Button>
              <Button
                onClick={() => deleteUser(user.id, filter)}
                icon={<AiOutlineUserDelete />}
                label="Delete"
              ></Button>
            </div>
          </td>
          <Modal isOpen={modalIsOpen}>
            {updateUserModal(user, closeModal, filter)}
          </Modal>
        </tr>
      ))}
    </tbody>
  );
}

export default function Home() {
  const [filterTerm, setFilterTerm] = React.useState("");
  const handleFilterChange = (event) => {
    setFilterTerm(event.target.value);
  };
  const router = useRouter();
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Users - Dash - Keja</title>
      </Head>
      <div id="root">
        <Navbar></Navbar>
        <div id="bodyContent" className="ml-64 p-4">
          <div className="w-full py-4 px-8 bg-white shadow-lg rounded-lg my-4">
            <p className="block text-xs uppercase font-bold text-gray-700">
              ALL USERS
            </p>
            <InputText
              onChange={handleFilterChange}
              value={filterTerm}
              helper="Search For"
            ></InputText>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  First Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Last Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Username
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </thead>
              {Users(filterTerm)}
            </table>
            <p className="block text-xs text-gray-700">
              Search results capped at 100. Try using a filter above.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
