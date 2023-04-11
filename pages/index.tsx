import Head from "next/head";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import dynamic from "next/dynamic";
const Main = dynamic(() => import("./main"));

const lightTheme = createTheme({
  type: "light",
  theme: { colors: {} },
});

const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {},
  },
});

// const theme = useTheme();

export default function App() {
  function timeOfDay() {
    const now = new Date();
    const hour = now.getHours();
    const isDaytime = hour >= 6 && hour < 18;

    // if (isDaytime) {
    //   console.log("It's currently daytime.");
    // } else {
    //   console.log("It's currently nighttime.");
    // }

    return isDaytime;
  }

  // timeOfDay();

  return (
    <ThemeProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <Head>
        <title>Quant x Priori</title>
        <meta name="description" content="AI Assisted Quantitative Analysis" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NextUIProvider theme={timeOfDay() ? lightTheme : darkTheme}>
        <Main />
      </NextUIProvider>
    </ThemeProvider>
  );
}
