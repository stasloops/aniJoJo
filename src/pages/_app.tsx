import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import '../styles/globals.scss'
import { store } from '../store/index';

const client = new ApolloClient({
  uri: 'http://localhost:3444/graphql',
  cache: new InMemoryCache
})

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ApolloProvider>)
}

export default App
