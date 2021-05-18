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

async function updateCohort(event, filter) {
  event.preventDefault();
  console.log(event);

  if (
    !event.target.name.value
  ) {
    return;
  }
  const res = await fetch(apiurl + "api/cohorts/" + event.target.id.value, {
    body: JSON.stringify({
      name: event.target.name.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
  });
  const result = await res.json();
  mutate(apiurl + "api/cohorts/?filter=" + filter);
}

function updateCohortModal(cohort, closeModal, filter) {
  return (
    <form
      onSubmit={function (event) {
        updateCohort(event, filter);
        closeModal();
      }}
      className="ml-64"
    >
      <input id="id" type="hidden" value={cohort.id}></input>
      <InputText
        placeholder="ACME Corp"
        defaultValue={cohort.name}
        id="name"
        type="text"
        label="Cohort Name"
        required
        icon={<AiOutlineUser></AiOutlineUser>}
      ></InputText>
      <Button submit label="Save" color="indigo"></Button>
    </form>
  );
}

function Cohorts(filter) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const router = useRouter();
  const { data, error } = useSWR(
    apiurl + "api/cohorts/?filter=" + filter,
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
      {data.map((cohort) => (
        <tr>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{cohort.id}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{cohort.name}</div>
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
            {updateCohortModal(cohort, closeModal, filter)}
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
                  Cohort Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </thead>
              {Cohorts(filterTerm)}
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