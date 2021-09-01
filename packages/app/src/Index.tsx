import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import Routes from "./Routes";

interface indexProps {}

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
    cache: new InMemoryCache(),
});

export default function Index() {
    return (
        <ApolloProvider client={client}>
            <Routes />
        </ApolloProvider>
    );
}
