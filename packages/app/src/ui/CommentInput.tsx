import React from "react";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import { ProfileImage } from "../components/ProfileImage";
import { useMeQuery } from "../generated/graphql";
import { colors, fonts, globalStyles } from "./theme";

interface CommentInputProps {
    id: number;
}

export const CommentInput: React.FC<CommentInputProps> = ({}) => {
    const { data, loading } = useMeQuery();
    return (
        <View style={[globalStyles.flex, styles.container]}>
            <ProfileImage imgUrl={data?.me?.imgUrl} variant={"small"} />
            <TextInput
                style={styles.input}
                autoCapitalize="none"
                placeholder={"Search"}
                placeholderTextColor={colors.gray}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderTopColor: colors.dogeGray,
        borderTopWidth: 1,
        zIndex: 1000,
        position: "absolute",
        bottom: 0,
        width: "100%",
        padding: 14,
        backgroundColor: colors.dogeBlack,
    },
    input: {
        backgroundColor: colors.dogeGray,
        width: "89%",
        borderRadius: 3,
        paddingVertical: 8,
        marginLeft: 15,
        paddingLeft: 10,
        fontFamily: fonts.inter_500,
        color: colors.white,
        fontSize: 17,
    },
});
