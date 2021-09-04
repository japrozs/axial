import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet } from "react-native";
import { colors, fonts } from "../../ui/theme";
import { PostPage } from "./common/PostPage";
import { HomeStackParamList } from "./Home/HomeNav";
import { Main as MainPage } from "./Home/Main";
import { MainStackNav } from "./MainNav";

interface MainProps {}

const Stack = createStackNavigator<HomeStackParamList>();

export const Main: React.FC<MainStackNav<"Home">> = ({ navigation }) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    borderBottomColor: "#f9f9f9",
                    borderBottomWidth: 0.2,
                },
                headerTitleStyle: {
                    color: colors.white,
                    fontFamily: fonts.inter_600,
                },
            }}
            initialRouteName={"HomePage"}
        >
            <Stack.Screen
                options={{
                    headerTitle: "Home",
                }}
                name={"HomePage"}
                component={MainPage}
            />
            <Stack.Screen
                options={{
                    headerTitle: "Post",
                }}
                name={"PostPage"}
                component={PostPage}
            />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({});
