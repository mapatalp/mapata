import latinize from "latinize";

let animalTypeList = ["Gato", "Perro"];
let publicationStateList = ["En tránsito", "Buscado"];

export function getMockedPublicationList() {
  var publicationList = [];
  for (var i = 0; i < 4; i++) {
    publicationList.push({
      title: `Manucha ${i + 1}`,
      imageUrl: `https://picsum.photos/id/23${i + 2}/200/300`,
      date: "12/02/2022",
      description: `Miau miau ${i + 1}`,
      animalType: animalTypeList[i % 2],
      publicationState: publicationStateList[i % 2],
    });
  }

  return publicationList;
}

export function filterPublications(publication, searchQuery) {
  searchQuery = searchQuery.toLowerCase();
  return (
    publication.title.toLowerCase().includes(searchQuery) ||
    publication.animalType.toLowerCase().includes(searchQuery) ||
    latinize(publication.publicationState.toLowerCase()).includes(searchQuery)
  );
}
