import Head from 'next/head'
import Button from '../../components/elements/buttons/Button'
import { useRouter } from 'next/router'
import Logo from '../../components/elements/logos/Logo'
import Link from 'next/link';
import { AiFillHome, AiFillBook, AiOutlineUser } from 'react-icons/ai';
import useSWR from 'swr'
import { apiurl } from '../../config.ts.example';
import { ClipLoader } from 'react-spinners';

const fetcher = (args) => fetch(args).then(res => res.json())

function Users () {
  const { data, error } = useSWR(apiurl + 'api/user/', fetcher)

  if (error) return <div>Error loading data...</div>
  if (!data) return <div><ClipLoader/></div>

  // render data
  return <div>{data}</div>
}


export default function Home() {
  const router = useRouter()
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Users - Dash - Keja</title>
      </Head>
      <div id="root">
        <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
          <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
            <ul className="items-center flex flex-wrap list-none">
              <hr className="my-4 md:min-w-full" />
              <h6 className="md:min-w-full text-gray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">Admin Pages</h6>
              <li className="inline-block relative">
              </li>
              <ul className="flex-col min-w-full flex list-none">
                <li className="items-center">
                  <Link href="/dash/home"><a className="text-xs uppercase py-2 font-bold block text-gray-700 hover:text-indigo-600"><AiFillHome className="inline mr-4" />Home</a></Link>
                </li>
                <li className="items-center">
                  <Link href="/dash/placements"><a className="text-xs uppercase py-2 font-bold block text-gray-700 hover:text-indigo-600"><AiFillBook className="inline mr-4" />Placements</a></Link>
                </li>
                <li className="items-center">
                  <Link href="/dash/users"><a className="text-xs uppercase py-2 font-bold block text-indigo-500 hover:text-indigo-600"><AiOutlineUser className="inline mr-4" />Users</a></Link>
                </li>
              </ul>
            </ul>
          </div>
        </nav>
        <div id="bodyContent" className="ml-64 p-4">
          <div className="w-full py-4 px-8 bg-white shadow-lg rounded-lg my-4">
            <p className="block text-xs uppercase font-bold text-gray-700">ALL USERS</p>
            {Users()}
          </div>
        </div>
      </div>
    </div>
  )
}
