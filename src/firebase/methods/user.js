import { signOut } from "firebase/auth";
import { ref, push } from "firebase/database";
import { db, auth } from "../config";

const logOut = async () => await signOut(auth);

const createUser = async (user) => {
  push(ref(db, "/users"), user);
};

export { createUser, logOut };
