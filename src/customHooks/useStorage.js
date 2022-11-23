import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import uuid from "uuid";

const useStorage = () => {
  const uploadImageAsync = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const fileRef = ref(getStorage(), uuid.v1());

    await uploadBytes(fileRef, blob);

    // We're done with the blob, close and release it
    blob.close();

    return await getDownloadURL(fileRef);
  };

  const handleImagePicked = async (
    pickerResult,
    image,
    setImage,
    setUploading
  ) => {
    try {
      setUploading(true);

      if (!pickerResult.cancelled) {
        const uploadUrl = await uploadImageAsync(pickerResult.uri);

        setImage({ ...image, uri: uploadUrl });
      }
    } catch (e) {
      console.log(e);
      alert("Hubo un error al subir la imagen.");
    } finally {
      setUploading(false);
    }
  };

  return {
    handleImagePicked,
  };
};

export default useStorage;
