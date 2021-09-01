import React from "react";
import { StyleSheet } from "react-native";
import { Image, View } from "react-native";
import { SvgUri } from "react-native-svg";
import { colors, layout } from "./theme";

interface ProfileImageProps {
    imgUrl: string | undefined;
    small?: boolean;
}

export const ProfileImage: React.FC<ProfileImageProps> = ({
    imgUrl,
    small,
}) => {
    return (
        <View>
            {imgUrl?.split(".").pop() == "svg" ? (
                <SvgUri
                    style={[
                        styles.img,
                        small
                            ? {
                                  width: layout.smallProfileImgWidth,
                                  height: layout.smallProfileImgHeight,
                              }
                            : {},
                    ]}
                    uri={imgUrl || ""}
                />
            ) : (
                <Image
                    style={[
                        styles.img,
                        small
                            ? {
                                  width: layout.smallProfileImgWidth,
                                  height: layout.smallProfileImgHeight,
                              }
                            : {},
                    ]}
                    source={{ uri: imgUrl || "" }}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    img: {
        width: layout.profileImgWidth,
        height: layout.profileImgHeight,
        borderColor: colors.borderGray,
        borderWidth: 1,
        borderRadius: layout.borderRadius,
    },
});
