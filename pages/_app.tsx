import "tailwindcss/tailwind.css";
import "@/app/globals.css";
import { Pixelify_Sans } from "next/font/google";
import Head from "next/head";
import Header from "@/app/components/Header";
import { PotProvider } from "@/app/contexts/PotContext";
import Footer from "@/app/components/Footer";

const pixelify = Pixelify_Sans({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" sizes="any" />
        <title>Make a Dish</title>
      </Head>
      <main className={`flex flex-col min-h-screen ${pixelify.className}`}>
        <PotProvider>
          <div className="flex-grow" id="app-bg">
            <Header />
            <Component {...pageProps} />
            <Footer />
          </div>
        </PotProvider>
      </main>
    </>
  );
}
