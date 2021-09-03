import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { useMeQuery } from "./generated/graphql";
import { AuthStack } from "./modules/AuthStack";
import { MainStack } from "./modules/MainStack";
import { colors } from "./ui/theme";

interface RoutesProps {}

export default function Routes() {
    const { data, loading } = useMeQuery();
    let body: any = null;
    if (!loading && data?.me != null) {
        body = <MainStack />;
    } else {
        body = <AuthStack />;
    }
    return (
        <NavigationContainer
            theme={{
                // @ts-ignore
                colors: {
                    background: colors.dogeBlack,
                },
            }}
        >
            {body}
        </NavigationContainer>
    );
}
