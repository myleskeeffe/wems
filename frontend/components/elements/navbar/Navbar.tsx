import React from "react";
import Logo from "../logos/Logo";
import Link from "next/link";
import {
  AiFillHome,
  AiFillBook,
  AiOutlineUser,
  AiOutlineUserAdd,
} from "react-icons/ai";

interface Props {
  active?: string;
}
const Navbar = ({ active }: Props) => {
  return (
    <div>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          <ul className="items-center flex flex-wrap list-none">
            <div className="flex items-center w-full text-center">
              <Logo type="square"></Logo>
            </div>
            <hr className="my-4 md:min-w-full" />
            <h6 className="md:min-w-full text-gray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Admin Pages
            </h6>
            <li className="inline-block relative"></li>
            <ul className="flex-col min-w-full flex list-none">
              <li className="items-center">
                <Link href="/dash/home">
                  <a className="text-xs uppercase py-2 font-bold block text-gray-700 hover:text-indigo-600">
                    <AiFillHome className="inline mr-4" />
                    Home
                  </a>
                </Link>
              </li>
              <hr className="my-4 md:min-w-full" />
              <h6 className="md:min-w-full text-gray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                Users
              </h6>
              <li className="items-center">
                <Link href="/dash/users">
                  <a className="text-xs uppercase py-2 font-bold block text-gray-700 hover:text-indigo-600">
                    <AiOutlineUser className="inline mr-4" />
                    All
                  </a>
                </Link>
              </li>
              <li className="items-center">
                <Link href="/dash/users/create">
                  <a className="text-xs uppercase py-2 font-bold block text-gray-700 hover:text-indigo-600">
                    <AiOutlineUserAdd className="inline mr-4" />
                    Create
                  </a>
                </Link>
              </li>
              <hr className="my-4 md:min-w-full" />

              <h6 className="md:min-w-full text-gray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                Placements
              </h6>
              <li className="items-center">
                <Link href="/dash/placements">
                  <a className="text-xs uppercase py-2 font-bold block text-gray-700 hover:text-indigo-600">
                    <AiFillBook className="inline mr-4" />
                    All
                  </a>
                </Link>
              </li>
              <hr className="my-4 md:min-w-full" />
              <h6 className="md:min-w-full text-gray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                Groups
              </h6>
              <li className="items-center">
                <Link href="/dash/groups">
                  <a className="text-xs uppercase py-2 font-bold block text-gray-700 hover:text-indigo-600">
                    <AiOutlineUser className="inline mr-4" />
                    All
                  </a>
                </Link>
                <Link href="/dash/groups/create">
                  <a className="text-xs uppercase py-2 font-bold block text-gray-700 hover:text-indigo-600">
                    <AiOutlineUserAdd className="inline mr-4" />
                    Create
                  </a>
                </Link>
              </li>
            </ul>
          </ul>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
