import { Feather } from "@expo/vector-icons";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { ProfileImage } from "../../../components/ProfileImage";
import {
    RegularPostFragment,
    useGetPostQuery,
} from "../../../generated/graphql";
import { CommentFlatList } from "../../../ui/CommentFlatList";
import { CommentInput } from "../../../ui/CommentInput";
import {
    colors,
    fonts,
    globalStyles,
    layout,
    postHeight,
} from "../../../ui/theme";
import { timeSince } from "../../../utils/timeSince";
import { MainStackNav } from "../MainNav";

interface PostPageProps {}

export const PostPage: React.FC<MainStackNav<"PostPage">> = ({ route }) => {
    const { data, loading } = useGetPostQuery({
        variables: {
            id: route.params.id,
        },
    });
    return (
        <View style={{ height: "100%" }}>
            <ScrollView style={{ height: 3000 }}>
                <View
                    style={[
                        globalStyles.flex,
                        styles.postHeader,
                        styles.container,
                    ]}
                >
                    <ProfileImage
                        imgUrl={data?.getPost.creator.imgUrl}
                        variant={"post"}
                    />
                    <Text style={styles.username}>
                        {data?.getPost.creator.username}
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
                {data?.getPost.imgUrl.trim().length == 0 ? (
                    <></>
                ) : (
                    <Image
                        source={{ uri: data?.getPost.imgUrl }}
                        style={[styles.img, { marginBottom: 14 }]}
                    />
                )}
                <View style={styles.postFooter}>
                    <Text style={styles.likes}>
                        {data?.getPost.likes} like
                        {data?.getPost.likes == 1 ? "" : "s"}
                        {"   "}
                        {data?.getPost.comments.length} comment
                        {data?.getPost.comments.length == 1 ? "" : "s"}
                    </Text>
                    {data?.getPost.imgUrl.trim().length != 0 ? (
                        <View>
                            <Text style={styles.descriptionWithImage}>
                                <Text style={styles.usernameDesc}>
                                    {data?.getPost.creator.username}
                                </Text>
                                {"  "}
                                {data?.getPost.description}
                            </Text>
                        </View>
                    ) : (
                        <Text style={[styles.descriptionWithoutImage]}>
                            {data?.getPost.description}
                        </Text>
                    )}
                    <Text style={styles.time}>
                        {timeSince(data?.getPost.createdAt || "")} ago
                    </Text>
                </View>
                <CommentFlatList
                    post={data?.getPost || ({} as RegularPostFragment)}
                />
            </ScrollView>
            <CommentInput id={data?.getPost.id!} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 14,
        paddingVertical: 10,
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
        paddingHorizontal: 14,
    },
    usernameDesc: {
        fontSize: 20,
        color: "#fff",
        fontFamily: fonts.inter_600,
        paddingRight: 10,
    },
    descriptionWithImage: {
        color: "#fff",
        fontSize: 16,
        fontFamily: fonts.inter_500,
        marginVertical: 3,
    },
    descriptionWithoutImage: {
        color: "#fff",
        fontSize: 22,
        fontFamily: fonts.inter_500,
        marginVertical: 3,
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
