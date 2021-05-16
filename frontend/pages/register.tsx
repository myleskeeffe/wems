import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Button from '../components/elements/buttons/Button'
import { useRouter } from 'next/router'
import Logo from '../components/elements/logos/Logo'
import Link from 'next/link'
import InputText from '../components/elements/forms/inputtext/InputText'
import { AiOutlineUser, AiFillPhone } from 'react-icons/ai';
import { BsFillUnlockFill } from 'react-icons/bs';
import { FaPencilRuler } from 'react-icons/fa';

export default function Home() {
  const router = useRouter()
  return (
    <div className="bg-gray-100 h-screen flex items-center">
      <Head>
        <title>Sign Up - WEMS</title>
      </Head>
      <div className="container mx-auto w-96 bg-white p-8 rounded-md align-middle">
        <Logo type="square" size="big" />
        <p className="text-4xl font-thin text-center">Sign Up</p>
        <p className="text-center">Or <Link href="/login"><a className="text-indigo-500">login</a></Link>.</p>
        <br />
        <form>
          <InputText placeholder="john@example.com" id="email" type="email" label="Email" required icon={<AiOutlineUser></AiOutlineUser>}></InputText>
          <InputText placeholder="Password" id="password" type="password" label="Password" required icon={<BsFillUnlockFill></BsFillUnlockFill>}></InputText>
          <div className="h-4"></div>
          <hr />
          <div className="h-4"></div>
          <InputText placeholder="John" id="fname" type="text" label="First Name" required icon={<AiOutlineUser></AiOutlineUser>}></InputText>
          <InputText placeholder="Appleseed" id="lname" type="text" label="Last Name" required icon={<AiOutlineUser></AiOutlineUser>}></InputText>
          <div className="h-4"></div>
          <hr />
          <div className="h-4"></div>
          <InputText placeholder="john.a" id="username" type="text" label="Username" required icon={<FaPencilRuler></FaPencilRuler>}></InputText>
          <InputText placeholder="123456789" id="phone" type="text" label="Phone Number" required icon={<AiFillPhone></AiFillPhone>}></InputText>
        </form>
      </div>
    </div>
  )
}
