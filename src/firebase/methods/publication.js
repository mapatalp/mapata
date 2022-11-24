import { ref, push } from "firebase/database";
import { db } from "..";
import { store } from "../../redux";
import { addPublication } from "../../redux/slice/user";

const createPublication = async (publication, userId) => {
  let newPublication = { ...publication, userId, date: new Date() };
  push(ref(db, "/publications"), newPublication);
  store.dispatch(addPublication(newPublication));
};

export { createPublication };
