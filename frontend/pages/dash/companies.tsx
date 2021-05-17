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

async function updateCompany(event, filter) {
  event.preventDefault();
  console.log(event);

  if (
    !event.target.name.value ||
    !event.target.phone.value ||
    !event.target.email.value
  ) {
    return;
  }
  const res = await fetch(apiurl + "api/company/" + event.target.id.value, {
    body: JSON.stringify({
      fName: event.target.name.value,
      phone: event.target.phone.value,
      email: event.target.email.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
  });
  const result = await res.json();
  mutate(apiurl + "api/company/?filter=" + filter);
}

function updateCompanyModal(company, closeModal, filter) {
  return (
    <form
      onSubmit={function (event) {
        updateCompany(event, filter);
        closeModal();
      }}
      className="ml-64"
    >
      <input id="id" type="hidden" value={company.id}></input>
      <InputText
        placeholder="ACME Inc"
        defaultValue={company.name}
        id="name"
        type="text"
        label="Company Name"
        required
        icon={<AiOutlineUser></AiOutlineUser>}
      ></InputText>
      <InputText
        placeholder="0123456789"
        defaultValue={company.phone}
        id="phone"
        type="tel"
        label="Phone"
        required
        icon={<AiOutlineUser></AiOutlineUser>}
      ></InputText>
      <InputText
        placeholder="info@company.org"
        defaultValue={company.email}
        id="email"
        type="email"
        label="Email"
        required
        icon={<AiOutlineUser></AiOutlineUser>}
      ></InputText>
      <Button submit label="Save" color="indigo"></Button>
    </form>
  );
}

function Companies(filter) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const router = useRouter();
  const { data, error } = useSWR(
    apiurl + "api/company/?filter=" + filter,
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
            <div className="text-sm text-gray-900">{user.name}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{user.phone}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{user.email}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900 flex">
              <Button
                onClick={openModal}
                icon={<AiOutlineUserSwitch />}
                label="Edit"
              ></Button>
            </div>
          </td>
          <Modal isOpen={modalIsOpen}>
            {updateCompanyModal(user, closeModal, filter)}
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
        <title>Companies - Dash - Keja</title>
      </Head>
      <div id="root">
        <Navbar></Navbar>
        <div id="bodyContent" className="ml-64 p-4">
          <div className="w-full py-4 px-8 bg-white shadow-lg rounded-lg my-4">
            <p className="block text-xs uppercase font-bold text-gray-700">
              ALL COMPANIES
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
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Phone
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
                  Actions
                </th>
              </thead>
              {Companies(filterTerm)}
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
