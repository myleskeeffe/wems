import Head from "next/head";
import Button from "../../components/elements/buttons/Button";
import { useRouter } from "next/router";
import Navbar from "../../components/elements/navbar/Navbar";


export default function Home() {
  const router = useRouter();
  return (
    <div className="bg-gray-100 h-screen flex items-center">
      <Head>
        <title>Work Experience - Keja</title>
      </Head>
      <div id="root">
        <Navbar />
        <div id="bodyContent" className="ml-64">
          <h1>Hello</h1>
        </div>
      </div>
    </div>
  );
}
