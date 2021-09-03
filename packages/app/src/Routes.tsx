import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { MainStack } from "./modules/MainStack";
import { colors } from "./ui/theme";

interface RoutesProps {}

export default function Routes() {
    return (
        <NavigationContainer
            theme={{
                // @ts-ignore
                colors: {
                    background: colors.dogeBlack,
                },
            }}
        >
            <MainStack />
        </NavigationContainer>
    );
}
