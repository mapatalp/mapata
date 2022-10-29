import { db } from "../firebase/config";

const useRTDB = () => {
  //Aca van las funciones para usar real time database, estas son funciones de ejemplo
  const writeData = (userId, name, email, imageUrl) => {
    set(ref(db, "users/" + userId), {
      username: name,
      email: email,
      profile_picture: imageUrl,
    });
  };

  const getData = () => {
    get(child(db, `users/${userId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return {
    writeData,
    getData,
  };
};

export default useRTDB;
