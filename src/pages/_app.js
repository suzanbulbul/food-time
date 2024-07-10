import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

//Library
import { Toaster } from "react-hot-toast";

//Components
import Layout from "../components/Layout";

//Redux
import { wrapper } from "../redux/store";

//Style
import "../util/styles/style.scss";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  const { store } = wrapper.useWrappedStore(pageProps);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster />
        </Layout>
      </Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
