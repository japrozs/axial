import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";

export type MainStackParamList = {
    Home: undefined;
    SelfProfile: undefined;
    Search: undefined;
    NewPost: undefined;
    PostPage: {
        id: number;
    };
};

export type MainStackNav<RouteName extends keyof MainStackParamList> = {
    navigation: BottomTabNavigationProp<MainStackParamList, RouteName>;
    route: RouteProp<MainStackParamList, RouteName>;
};
