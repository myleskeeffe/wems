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

async function updateAdress(event, filter) {
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
  const res = await fetch(apiurl + "api/adress/" + event.target.id.value, {
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
  mutate(apiurl + "api/adress/?filter=" + filter);
}

function updateAdressModal(user, closeModal, filter) {
  return (
    <div className="ml-64">
      <p>Unfortunately, at this time address updates can only be done via the API.</p>
      <Button onClick={closeModal} label="Done" color="indigo"></Button>
    </div>
  );
}

function Adresses(filter, filterType) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const router = useRouter();
  const { data, error } = useSWR(
    apiurl + "api/address/?filter=" + filter + "&filterType=" + filterType,
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
      {data.map((adress) => (
        <tr>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{adress.id}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{adress.streetAddress}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{adress.AddressSuburb.suburbName}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{adress.AddressSuburb.AddressPostcode.postcode}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{adress.AddressSuburb.AddressPostcode.AddressState.stateName}</div>
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
            {updateAdressModal(adress, closeModal, filter)}
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
  const [filterType, setFilterType] = React.useState("street");
  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
  }
  const router = useRouter();
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Adresses - Dash - Keja</title>
      </Head>
      <div id="root">
        <Navbar></Navbar>
        <div id="bodyContent" className="ml-64 p-4">
          <div className="w-full py-4 px-8 bg-white shadow-lg rounded-lg my-4">
            <p className="block text-xs uppercase font-bold text-gray-700">
              ALL ADRESSES
            </p>
            <select onChange={handleFilterTypeChange} value={filterType}>
              <option value="street">Street</option>
              <option value="suburb">Suburb</option>
              <option value="postcode">Postcode</option>
            </select>
            <InputText
              onChange={handleFilterChange}
              value={filterTerm}
              helper={`Searching By ${filterType}`}
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
                  Street
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Suburb
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Postcode
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  State
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </thead>
              {Adresses(filterTerm, filterType)}
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
