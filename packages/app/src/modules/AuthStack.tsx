import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { colors, fonts } from "../ui/theme";
import { AuthStackParamList } from "./auth/AuthNav";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";

interface AuthStackProps {}

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthStack: React.FC<AuthStackProps> = ({}) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    borderBottomColor: "#f9f9f9",
                    borderBottomWidth: 0.2,
                },
                headerTintColor: colors.white,
                headerTitleStyle: {
                    color: "#fff",
                    fontFamily: fonts.inter_600,
                },
            }}
            initialRouteName={"Login"}
        >
            <Stack.Screen name={"Login"} component={Login} />
            <Stack.Screen name={"Register"} component={Register} />
        </Stack.Navigator>
    );
};
