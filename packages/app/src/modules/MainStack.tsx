import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MainStackParamList } from "./main/MainNav";
import { Main } from "./main/Main";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SelfProfile } from "./main/SelfProfile";
import { colors, fonts, layout } from "../ui/theme";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { Image } from "react-native";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { emptyIcon } from "../constants";
import { SvgUri } from "react-native-svg";
import { View } from "react-native";
import { ProfileImage } from "../components/ProfileImage";
import { Search } from "./main/Search";
import { MaterialIcons } from "@expo/vector-icons";
import { NewPost } from "./main/NewPost";
import { useApolloClient } from "@apollo/client";

interface MainStackProps {}

// const Stack = createStackNavigator<MainStackParamList>();
const Tab = createBottomTabNavigator<MainStackParamList>();

export const MainStack: React.FC<MainStackProps> = ({}) => {
    const { data, loading } = useMeQuery();
    const [logout] = useLogoutMutation();
    const client = useApolloClient();
    return (
        <Tab.Navigator
            initialRouteName={"Home"}
            screenOptions={{
                headerStyle: {
                    borderBottomColor: "#f9f9f9",
                    borderBottomWidth: 0.2,
                },
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: colors.dogeBlack,
                },
                tabBarShowLabel: false,
                tabBarActiveTintColor: colors.navigation.active,
                tabBarInactiveTintColor: colors.navigation.inActive,
            }}
        >
            <Tab.Screen
                options={{
                    headerTitle: "Home",
                    tabBarIcon: ({ focused }) => (
                        <Entypo
                            name="home"
                            size={layout.iconSize}
                            color={
                                focused
                                    ? colors.navigation.active
                                    : colors.navigation.inActive
                            }
                        />
                    ),
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
                name="Home"
                component={Main}
            />
            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <AntDesign
                            name="search1"
                            size={layout.iconSize}
                            color={
                                focused
                                    ? colors.navigation.active
                                    : colors.navigation.inActive
                            }
                        />
                    ),
                }}
                name="Search"
                component={Search}
            />
            <Tab.Screen
                options={{
                    headerTitle: "New Post",
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome
                            name="plus-square-o"
                            size={layout.iconSize}
                            color={
                                focused
                                    ? colors.navigation.active
                                    : colors.navigation.inActive
                            }
                        />
                    ),
                }}
                name="NewPost"
                component={NewPost}
            />
            <Tab.Screen
                options={{
                    headerTitle: "Profile",
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={[
                                {
                                    borderColor: colors.borderGray,
                                    borderWidth: 1,
                                    borderRadius: layout.borderRadius,
                                },
                                focused
                                    ? {
                                          borderColor: colors.navigation.active,
                                      }
                                    : {
                                          borderColor:
                                              colors.navigation.inActive,
                                      },
                            ]}
                        >
                            <ProfileImage
                                imgUrl={data?.me?.imgUrl}
                                variant={"icon"}
                            />
                        </View>
                    ),
                }}
                name="SelfProfile"
                component={SelfProfile}
            />
        </Tab.Navigator>
    );
};
