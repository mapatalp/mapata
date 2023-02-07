import { ref, push, update, child } from "firebase/database";
import { db } from "..";
import { store } from "../../redux";
import { addPublication, updatePublication } from "../../redux/slice/user";

const createPublication = async (publication, userId) => {
  const newPublicationKey = push(child(ref(db), "/publications")).key;
  let newPublication = {
    ...publication,
    userId: userId,
    date: new Date().toISOString().split("T")[0],
    id: newPublicationKey,
  };
  const updatePublication = {};
  updatePublication["/publications/" + newPublicationKey] = newPublication;
  update(ref(db), updatePublication);
  store.dispatch(addPublication(newPublication));
};

const editPublication = async (publication, userId) => {
  await update(ref(db, "/publications/" + publication.id), {
    ...publication,
    userId: userId,
    date: new Date().toISOString().split("T")[0],
  });
  store.dispatch(
    updatePublication({
      ...publication,
      userId: userId,
      date: new Date().toISOString().split("T")[0],
    })
  );
};

function adoptarAnimal(publication, adoptanteId) {
  let newPublication = {
    ...publication,
  };
  newPublication.state = "Adoptado";
  newPublication.userId = adoptanteId;
  editPublication(newPublication, newPublication.userId);
}

function transitarAnimal(publication, transitanteId) {
  let newPublication = {
    ...publication,
  };
  newPublication.state = "En tránsito";
  newPublication.userId = transitanteId;
  editPublication(newPublication, newPublication.userId);
}

export { createPublication, editPublication, adoptarAnimal, transitarAnimal };
