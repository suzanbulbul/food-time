import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

//Library
import { Toaster } from "react-hot-toast";

//Components
import { Layout, Wrapper } from "../components";

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
        <Wrapper>
          <Layout>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
            <Toaster />
          </Layout>
        </Wrapper>
      </Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
