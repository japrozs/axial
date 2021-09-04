import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import { Text, View } from "react-native";
import Routes from "./Routes";
import {
    useFonts,
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
} from "@expo-google-fonts/inter";

interface indexProps {}

const client = new ApolloClient({
    uri: "http://192.168.1.5:4000/graphql",
    credentials: "include",
    cache: new InMemoryCache(),
});

export default function Index() {
    const [fontsLoaded] = useFonts({
        "Inter 100": Inter_100Thin,
        "Inter 200": Inter_200ExtraLight,
        "Inter 300": Inter_300Light,
        "Inter 400": Inter_400Regular,
        "Inter 500": Inter_500Medium,
        "Inter 600": Inter_600SemiBold,
        "Inter 700": Inter_700Bold,
        "Inter 800": Inter_800ExtraBold,
        "Inter 900": Inter_900Black,
    });

    if (!fontsLoaded) {
        return (
            <View>
                <Text>loading fonts...</Text>
            </View>
        );
    }
    return (
        <ApolloProvider client={client}>
            <Routes />
        </ApolloProvider>
    );
}
