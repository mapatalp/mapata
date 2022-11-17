import React from "react";
import { Image, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";

/**
 * @param {import("react-native-paper").SocialButtonProps} props
 */
const SocialButton = (props) => {
  var iconUrl = parseSocialIconUrl(props.socialUrl);
  return (
    <TouchableOpacity
      onPress={() => {
        Toast.show({
          type: "success",
          position: "bottom",
          text1: `Tocaste un social media`,
          visibilityTime: 1500,
        });
      }}
    >
      <Image
        source={{
          uri: iconUrl,
        }}
        style={{ width: 40, height: 40, margin: 5 }}
      />
    </TouchableOpacity>
  );
};

function parseSocialIconUrl(socialUrl) {
  var socialIconUrl = "";
  switch (true) {
    case socialUrl.includes("facebook"):
      socialIconUrl =
        "https://www.edigitalagency.com.au/wp-content/uploads/Facebook-logo-blue-circle-large-transparent-png.png";
      break;
    case socialUrl.includes("instagram"):
      socialIconUrl =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png";
      break;
    default:
      socialIconUrl =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/WhatsApp_icon.png/598px-WhatsApp_icon.png";
  }
  return socialIconUrl;
}

export default SocialButton;
