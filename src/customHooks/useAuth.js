import { auth } from "../firebase/config";
import {
  GoogleAuthProvider,
  signInWithCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const useAuth = () => {
  const googleAuthentication = async ({ id_token }) => {
    const credential = GoogleAuthProvider.credential(id_token);
    return await signInWithCredential(auth, credential);
  };

  const loginWithEmailAndPassword = async ({ email, password }) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const registerWithEmailAndPassword = async ({ email, password }) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  return {
    googleAuthentication,
    loginWithEmailAndPassword,
    registerWithEmailAndPassword,
  };
};

export default useAuth;
