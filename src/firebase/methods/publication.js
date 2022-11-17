import { getDatabase, ref, set } from "firebase/database";
import { db } from "../config";

const createPublication = (publication) => {
  set(ref(db, "publications"), publication);
};

export { createPublication };
