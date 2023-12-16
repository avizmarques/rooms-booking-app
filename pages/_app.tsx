import { RoomsProvider } from "@/context/roomsContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RoomsProvider>
      <Component {...pageProps} />
    </RoomsProvider>
  );
}
