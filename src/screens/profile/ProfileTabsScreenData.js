export function getMockedPublicationList() {
  var publicationList = [];
  for (var i = 0; i < 4; i++) {
    publicationList.push({
      title: `Manucha ${i + 1}`,
      imageUrl: "https://picsum.photos/700",
      date: "12/02/2022",
      description: `Miau miau ${i + 1}`,
    });
  }
  return publicationList;
}

export function getMockedFavoritesList() {
  var favoritesList = [];
  for (var i = 0; i < 4; i++) {
    favoritesList.push({
      title: `Favsss ${i + 1}`,
      imageUrl: `https://picsum.photos/id/23${i + 1}/200/300`,
      date: "12/02/2022",
      description: `Miau miau ${i + 1}`,
    });
  }
  return favoritesList;
}
