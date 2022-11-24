import { ref, push, get } from "firebase/database";
import { db } from "..";
import { store } from "../../redux";
import { addPublication } from "../../redux/slice/user";

const createPublication = async (publication, userId) => {
  let newPublication = {
    ...publication,
    userId: "-NHexbC4JKAUniSOWUL6",
    date: new Date().toISOString().split("T")[0],
  };
  push(ref(db, "/publications"), newPublication);
  store.dispatch(addPublication(newPublication));
};

export { createPublication };
