import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MainStackParamList } from "./main/MainNav";
import { Main } from "./main/Main";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SelfProfile } from "./main/SelfProfile";
import { colors, layout } from "../ui/theme";
import { Entypo } from "@expo/vector-icons";
import { Image } from "react-native";
import { useMeQuery } from "../generated/graphql";
import { emptyIcon } from "../constants";
import { SvgUri } from "react-native-svg";
import { View } from "react-native";
import { ProfileImage } from "../ui/ProfileImage";

interface MainStackProps {}

// const Stack = createStackNavigator<MainStackParamList>();
const Tab = createBottomTabNavigator<MainStackParamList>();

export const MainStack: React.FC<MainStackProps> = ({}) => {
    const { data, loading } = useMeQuery();
    return (
        <Tab.Navigator
            initialRouteName={"Home"}
            screenOptions={{
                headerStyle: {
                    borderBottomColor: "#f9f9f9",
                    borderBottomWidth: 0.2,
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
                }}
                name="Home"
                component={Main}
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
                                small={true}
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
