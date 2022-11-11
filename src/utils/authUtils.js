import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

/**
 * @param {object} data
 * @param {string} data.email
 * @param {string} data.password
 */
export const loginWithEmailAndPassword = async ({ email, password }) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(
        "🚀 ~ file: LoginScreen.js ~ line 21 ~ .then ~ userCredential",
        userCredential
      );
      const user = userCredential.user;
      setLoading(false);
      Toast.show({
        type: "success",
        text1: "Exito",
      });
      navigate(ROUTES.SCREEN.HOME);
    })
    .catch((error) => {
      console.log(
        "🚀 ~ file: LoginScreen.js ~ line 30 ~ loginUser ~ error",
        error
      );
      setLoading(false);
      Toast.show({
        type: "error",
        text1: error.message, // cambiar
      });
    });
};

// Login with Goooglr
export const loginWithGoogle = async () => {
  await signInWithPopup(auth, provider);
};
