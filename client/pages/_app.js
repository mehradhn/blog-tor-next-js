import { useState } from "react";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { store } from "../app-redux/store";
import { Provider } from "react-redux";
import Cookies from "universal-cookie";
import Layout from "../layouts/Layout";

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
