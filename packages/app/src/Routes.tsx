import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { MainStack } from "./modules/MainStack";

interface RoutesProps {}

export default function Routes() {
    return (
        <NavigationContainer
            theme={{
                // @ts-ignore
                colors: {
                    background: "#fff",
                },
            }}
        >
            <MainStack />
        </NavigationContainer>
    );
}
