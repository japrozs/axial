import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ProfileImage } from "../components/ProfileImage";
import { RegularPostFragment } from "../generated/graphql";
import { timeSinceShort } from "../utils/timeSince";
import { colors, fonts, globalStyles, layout } from "./theme";

interface CommentFlatListProps {
    post: RegularPostFragment;
}

export const CommentFlatList: React.FC<CommentFlatListProps> = ({ post }) => {
    return (
        <View style={{ marginTop: 10 }}>
            {post?.comments?.map((comment) => (
                <View key={post.id}>
                    <View style={[globalStyles.flex, styles.postHeader]}>
                        <ProfileImage
                            imgUrl={post.creator.imgUrl}
                            variant={"comment"}
                        />
                        <Text style={styles.username}>
                            {post.creator.username}
                        </Text>
                        <Text>{"    "}</Text>
                        <Text
                            style={{
                                fontFamily: fonts.inter_600,
                                color: colors.gray,
                                fontSize: 19,
                            }}
                        >
                            {timeSinceShort(post.createdAt)}
                        </Text>
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
                    <Text style={styles.comment}>{comment.body}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    postHeader: {
        paddingHorizontal: 14,
        paddingVertical: 7,
        alignItems: "center",
    },
    username: {
        color: "#fff",
        fontFamily: fonts.inter_600,
        fontSize: 20,
        paddingLeft: 12,
    },
    more: {
        marginLeft: "auto",
        marginRight: -10,
    },
    comment: {
        paddingLeft: 14,
        color: colors.white,
        fontSize: 18,
        fontFamily: fonts.inter_400,
    },
});
