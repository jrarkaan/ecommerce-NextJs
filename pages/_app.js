import '../styles/globals.css';
import Layout from '../components/Layout.js';
import { DataProvider } from "../store/GlobalState.js";

function MyApp({ Component, pageProps }) {
  return(
    <DataProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </DataProvider>
  )
}

export default MyApp;
