import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";

export type HomeStackParamList = {
    HomePage: undefined;
    PostPage: {
        id: number;
    };
};

export type HomeStackNav<RouteName extends keyof HomeStackParamList> = {
    navigation: BottomTabNavigationProp<HomeStackParamList, RouteName>;
    route: RouteProp<HomeStackParamList, RouteName>;
};
