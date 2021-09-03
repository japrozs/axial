import React from "react";
import { StyleSheet } from "react-native";
import { Image, View } from "react-native";
import { SvgUri } from "react-native-svg";
import { emptyIcon } from "../constants";
import { colors, layout } from "../ui/theme";

type VariantProps = "regular" | "icon" | "post";

interface ProfileImageProps {
    imgUrl: string | undefined;
    variant: VariantProps;
}

export const ProfileImage: React.FC<ProfileImageProps> = ({
    imgUrl,
    variant,
}) => {
    let width = 0;
    let height = 0;
    switch (variant) {
        case "regular": {
            width = layout.profileImgWidth;
            height = layout.profileImgHeight;
            break;
        }
        case "icon": {
            width = layout.smallProfileImgWidth;
            height = layout.smallProfileImgHeight;
            break;
        }
        case "post": {
            width = layout.postProfileImgWidth;
            height = layout.postProfileImgHeight;
            break;
        }
    }
    return (
        <View>
            {imgUrl?.split(".").pop() == "svg" ? (
                <SvgUri
                    style={[styles.img, { width, height }]}
                    uri={imgUrl || ""}
                />
            ) : (
                <Image
                    style={[styles.img, { width, height }]}
                    source={{ uri: imgUrl || emptyIcon }}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    img: {
        borderColor: colors.borderGray,
        borderWidth: 1,
        borderRadius: layout.borderRadius,
    },
});
