import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { Post } from "../generated/graphql";
import { colors, globalStyles, layout, postHeight } from "../ui/theme";
import { timeSince } from "../utils/timeSince";
import { truncate } from "../utils/truncate";
import { ProfileImage } from "./ProfileImage";

interface TextPostCardProps {
    post: Post;
}

export const TextPostCard: React.FC<TextPostCardProps> = ({ post }) => {
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
            <Text style={styles.likes}>
                {post.likes} like{post.likes == 1 ? "" : "s"}
            </Text>
            <Text style={styles.description}>
                {truncate(post.description, 98)}
            </Text>
            <Text style={styles.time}>{timeSince(post.createdAt)} ago</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 14,
    },
    postHeader: {
        alignItems: "center",
        marginBottom: 10,
    },
    username: {
        color: "#fff",
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
        color: "#fff",
        fontWeight: "600",
        paddingRight: 10,
    },
    description: {
        color: "#fff",
        fontSize: 17,
        marginVertical: 3,
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
        color: "#fff",
        fontWeight: "600",
        marginBottom: 3,
    },
});