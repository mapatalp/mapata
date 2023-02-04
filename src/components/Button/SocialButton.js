import React from "react";
import { Image, TouchableOpacity } from "react-native";
import * as Linking from "expo-linking";
import CONSTANTS from "../../constants/constants";

/**
 * @param {import("react-native-paper").SocialButtonProps} props
 */
const SocialButton = (props) => {
  var iconUrl = props.socialUrl ? parseSocialIconUrl(props.socialUrl) : "";
  return (
    <TouchableOpacity
      onPress={() => {
        if (props.socialUrl !== undefined) {
          if (props.socialUrl.includes(CONSTANTS.HTTP)) {
            Linking.openURL(props.socialUrl);
          } else {
            Linking.openURL(
              `${CONSTANTS.SOCIALS.WHATSAPP.BASE_URL}?phone=${props.socialUrl}`
            );
          }
        }
      }}
    >
      <Image
        source={{ uri: iconUrl }}
        style={{ width: 40, height: 40, margin: 5 }}
      />
    </TouchableOpacity>
  );
};

function parseSocialIconUrl(socialUrl) {
  var socialIconUrl = "";
  switch (true) {
    case socialUrl.includes(CONSTANTS.SOCIALS.FACEBOOK.NAME):
      socialIconUrl = CONSTANTS.SOCIALS.FACEBOOK.ICON_URL;
      break;
    case socialUrl.includes(CONSTANTS.SOCIALS.INSTAGRAM.NAME):
      socialIconUrl = CONSTANTS.SOCIALS.INSTAGRAM.ICON_URL;
      break;
    case socialUrl.includes(CONSTANTS.SOCIALS.GOOGLE_MAPS.NAME):
      socialIconUrl = CONSTANTS.SOCIALS.GOOGLE_MAPS.ICON_URL;
      break;
    default:
      socialIconUrl = CONSTANTS.SOCIALS.WHATSAPP.ICON_URL;
  }
  return socialIconUrl;
}

export default SocialButton;
