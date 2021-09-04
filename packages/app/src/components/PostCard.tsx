import React from "react";
import { Dimensions } from "react-native";
import { Image, StyleSheet, Text, View } from "react-native";
import { Post, RegularPostFragment } from "../generated/graphql";
import { colors, fonts, globalStyles, layout, postHeight } from "../ui/theme";
import { timeSince } from "../utils/timeSince";
import { ProfileImage } from "./ProfileImage";
import { Feather } from "@expo/vector-icons";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { MainStackParamList } from "../modules/main/MainNav";
import { HomeStackParamList } from "../modules/main/Home/HomeNav";
import { TouchableOpacity } from "react-native-gesture-handler";

interface PostCardProps {
    post: RegularPostFragment;
    navigation: BottomTabNavigationProp<HomeStackParamList, "HomePage">;
}

export const PostCard: React.FC<PostCardProps> = ({ post, navigation }) => {
    return (
        <View style={styles.container}>
            <View style={[globalStyles.flex, styles.postHeader]}>
                <ProfileImage imgUrl={post.creator.imgUrl} variant={"post"} />
                <Text style={styles.username}>{post.creator.username}</Text>
                <Feather
                    onPress={() => {
                        alert("Feature to be added soon!");
                    }}
                    style={styles.more}
                    name="more-vertical"
                    size={layout.iconSize - 5}
                    color="white"
                />
            </View>
            <Image source={{ uri: post.imgUrl }} style={styles.img} />
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate("PostPage", {
                        id: post.id,
                    })
                }
            >
                <View style={styles.postFooter}>
                    <View>
                        <Text style={{ color: "#fff" }}>likes area</Text>
                    </View>
                    <Text style={styles.likes}>
                        {post.likes} like{post.likes == 1 ? "" : "s"}
                        {"   "}
                        {post.comments.length} comment
                        {post.comments.length == 1 ? "" : "s"}
                    </Text>
                    <View>
                        <Text
                            style={styles.description}
                            onPress={() =>
                                navigation.navigate("PostPage", {
                                    id: post.id,
                                })
                            }
                        >
                            <Text style={styles.usernameDesc}>
                                {post.creator.username}
                            </Text>
                            {"  "}
                            {post.description}
                        </Text>
                    </View>
                    <Text style={styles.time}>
                        {timeSince(post.createdAt)} ago
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 0,
    },
    postHeader: {
        padding: 14,
        alignItems: "center",
    },
    username: {
        color: "#fff",
        fontSize: 20,
        fontFamily: fonts.inter_600,
        paddingLeft: 12,
    },
    img: {
        width: "100%",
        height: postHeight,
    },
    postFooter: {
        padding: 14,
    },
    usernameDesc: {
        fontSize: 17,
        color: "#fff",
        fontFamily: fonts.inter_600,
        paddingRight: 10,
    },
    description: {
        color: "#fff",
        fontSize: 16,
        fontFamily: fonts.inter_400,
    },
    time: {
        color: colors.timeGray,
        marginTop: 4,
        fontSize: 15,
        fontFamily: fonts.inter_500,
    },
    more: {
        marginLeft: "auto",
        marginRight: -10,
    },
    likes: {
        fontSize: 16,
        color: "#fff",
        fontFamily: fonts.inter_600,
        marginBottom: 1,
    },
});
