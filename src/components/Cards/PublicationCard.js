import React from "react";
import { Image } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

import Column from "../../components/Grid/Column";
import Row from "../../components/Grid/Row";

const PublicationCard = ({ publication, onPress }) => {
  const bodyFontSize = 13;
  return (
    <Card style={{ marginBottom: 20 }} onPress={onPress}>
      <Card.Content>
        <Row>
          <Image
            source={{ uri: publication.image }}
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
