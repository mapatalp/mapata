import React from "react";
import { View, ScrollView, Image } from "react-native"; //por que verga tengo que importarlo de aca si en el login screen lo hace desde components
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { Column, Row } from "../components";

const AsdScreen = () => {
    return (
      <View style={{ height: "100%", width: "100%", padding: 10}}>
        <ScrollView>
          <Card style={{ marginBottom: 20}}>
            <Card.Content>
            <Row>
              <Image source={{uri: "https://picsum.photos/700"}}
                  style={{width: "35%", height: "100%" }}/>
              <Column additionalStyles={{marginLeft: 15}}>
                <Title style={{fontWeight: "bold"}}>Manucha</Title>
                <Paragraph style={{fontSize: 13}}>12/02/2022</Paragraph>
                <Paragraph style={{fontSize: 13}}>Miau miau</Paragraph>
              </Column>
            </Row>
            </Card.Content>
          </Card>
          <Card style={{ marginBottom: 20}}>
            <Card.Content>
            <Row>
              <Image source={{uri: "https://picsum.photos/700"}}
                  style={{width: "35%", height: "100%" }}/>
              <Column additionalStyles={{marginLeft: 15}}>
                <Title style={{fontWeight: "bold"}}>Manucha 2</Title>
                <Paragraph style={{fontSize: 13}}>12/02/2022 2</Paragraph>
                <Paragraph style={{fontSize: 13}}>Miau miau 2</Paragraph>
              </Column>
            </Row>
            </Card.Content>
          </Card>
        </ScrollView>
      </View>
    );
  };

  
export default AsdScreen;