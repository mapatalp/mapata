import { ref, push, update, child } from "firebase/database";
import { db } from "..";
import { store } from "../../redux";
import { addPublication } from "../../redux/slice/user";

const createPublication = async (publication, userId) => {
  const newPublicationKey = push(child(ref(db), "/publications")).key;

  let newPublication = {
    ...publication,
    userId: userId,
    date: new Date().toISOString().split("T")[0],
    id: newPublicationKey,
  };

  push(ref(db, "/publications"), newPublication);
  store.dispatch(addPublication(newPublication));
};

const editPublication = async (publication, userId) => {
  console.log(publication);
  await update(ref(db, "/publications/" + publication.id), {
    ...publication,
    userId: userId,
    date: new Date().toISOString().split("T")[0],
  });
  // store.dispatch(addPublication(newPublication));
};

export { createPublication, editPublication };
