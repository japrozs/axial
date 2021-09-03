import React from "react";
import { Dimensions } from "react-native";
import { Image, StyleSheet, Text, View } from "react-native";
import { Post } from "../generated/graphql";
import { colors, globalStyles, layout, postHeight } from "../ui/theme";
import { timeSince } from "../utils/timeSince";
import { ProfileImage } from "./ProfileImage";
import { Feather } from "@expo/vector-icons";

interface PostCardProps {
    post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
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
                    color="black"
                />
            </View>
            <Image source={{ uri: post.imgUrl }} style={styles.img} />
            <View style={styles.postFooter}>
                <View>
                    <Text>likes area</Text>
                </View>
                <Text style={styles.likes}>
                    {post.likes} like{post.likes == 1 ? "" : "s"}
                </Text>
                <View style={globalStyles.flex}>
                    <Text style={styles.usernameDesc}>
                        {post.creator.username}
                    </Text>
                    <Text style={styles.description}>{post.description}</Text>
                </View>
                <Text style={styles.time}>{timeSince(post.createdAt)} ago</Text>
            </View>
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
        color: "#000",
        fontSize: 20,
        fontWeight: "600",
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
        fontWeight: "600",
        paddingRight: 10,
    },
    description: {
        fontSize: 16,
    },
    time: {
        color: colors.timeGray,
        marginTop: 4,
        fontSize: 15,
        fontWeight: "500",
    },
    more: {
        marginLeft: "auto",
        marginRight: -10,
    },
    likes: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 3,
    },
});
