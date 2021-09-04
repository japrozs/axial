import { useApolloClient } from "@apollo/client";
import { MaterialIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet } from "react-native";
import { useLogoutMutation } from "../../generated/graphql";
import { colors, fonts, layout } from "../../ui/theme";
import { PostPage } from "./common/PostPage";
import { HomeStackParamList } from "./Home/HomeNav";
import { Main as MainPage } from "./Home/Main";
import { MainStackNav } from "./MainNav";

interface MainProps {}

const Stack = createStackNavigator<HomeStackParamList>();

export const Main: React.FC<MainStackNav<"Home">> = ({ navigation }) => {
    const [logout] = useLogoutMutation();
    const client = useApolloClient();
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    borderBottomColor: "#f9f9f9",
                    borderBottomWidth: 0.2,
                },
                headerTintColor: colors.white,
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
                    headerRight: () => (
                        <MaterialIcons
                            name="logout"
                            size={layout.iconSize - 3}
                            style={{ marginRight: 8 }}
                            color="#fff"
                            onPress={async () => {
                                await logout();
                                await client.resetStore();
                            }}
                        />
                    ),
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
