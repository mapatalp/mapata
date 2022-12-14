import Text from "../Text/Text";
import Column from "../Grid/Column";
import PublicationRow from "../Text/PublicationRow";

import { parseAnimalGender } from "../../utils/PublicationHelper";

const PublicationDatosCard = ({ publication }) => {
  return (
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
      <PublicationRow title="Animal" text={publication.animal} />
      <PublicationRow title="Sexo" text={publication.gender} />
      <PublicationRow title="Edad" text={publication.age} />
      <PublicationRow title="Estado" text={publication.state} />
      <PublicationRow
        title="Última actualización"
        text={publication.date ?? new Date().toISOString().split("T")[0]}
        additionalStyles={{
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
        }}
      />
    </Column>
  );
};

export default PublicationDatosCard;
