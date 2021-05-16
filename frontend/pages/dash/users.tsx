import Head from "next/head";
import Button from "../../components/elements/buttons/Button";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import { apiurl } from "../../config";
import { ClipLoader } from "react-spinners";
import Navbar from "../../components/elements/navbar/Navbar";
import { AiOutlineUserDelete, AiOutlineUserSwitch } from "react-icons/ai";
import InputText from "../../components/elements/forms/inputtext/InputText";
import React, { createContext, useState } from 'react';

const fetcher = (args) => fetch(args).then((res) => res.json());

const deleteUser = async (user, filter) => {
  if (!user) {
    return
  }
  const res = await fetch(apiurl + "api/user/" + user, {
    method: 'DELETE'
  });
  mutate(apiurl + "api/user/?filter=" + filter)
  const result = await res.json()
};

function Users(filter) {
  const router = useRouter();
  const { data, error } = useSWR(apiurl + "api/user/?filter=" + filter, fetcher);
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
              {/* <Button
                onClick={() => router.push(`/dash/users/edit?user=${user.id}`)}
                icon={<AiOutlineUserSwitch />}
                label="Edit"
              ></Button> */}
              <Button
                onClick={() => deleteUser(user.id, filter)}
                icon={<AiOutlineUserDelete />}
                label="Delete"
              ></Button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default function Home() {
  const [filterTerm, setFilterTerm] = React.useState("");
  const handleFilterChange = event => {
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
            <InputText onChange={handleFilterChange} value={filterTerm} helper="Search For"></InputText>
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
            <p className="block text-xs text-gray-700">Search results capped at 100. Try using a filter above.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
