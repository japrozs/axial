import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View, Text, ScrollView, Image } from "react-native";
import {
    useGetAllPostsQuery,
    useLogoutMutation,
    useMeQuery,
} from "../../generated/graphql";
import { SvgUri } from "react-native-svg";
import { colors, layout } from "../../ui/theme";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import Axios from "axios";
import Uploady from "@rpldy/uploady";
import { asUploadButton } from "@rpldy/upload-button";
import { useApolloClient } from "@apollo/client";
import { useLoginMutation } from "../../generated/graphql";
import { PostCard } from "../../components/PostCard";
import { TextPostCard } from "../../components/TextPostCard";

interface MainProps {}

export const Main: React.FC<MainProps> = ({}) => {
    const { data, loading } = useGetAllPostsQuery();
    return (
        <ScrollView>
            {data?.getAllPosts.map((post) => {
                if (post.imgUrl == "") {
                    return <TextPostCard post={post} key={post.id} />;
                } else {
                    return <PostCard post={post} key={post.id} />;
                }
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({});
