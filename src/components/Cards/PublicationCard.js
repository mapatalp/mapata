import React from "react";
import { Image } from "react-native"; //por que verga tengo que importarlo de aca si en el login screen lo hace desde components
import { Card, Title, Paragraph } from "react-native-paper";
import Column from "../../components/Grid/Column";
import Row from "../../components/Grid/Row";
import Toast from "react-native-toast-message";

/**
 * @param {import("react-native-paper").PublicationCardProps} props
 */
const PublicationCard = (props) => {
  const bodyFontSize = 13;
  const publication = props.publication;
  const imageUrl = publication.imageUrl;
  return (
    <Card
      style={{ marginBottom: 20 }}
      onPress={() => {
        Toast.show({
          type: "success",
          position: "bottom",
          text1: `Tocaste la card de ${publication.title}`,
          visibilityTime: 1500,
        });
      }}
    >
      <Card.Content>
        <Row>
          <Image
            source={{ uri: imageUrl }}
            style={{ width: "35%", height: "100%" }}
          />
          <Column additionalStyles={{ marginLeft: 15 }}>
            <Title style={{ fontWeight: "bold" }}>{publication.title}</Title>
            <Paragraph style={{ fontSize: bodyFontSize }}>
              {publication.date}
            </Paragraph>
            <Paragraph style={{ fontSize: bodyFontSize }}>
              {publication.description}
            </Paragraph>
          </Column>
        </Row>
      </Card.Content>
    </Card>
  );
};

export default PublicationCard;
