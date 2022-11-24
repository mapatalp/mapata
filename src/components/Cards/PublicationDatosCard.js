import { Text, Column, Row, PublicationRow } from "..";
import { ScrollView } from "react-native";
import {
  parseAnimalType,
  parseAnimalGender,
  parseAnimalAge,
  parsePublicationState,
} from "../../utils/PublicationHelper";
const PublicationDatosCard = ({ publication }) => {
  return (
    <ScrollView style={{ height: 325 }}>
      <Column>
        <Text
          style={{
            marginTop: 10,
            marginBottom: 10,
            marginHorizontal: 20,
            fontWeight: "bold",
            fontSize: 15,
            color: "#777777",
          }}
        >
          Datos
        </Text>

        <PublicationRow
          title="Título"
          text={publication.title}
          additionalStyles={{
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}
        />
        <PublicationRow
          title="Animal"
          text={parseAnimalType(publication.animalType)}
        />
        <PublicationRow
          title="Sexo"
          text={parseAnimalGender(publication.gender)}
        />
        <PublicationRow title="Edad" text={parseAnimalAge(publication.age)} />
        <PublicationRow
          title="Estado"
          text={parsePublicationState(publication.state)}
        />
        <PublicationRow
          title="Ult. Act."
          text={publication.date}
          additionalStyles={{
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        />
      </Column>
    </ScrollView>
  );
};

export default PublicationDatosCard;
