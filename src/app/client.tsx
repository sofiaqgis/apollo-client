import { useMemo } from "react";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  ApolloProvider
} from "@apollo/client";
import type { AppProps } from "next/app";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";
import { NextPageContext } from "next";
export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";
let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: "http://localhost:4000/",
    }),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(
  initialState: NormalizedCacheObject | null = null
) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {

    const existingCache = _apolloClient.extract();

    const data = merge(initialState, existingCache, {

      arrayMerge: (destinationArray: any, sourceArray: any) => [
        ...sourceArray,
        ...destinationArray.filter((d: any) =>
          sourceArray.every((s: any) => !isEqual(d, s))
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: any
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps: any) {
  const state = pageProps? pageProps[APOLLO_STATE_PROP_NAME]: null;
  console.log("state", state, pageProps);
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}

interface Props {
  children?: any
  pageProps: NextPageContext
}

export function ApolloWrapper({ children, pageProps }: Props) {
  const apolloClient = useApollo(pageProps)


  return (
    <ApolloProvider client={apolloClient}>
      {children}
    </ApolloProvider>
  );
}