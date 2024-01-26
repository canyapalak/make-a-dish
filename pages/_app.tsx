import "tailwindcss/tailwind.css";
import "@/app/globals.css";
import { Pixelify_Sans } from "next/font/google";
import Head from "next/head";
import Header from "@/app/components/Header";
import { InstructionProvider } from "@/app/contexts/InstructionContext";
import { PotProvider } from "@/app/contexts/PotContext";
import Footer from "@/app/components/Footer";
import { createTheme, ThemeProvider } from "@mui/material";

const pixelify = Pixelify_Sans({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }: any) {
  const theme = createTheme({
    typography: {
      fontFamily: [{ pixelify }].join(","),
      fontSize: 16,
    },
  });

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Pixelify+Sans&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.png" sizes="any" />
        <title>Make a Dish</title>
      </Head>
      <main className={`flex flex-col min-h-screen ${pixelify.className}`}>
        <PotProvider>
          <InstructionProvider>
            <Header />
            <div className="flex-grow mx-4" id="app-bg">
              <ThemeProvider theme={theme}>
                <Component {...pageProps} />
              </ThemeProvider>
            </div>
            <Footer />
          </InstructionProvider>
        </PotProvider>
      </main>
    </>
  );
}
