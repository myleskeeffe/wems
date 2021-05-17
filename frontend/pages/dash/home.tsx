import Head from "next/head";
import Button from "../../components/elements/buttons/Button";
import { useRouter } from "next/router";
import Navbar from "../../components/elements/navbar/Navbar";


export default function Home() {
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
              WEMS DASHBOARD
            </p>
            <br></br>
            <h3 className="block font-bold text-gray-900">Welcome!</h3>
            <p>The WEMS front end is under heavy construction, unfortunately, not all features are yet available. Sorry for the inconvenience. However, the WEMS API is fully functional and ready to use via the IP: wemsapi.keja.co:8080/api/</p>
            <br></br>
            <hr></hr>
            <p className="block text-xs text-gray-700">
              Thank you for using Keja systems.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
