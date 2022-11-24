import CONSTANTS from "../constants/constants";
import latinize from "latinize";

export function getMockedPublicationList() {
  var publicationList = [];
  for (var i = 0; i < 6; i++) {
    publicationList.push(getMockedPublication(i));
  }
  return publicationList;
}

export function getMockedPublication(i = 0) {
  const publication = {
    title: `Manucha ${i + 1}`,
    imageUrl: `https://placekitten.com/${i + 3}${i + 2}${i + 3}/${i + 3}${
      i + 2
    }${i + 3}`,
    animal: getValidConstant(i, CONSTANTS.ANIMAL_TYPE),
    gender: getValidConstant(i, CONSTANTS.ANIMAL_GENDER),
    age: getValidConstant(i, CONSTANTS.ANIMAL_AGE),
    state: getValidConstant(i, CONSTANTS.PUBLICATION_STATES),
    date: `${(i + 1) * 2}/${i + 1}/2022`,
    description:
      "Tiene un collar con su nombre, llamar al 1136133363.\n\nGata mimosa, es tranquila y le gusta lamer pelo.",
  };
  return publication;
}

export function filterPublications(publication, searchQuery) {
  searchQuery = searchQuery.toLowerCase();
  return (
    publication.title.toLowerCase().includes(searchQuery) ||
    parseAnimalType(publication.animal).toLowerCase().includes(searchQuery) ||
    latinize(parsePublicationState(publication.state).toLowerCase()).includes(
      searchQuery
    )
  );
}

export function filterPublicationsNoParser(publication, searchQuery) {
  searchQuery = searchQuery.toLowerCase();
  return (
    publication.title.toLowerCase().includes(searchQuery) ||
    publication.animal.toLowerCase().includes(searchQuery) ||
    latinize(publication.state.toLowerCase()).includes(searchQuery)
  );
}

export function parseAnimalType(animal) {
  var text = "";
  switch (animal) {
    case CONSTANTS.ANIMAL_TYPE.GATO:
      text = "Gato";
      break;
    case CONSTANTS.ANIMAL_TYPE.PERRO:
      text = "Perro";
      break;
    default:
      text = "Otro";
      break;
  }
  return text;
}

export function parseAnimalGender(animalGender) {
  var text = "";
  switch (animalGender) {
    case CONSTANTS.ANIMAL_GENDER.HEMBRA:
      text = "Hembra";
      break;
    case CONSTANTS.ANIMAL_GENDER.MACHO:
      text = "Macho";
      break;
    default:
      text = "Desconocido";
      break;
  }
  return text;
}

export function parseAnimalAge(animalAge) {
  var text = "";
  switch (animalAge) {
    case CONSTANTS.ANIMAL_AGE.JOVEN:
      text = "Joven";
      break;
    case CONSTANTS.ANIMAL_AGE.ADULTO:
      text = "Adulto";
      break;
    default:
      text = "Desconocido";
      break;
  }
  return text;
}

export function parsePublicationState(publicationState) {
  var text = "";
  switch (publicationState) {
    case CONSTANTS.PUBLICATION_STATES.TRANSITO:
      text = "En tránsito";
      break;
    case CONSTANTS.PUBLICATION_STATES.ADOPTADO:
      text = "Adoptado";
      break;
    case CONSTANTS.PUBLICATION_STATES.BUSCADO:
      text = "Buscado";
      break;
    case CONSTANTS.PUBLICATION_STATES.CALLE:
      text = "En la calle";
      break;
    default:
      text = "Desconocido";
      break;
  }
  return text;
}

export function getButtonTextByPublicationState(publicationState) {
  return publicationState === CONSTANTS.PUBLICATION_STATES.TRANSITO
    ? "Lo quiero adoptar"
    : "Lo encontré";
}

function getValidConstant(i, constant) {
  return i % Object.keys(constant).length;
}

export function getMockedFavoritesList() {
  var publicationList = [];
  for (var i = 3; i < 6; i++) {
    publicationList.push(getMockedPublication(i));
  }
  return publicationList;
}
