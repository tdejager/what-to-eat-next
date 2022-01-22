import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Link from "next/link";
import {SessionProvider} from "next-auth/react"

function LinkBar() {
    return (
        <ul className="flex mb-3">
            <li className="mr-6">
                <Link href={"/"}>
                    <a className="text-blue-500 underline decoration-dotted hover:text-blue-800">Home</a>
                </Link>
            </li>
            <li className="mr-6">
                <Link href={"/add"}>
                    <a className="text-blue-500 underline decoration-dotted hover:text-blue-800">Add recipe</a>
                </Link>
            </li>
        </ul>
    );
}

function MyApp({Component, pageProps}: AppProps) {
    return (
        <SessionProvider session={pageProps.session}>
            <div className='flex flex-col items-center h-screen w-screen'>
                <LinkBar/>
                <Component {...pageProps} />
            </div>
        </SessionProvider>);
}

export default MyApp
