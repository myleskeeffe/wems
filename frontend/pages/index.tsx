import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Button from '../components/elements/buttons/Button'
import { useRouter } from 'next/router'
import Logo from '../components/elements/logos/Logo'

export default function Home() {
  const router = useRouter()
  return (
    <div className="bg-gray-100 h-screen flex items-center">
      <Head>
        <title>Work Experience - Keja</title>
      </Head>
      <div className="container mx-auto w-96 bg-white p-8 rounded-md align-middle">
        <Logo type="square" size="big"/>
        <p className="text-4xl font-thin text-center">Welcome to WEMS</p>
        <p className="text-center">Let's get you started! To continue please login or register.</p>
        <br />
        <div className='m-1'><Button onClick={() => router.push('/register')} color="indigo" label="Register"></Button></div>
        <p></p>
        <div className='m-1'><Button onClick={() => router.push('/login')} color="white" label="Login"></Button></div>
      </div>
    </div>
  )
}
