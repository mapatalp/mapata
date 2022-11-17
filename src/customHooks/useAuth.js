import { auth } from "../firebase/config";
import {
  GoogleAuthProvider,
  signInWithCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const useAuth = () => {
  const handleResponse = async ({ response, method }) => {
    if (response?.type === "success") {
      if (method === "google") {
        await googleAuthentication({
          id_token: response.params.id_token,
        });
      }
    }
  };

  const googleAuthentication = async ({ id_token }) => {
    const credential = GoogleAuthProvider.credential(id_token);
    await signInWithCredential(auth, credential);
  };

  const loginWithEmailAndPassword = async ({ email, password }) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const registerWithEmailAndPassword = async ({ email, password }) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  return {
    handleResponse,
    loginWithEmailAndPassword,
    registerWithEmailAndPassword,
  };
};

export default useAuth;
