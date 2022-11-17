import { ref, push } from "firebase/database";
import { db } from "../config";

const createPublication = async (publication) => {
  push(ref(db, "/publications"), publication);
};

export { createPublication };
