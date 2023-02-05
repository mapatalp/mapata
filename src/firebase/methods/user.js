import { signOut } from "firebase/auth";
import { ref, push, child, get, update } from "firebase/database";

import { store } from "../../redux";
import { setUser, clear } from "../../redux/slice/user";
import { db, auth } from "..";

const logOut = async () => {
  await signOut(auth);
  store.dispatch(clear());
};

const createUser = async (user) => {
  // genero la clave
  const newUserKey = push(child(ref(db), "/users")).key;

  // mando los datos a firebase
  await update(ref(db, "/users/" + newUserKey), {
    ...user,
    id: newUserKey,
  });

  // lo guardo en el store
  store.dispatch(
    setUser({
      ...user,
      id: newUserKey,
    })
  );
};

const getUserByUID = async (uid) => {
  // me traigo todos los usuarios
  const users = await get(ref(db, "/users"));

  // filtro por uid
  const user = Object.values(users.val()).find((u) => u.uid === uid);

  return user;
};

const getUserByID = async (id) => {
  // me traigo todos los usuarios
  const users = await get(ref(db, "/users"));

  // filtro por id
  const user = Object.values(users.val()).find((u) => u.id === id);

  return user;
};

const editUser = async (user) => {
  // mando los datos a firebase
  await update(ref(db, "/users/" + user.id), {
    ...user,
  });

  // lo guardo en el store
  store.dispatch(
    setUser({
      ...user,
    })
  );
};

export { createUser, logOut, getUserByUID, editUser, getUserByID };
