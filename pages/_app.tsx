import "tailwindcss/tailwind.css";
import "@/app/globals.css";
import { Pixelify_Sans } from "next/font/google";
import Head from "next/head";
import Header from "@/app/components/Header";

const pixelify = Pixelify_Sans({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" sizes="any" />
      </Head>
      <main className={`flex flex-col min-h-screen ${pixelify.className}`}>
        <div className="md:px-16 px-5 pt-5 pb-20" id="app-bg">
          <Header />
          <Component {...pageProps} />
        </div>
      </main>
    </>
  );
}
