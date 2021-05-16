import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Button from '../components/elements/buttons/Button'
import { useRouter } from 'next/router'
import Logo from '../components/elements/logos/Logo'
import Link from 'next/link'
import InputText from '../components/elements/forms/inputtext/InputText'
import { AiOutlineUser } from 'react-icons/ai';
import { BsFillUnlockFill } from 'react-icons/bs';

export default function Home() {
  const router = useRouter()
  return (
    <div className="bg-gray-100 h-screen flex items-center">
      <Head>
        <title>Sign In - WEMS</title>
      </Head>
      <div className="container mx-auto w-96 bg-white p-8 rounded-md align-middle">
        <Logo type="square" size="big" />
        <p className="text-4xl font-thin text-center">Sign In</p>
        <p className="text-center">Or <Link href="/register"><a className="text-indigo-500">sign up</a></Link>.</p>
        <br />
        <form>
          <InputText placeholder="john@example.com" id="email" type="email" label="Email" required icon={<AiOutlineUser></AiOutlineUser>}></InputText>
          <InputText placeholder="Password" id="password" type="password" label="Password" required icon={<BsFillUnlockFill></BsFillUnlockFill>}></InputText>
          <br/>
          <InputText placeholder="John" id="fname" type="text" label="First Name" required icon={<AiOutlineUser></AiOutlineUser>}></InputText>
          <InputText placeholder="Appleseed" id="lname" type="text" label="Last Name" required icon={<AiOutlineUser></AiOutlineUser>}></InputText>
        </form>
      </div>
    </div>
  )
}
