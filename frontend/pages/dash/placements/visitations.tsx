import Head from "next/head";
import Button from "../../../components/elements/buttons/Button";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import { apiurl } from "../../../config";
import { ClipLoader } from "react-spinners";
import Navbar from "../../../components/elements/navbar/Navbar";
import {
  AiOutlineUserDelete,
  AiOutlineUserSwitch,
  AiOutlineUser,
} from "react-icons/ai";
import InputText from "../../../components/elements/forms/inputtext/InputText";
import React, { createContext, useState } from "react";
import Modal from "react-modal";

const fetcher = (args) => fetch(args).then((res) => res.json());

async function updateVisitation(event) {
  event.preventDefault();
  console.log(event);

  if (
    !event.target.startDate.value ||
    !event.target.endDate.value ||
    !event.target.consent.value ||
    !event.target.approval.value ||
    !event.target.formSubmmited.value ||
    !event.target.userId ||
    !event.target.contactId
  ) {
    return;
  }
  const res = await fetch(apiurl + "api/visitation/" + event.target.id.value, {
    body: JSON.stringify({
      startDate: event.target.startDate.value,
      endDate: event.target.endDate.value,
      consent: event.target.consent.value,
      approval: event.target.approval.value,
      formSubmitted: event.target.formSubmitted.value,
      userId: event.target.userId.value,
      contactId: event.target.contactId.value
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
  });
  const result = await res.json();
  mutate(apiurl + "api/visitation/");
}

function updateVisitationModal(user, closeModal) {
  return (
    <div className="ml-64">
      <p>Unfortunately, at this time visitation updates can only be done via the API.</p>
      <Button onClick={closeModal} label="Done" color="indigo"></Button>
    </div>
  );
}

function Visitations() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const router = useRouter();
  const { data, error } = useSWR(
    apiurl + "api/visitation/",
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
      {data.map((visitation) => (
        <tr>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{visitation.id}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{visitation.User.fName} {visitation.User.lName}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{visitation.WorkPlacement.User.fName} {visitation.WorkPlacement.User.lName}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{visitation.WorkPlacement.Contact.Company.name}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{visitation.WorkPlacement.Contact.Company.Address.streetAddress} {visitation.WorkPlacement.Contact.Company.Address.AddressSuburb.suburbName}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{visitation.date}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{visitation.documentName}</div>
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
            {updateVisitationModal(visitation, closeModal)}
          </Modal>
        </tr>
      ))}
    </tbody>
  );
}

export default function Home() {
  const router = useRouter();
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Visitations - Dash - Keja</title>
      </Head>
      <div id="root">
        <Navbar></Navbar>
        <div id="bodyContent" className="ml-64 p-4">
          <div className="w-full py-4 px-8 bg-white shadow-lg rounded-lg my-4">
            <p className="block text-xs uppercase font-bold text-gray-700">
              ALL VISITATIONS
            </p>
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
                  Teacher
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Student
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Company
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Address
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date Time
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Form Name / Link
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </thead>
              {Visitations()}
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
