import React from "react";
import { Image } from "react-native"; //por que verga tengo que importarlo de aca si en el login screen lo hace desde components
import { Card, Title, Paragraph } from "react-native-paper";
import Column from "../../components/Grid/Column";
import Row from "../../components/Grid/Row";

/**
 * @param {import("react-native-paper").PublicationCardProps} props
 */
const PublicationCard = ({ publication, onPress }) => {
  const bodyFontSize = 13;
  const imageUrl = publication.imageUrl;
  return (
    <Card style={{ marginBottom: 20 }} onPress={onPress}>
      <Card.Content>
        <Row>
          <Image
            source={{ uri: imageUrl }}
            style={{ width: "35%", height: "100%", borderRadius: 5 }}
          />
          <Column additionalStyles={{ marginLeft: 15 }}>
            <Title style={{ fontWeight: "bold" }}>{publication.title}</Title>
            <Paragraph style={{ fontSize: bodyFontSize }}>
              {publication.date}
            </Paragraph>
            <Paragraph
              style={{ fontSize: bodyFontSize, width: "55%" }}
              numberOfLines={1}
            >
              {publication.description}
            </Paragraph>
          </Column>
        </Row>
      </Card.Content>
    </Card>
  );
};

export default PublicationCard;
